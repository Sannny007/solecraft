import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

const BODY_KEY = 'rb1004_rb_r_0';
const SOLE_KEY = 'rb1000_rb_r_0';

function SneakerModel({ modelPath, colors = {}, ...props }) {
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    // Check if this model actually has meshes named for body/sole
    // (only true for the original sneaker.glb — the other two models
    // export as dozens of unnamed pieces with no body/sole split).
    let hasNamedParts = false;
    scene.traverse((child) => {
      if (child.isMesh && (child.name === BODY_KEY || child.name === SOLE_KEY)) {
        hasNamedParts = true;
      }
    });

    // Fallback: if there's no named split, recolor the whole shoe with
    // whichever swatch was picked last, so color controls still work.
    const fallbackColor = colors[SOLE_KEY] || colors[BODY_KEY];

    scene.traverse((child) => {
      if (child.isMesh) {
        if (!child.userData.materialCloned) {
          child.material = child.material.clone();
          child.userData.materialCloned = true;
        }

        if (hasNamedParts) {
          const color = colors[child.name];
          if (color) child.material.color.set(color);
        } else if (fallbackColor) {
          child.material.color.set(fallbackColor);
        }
      }
    });
  }, [scene, colors]);

  // Auto-normalize scale so every model renders at a consistent size
  // regardless of its original export scale.
  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (!maxDim || Number.isNaN(maxDim)) return 0.2;
    const TARGET_SIZE = 2.6; // tune if models look too big/small overall
    return TARGET_SIZE / maxDim;
  }, [scene]);

  return <primitive object={scene} scale={scale} {...props} />;
}

export default SneakerModel;