import { useGLTF } from "@react-three/drei";
import React from "react";

interface ShirtProps {
  modelPath?: string;
}

const basePath = import.meta.env.BASE_URL;
const defaultModelPath = `${basePath}shirt_baked_2.glb`;

const Shirt: React.FC<ShirtProps> = ({ modelPath = defaultModelPath}) => {

  const { scene } = useGLTF(modelPath, true);
  return(
    <primitive object={scene} scale={0.4} />
  );
};

export default Shirt