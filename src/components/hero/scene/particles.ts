import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  Points,
  PointsMaterial,
  Ray,
  Sphere,
  TorusGeometry,
  Vector3,
} from 'three';
import { palette } from './palette';
import { fitScale, type SceneContext, type SceneController } from './types';

const RADIUS = 2.3;
const BULGE_RADIUS = 1.2;

/** Fibonacci sphere of glowing dots that bulge away from the cursor. */
export function createParticles({ scene, camera, dot, quality }: SceneContext): SceneController {
  const count = quality === 'low' ? 1400 : 2600;
  const base = new Float32Array(count * 3);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const tmp = new Color();

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = i * 2.399963; // golden angle
    const k = i * 3;
    base[k] = positions[k] = Math.cos(theta) * r * RADIUS;
    base[k + 1] = positions[k + 1] = y * RADIUS;
    base[k + 2] = positions[k + 2] = Math.sin(theta) * r * RADIUS;
    const t = (y + 1) / 2;
    if (t < 0.5) tmp.copy(palette.violet).lerp(palette.cyan, t * 2);
    else tmp.copy(palette.cyan).lerp(palette.lime, (t - 0.5) * 2);
    colors[k] = tmp.r;
    colors[k + 1] = tmp.g;
    colors[k + 2] = tmp.b;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('color', new BufferAttribute(colors, 3));
  const material = new PointsMaterial({
    size: 0.075,
    map: dot,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });

  const group = new Group();
  group.add(new Points(geometry, material));

  const ringGeometry = new TorusGeometry(2.85, 0.006, 8, 240);
  const ringMaterial = new MeshBasicMaterial({ color: palette.cyan, transparent: true, opacity: 0.45 });
  const ring = new Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = 1.25;
  const ring2Geometry = new TorusGeometry(2.95, 0.004, 8, 240);
  const ring2Material = new MeshBasicMaterial({ color: palette.violetSoft, transparent: true, opacity: 0.3 });
  const ring2 = new Mesh(ring2Geometry, ring2Material);
  ring2.rotation.set(1.1, 0.5, 0);
  group.add(ring, ring2);
  scene.add(group);

  const ray = new Ray();
  const inverse = new Matrix4();
  const sphere = new Sphere(new Vector3(), RADIUS);
  const hit = new Vector3();

  return {
    layout(width, height, wide) {
      group.position.set(wide ? 0.25 : 0, wide ? 0.35 : 0.2, 0);
      group.scale.setScalar(fitScale(width, height));
    },
    update({ time, pointer, ndc }) {
      group.rotation.y = time * 0.12 + pointer.x * 0.5;
      group.rotation.x = pointer.y * 0.3;
      ring.rotation.z = time * 0.25;
      ring2.rotation.z = -time * 0.15;
      group.updateMatrixWorld();

      // Cast the pointer ray into the sphere's local space to find where it touches.
      let touching = false;
      if (ndc) {
        ray.origin.setFromMatrixPosition(camera.matrixWorld);
        ray.direction.set(ndc.x, ndc.y, 0.5).unproject(camera).sub(ray.origin).normalize();
        ray.applyMatrix4(inverse.copy(group.matrixWorld).invert());
        touching = ray.intersectSphere(sphere, hit) !== null;
      }

      for (let i = 0; i < count; i++) {
        const k = i * 3;
        const bx = base[k];
        const by = base[k + 1];
        const bz = base[k + 2];
        let scale = 1 + 0.025 * Math.sin(time * 1.6 + by * 2.2);
        if (touching) {
          const dx = bx - hit.x;
          const dy = by - hit.y;
          const dz = bz - hit.z;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d < BULGE_RADIUS) scale += (BULGE_RADIUS - d) * 0.32;
        }
        positions[k] += (bx * scale - positions[k]) * 0.12;
        positions[k + 1] += (by * scale - positions[k + 1]) * 0.12;
        positions[k + 2] += (bz * scale - positions[k + 2]) * 0.12;
      }
      geometry.attributes.position.needsUpdate = true;
    },
    dispose() {
      scene.remove(group);
      geometry.dispose();
      material.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ring2Geometry.dispose();
      ring2Material.dispose();
    },
  };
}
