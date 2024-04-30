import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useGLTF, useTexture } from "@react-three/drei";
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

  const { nodes, materials } = useGLTF(modelPath) as GLTFResult;

  //TEXTURE_MAPS

  // const woolTexture = useTexture({
  //   aoMap: `${basePath}/wool_texture_ao.jpg`,
  //   roughnessMap: `${basePath}/wool_texture_rough.jpg`,
  //   metalnessMap: `${basePath}/wool_texture_metal.jpg`,
  //   normalMap: `${basePath}/wool_texture_normal.jpg`,
  // });

  // materials.lambert1.aoMap = woolTexture.aoMap;
  // materials.lambert1.roughnessMap = woolTexture.roughnessMap
  // materials.lambert1.metalnessMap = woolTexture.metalnessMap
  // materials.lambert1.normalMap = woolTexture.normalMap

  const cottonTexture = useTexture({
    map: `${basePath}/textures/cotton/Fabric_001_COLOR.jpg`,
    aoMap: `${basePath}/textures/cotton/Fabric_001_OCC.jpg`,
    roughnessMap: `${basePath}/textures/cotton/Fabric_001_ROUGH.jpg`,
    displacementMap: `${basePath}/textures/cotton/Fabric_001_DISP.png`,
    normalMap:  `${basePath}/textures/cotton/Fabric_001_NORM.jpg`,
  });

  materials.lambert1.map = cottonTexture.map;
  materials.lambert1.roughnessMap = cottonTexture.roughnessMap
  materials.lambert1.normalMap = cottonTexture.normalMap
  // THIS CORRUPTS THE MODEL
  // materials.lambert1.displacementMap = cottonTexture.displacementMap
  materials.lambert1.aoMap = cottonTexture.aoMap

  //COLOR_MAP
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
