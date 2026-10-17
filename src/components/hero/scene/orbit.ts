import {
  AdditiveBlending,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  TorusGeometry,
  Vector3,
  type BufferGeometry,
  type Material,
} from 'three';
import { palette } from './palette';
import { fitScale, type SceneContext, type SceneController } from './types';

interface RingDef {
  radius: number;
  rotation: [number, number, number];
  color: Color;
  speed: number;
  labels: string[];
}

const RINGS: RingDef[] = [
  { radius: 2.05, rotation: [1.25, 0.25, 0], color: palette.violetSoft, speed: 0.4, labels: ['React', 'TypeScript'] },
  { radius: 2.6, rotation: [1.05, -0.55, 0], color: palette.cyan, speed: -0.28, labels: ['Redux Toolkit', 'Module Federation'] },
  { radius: 3.1, rotation: [1.4, 0.75, 0], color: palette.lime, speed: 0.2, labels: ['Node.js', 'Express'] },
];

/** Tilted orbit rings with tech labels that travel in front of and behind the photo card. */
export function createOrbit({ scene, camera, dot, labelLayer }: SceneContext): SceneController {
  const group = new Group();
  const geometries: BufferGeometry[] = [];
  const materials: Material[] = [];
  const track = <T extends BufferGeometry | Material>(item: T): T => {
    if ('isMaterial' in item) materials.push(item as Material);
    else geometries.push(item as BufferGeometry);
    return item;
  };

  const nodeGeometry = track(new SphereGeometry(0.085, 16, 16));
  const items: { mesh: Mesh; label: HTMLSpanElement; ring: RingDef; offset: number }[] = [];

  for (const def of RINGS) {
    const pivot = new Group();
    pivot.rotation.set(...def.rotation);
    group.add(pivot);
    pivot.add(
      new Mesh(
        track(new TorusGeometry(def.radius, 0.009, 8, 260)),
        track(new MeshBasicMaterial({ color: def.color, transparent: true, opacity: 0.55 })),
      ),
    );

    def.labels.forEach((text, i) => {
      const mesh = new Mesh(nodeGeometry, track(new MeshBasicMaterial({ color: def.color })));
      const glow = new Sprite(
        track(new SpriteMaterial({ map: dot, color: def.color, transparent: true, depthWrite: false, blending: AdditiveBlending })),
      );
      glow.scale.set(0.75, 0.75, 1);
      mesh.add(glow);
      pivot.add(mesh);

      const label = document.createElement('span');
      label.className = 'orbit-label';
      const swatch = document.createElement('i');
      swatch.className = 'block size-[7px] rounded-full';
      swatch.style.background = `#${def.color.getHexString()}`;
      label.append(swatch, document.createTextNode(text));
      labelLayer?.appendChild(label);

      items.push({ mesh, label, ring: def, offset: i * Math.PI + def.radius });
    });
  }

  const core = new Sprite(
    track(new SpriteMaterial({ map: dot, color: palette.violet, transparent: true, opacity: 0.55, depthWrite: false, blending: AdditiveBlending })),
  );
  core.scale.set(6, 6, 1);
  group.add(core);
  scene.add(group);

  const world = new Vector3();

  return {
    layout(width, height) {
      group.position.set(0, 0, 0);
      group.scale.setScalar(fitScale(width, height));
    },
    update({ time, pointer, width, height }) {
      group.rotation.y = pointer.x * 0.4;
      group.rotation.x = pointer.y * 0.3;
      group.updateMatrixWorld();
      for (const item of items) {
        const angle = time * item.ring.speed + item.offset;
        item.mesh.position.set(Math.cos(angle) * item.ring.radius, Math.sin(angle) * item.ring.radius, 0);
        item.mesh.getWorldPosition(world);
        const inFront = world.z > 0;
        world.project(camera);
        const x = (world.x * 0.5 + 0.5) * width;
        const y = (-world.y * 0.5 + 0.5) * height;
        item.label.style.transform = `translate(${x}px, ${y}px) translate(-50%, -170%)`;
        // Labels behind the sphere's centre slip under the photo card (z-index 2).
        item.label.style.zIndex = inFront ? '4' : '1';
        item.label.style.opacity = inFront ? '1' : '0.4';
      }
    },
    dispose() {
      scene.remove(group);
      items.forEach((item) => item.label.remove());
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
    },
  };
}
