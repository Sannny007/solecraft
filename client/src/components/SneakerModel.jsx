import { useGLTF } from '@react-three/drei';

function SneakerModel({ modelPath, ...props }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} {...props} />;
}

export default SneakerModel;