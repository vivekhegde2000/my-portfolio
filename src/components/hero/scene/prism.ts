import {
  AdditiveBlending,
  AmbientLight,
  EdgesGeometry,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
  PointLight,
  Points,
  PointsMaterial,
} from 'three';
import { palette } from './palette';
import { fitScale, type SceneContext, type SceneController } from './types';

/** Faceted glass icosahedron with a wireframe shell; grows slightly on hover. */
export function createPrism({ scene, dot }: SceneContext): SceneController {
  const group = new Group();

  const geometry = new IcosahedronGeometry(1.9, 1);
  const solidMaterial = new MeshStandardMaterial({
    color: 0x1b1450,
    metalness: 0.35,
    roughness: 0.2,
    flatShading: true,
    transparent: true,
    opacity: 0.9,
  });
  const solid = new Mesh(geometry, solidMaterial);

  const edgesGeometry = new EdgesGeometry(geometry);
  const edgesMaterial = new LineBasicMaterial({ color: palette.cyan, transparent: true, opacity: 0.75 });
  const edges = new LineSegments(edgesGeometry, edgesMaterial);

  const pointsMaterial = new PointsMaterial({
    size: 0.2,
    map: dot,
    color: palette.lime,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const vertices = new Points(geometry, pointsMaterial);

  const core = new Group();
  core.add(solid, edges, vertices);

  const shellSource = new IcosahedronGeometry(2.75, 0);
  const shellGeometry = new EdgesGeometry(shellSource);
  shellSource.dispose();
  const shellMaterial = new LineBasicMaterial({ color: palette.violetSoft, transparent: true, opacity: 0.35 });
  const shell = new LineSegments(shellGeometry, shellMaterial);

  // decay = 0 keeps lighting independent of distance (three's physically-correct lighting).
  const key = new PointLight(palette.violet, 7, 0, 0);
  key.position.set(4, 3, 5);
  const fill = new PointLight(palette.cyan, 5.5, 0, 0);
  fill.position.set(-4, -2, 4);
  const rim = new PointLight(palette.pink, 3.5, 0, 0);
  rim.position.set(0, -4, 2);

  group.add(core, shell, key, fill, rim, new AmbientLight(0xffffff, 0.8));
  scene.add(group);

  let baseScale = 1;
  let hoverScale = 1;

  return {
    layout(width, height, wide) {
      group.position.set(wide ? 0.25 : 0, wide ? 0.35 : 0.2, 0);
      baseScale = fitScale(width, height);
      group.scale.setScalar(baseScale * hoverScale);
    },
    update({ time, pointer, ndc }) {
      core.rotation.y = time * 0.18 + pointer.x * 0.7;
      core.rotation.x = time * 0.09 + pointer.y * 0.5;
      shell.rotation.y = -time * 0.1 + pointer.x * 0.3;
      shell.rotation.z = time * 0.05;
      hoverScale += ((ndc ? 1.08 : 1) - hoverScale) * 0.08;
      group.scale.setScalar(baseScale * hoverScale);
    },
    dispose() {
      scene.remove(group);
      geometry.dispose();
      solidMaterial.dispose();
      edgesGeometry.dispose();
      edgesMaterial.dispose();
      pointsMaterial.dispose();
      shellGeometry.dispose();
      shellMaterial.dispose();
      key.dispose();
      fill.dispose();
      rim.dispose();
    },
  };
}
