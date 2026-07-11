import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

function SneakerModel({ modelPath, colors = {}, ...props }) {
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (!child.userData.materialCloned) {
          child.material = child.material.clone();
          child.userData.materialCloned = true;
        }

        const color = colors[child.name];
        if (color) {
          child.material.color.set(color);
        }
      }
    });
  }, [scene, colors]);

  return <primitive object={scene} scale={0.2} {...props} />;
}

export default SneakerModel;