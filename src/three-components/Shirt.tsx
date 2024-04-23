import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import { useGLTF } from "@react-three/drei";
import React from "react";

interface ShirtProps {
  modelPath?: string;
}

const basePath = import.meta.env.BASE_URL;
const defaultModelPath = `${basePath}shirt_baked_2.glb`;

type GLTFResult = GLTF & {
  nodes: {
    T_Shirt_male: THREE.Mesh
  }
  materials: {
    lambert1: THREE.MeshStandardMaterial
  }
}

const Shirt: React.FC<ShirtProps>  = ({modelPath = defaultModelPath}, props: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF(modelPath) as GLTFResult
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
  )
}

useGLTF.preload('/shirt_baked_2.glb')

export default Shirt