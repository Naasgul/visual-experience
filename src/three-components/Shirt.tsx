import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useGLTF } from "@react-three/drei";
import React from "react";

interface ShirtProps {
  hexColor?: number;
  modelPath?: string;
}

const basePath = import.meta.env.BASE_URL;
const defaultModelPath = `${basePath}/models/shirt_baked_2.glb`

type GLTFResult = GLTF & {
  nodes: {
    T_Shirt_male: THREE.Mesh;
  };
  materials: {
    lambert1: THREE.MeshStandardMaterial;
  };
};

const Shirt: React.FC<ShirtProps> = (
  { modelPath = defaultModelPath, hexColor = 0xFFFFFF },
  props: JSX.IntrinsicElements["group"]
) => {
  let { nodes, materials } = useGLTF(modelPath) as GLTFResult;
  materials.lambert1.color = new THREE.Color( hexColor )
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        position={[0.419, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
};

useGLTF.preload(defaultModelPath);

export default Shirt;
