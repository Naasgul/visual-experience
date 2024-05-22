import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useGLTF, useTexture } from "@react-three/drei";
import React, { useEffect } from "react";

interface ShirtProps {
  hexColor?: number;
  modelPath?: string;
  texture?: string;
  scale: THREE.Vector3;
}

const basePath = import.meta.env.BASE_URL;
const defaultModelPath = `${basePath}/models/shirt_baked_2.glb`;

type GLTFResult = GLTF & {
  nodes: {
    T_Shirt_male: THREE.Mesh;
  };
  materials: {
    lambert1: THREE.MeshStandardMaterial;
  };
};

const Shirt: React.FC<ShirtProps> = (
  { modelPath = defaultModelPath, hexColor = 0xffffff, texture, scale = new THREE.Vector3( 1, 1, 1 )},
  props: JSX.IntrinsicElements["group"]
) => {

  const { nodes, materials } = useGLTF(modelPath) as GLTFResult;

  const woolTexture = useTexture({
    aoMap: `${basePath}/textures/wool/wool_texture_ao.jpg`,
    roughnessMap: `${basePath}/textures/wool/wool_texture_rough.jpg`,
    metalnessMap: `${basePath}/textures/wool/wool_texture_metal.jpg`,
    normalMap: `${basePath}/textures/wool/wool_texture_normal.jpg`,
  });

  const cottonTexture = useTexture({
    map: `${basePath}/textures/cotton/Fabric_001_COLOR.jpg`,
    aoMap: `${basePath}/textures/cotton/Fabric_001_OCC.jpg`,
    roughnessMap: `${basePath}/textures/cotton/Fabric_001_ROUGH.jpg`,
    normalMap:  `${basePath}/textures/cotton/Fabric_001_NORM.jpg`,
  });

  useEffect(() => {
    if(texture === 'Wool') {
      materials.lambert1.aoMap = woolTexture.aoMap;
      materials.lambert1.roughnessMap = woolTexture.roughnessMap;
      materials.lambert1.metalnessMap = woolTexture.metalnessMap;
      materials.lambert1.normalMap = woolTexture.normalMap;
    } else if(texture === 'Cotton') {
      materials.lambert1.map = cottonTexture.map;
      materials.lambert1.roughnessMap = cottonTexture.roughnessMap;
      materials.lambert1.normalMap = cottonTexture.normalMap;
      materials.lambert1.aoMap = cottonTexture.aoMap;
    } else {
      materials.lambert1.map = null;
      materials.lambert1.roughnessMap = null;
      materials.lambert1.normalMap = null;
      materials.lambert1.aoMap = null;
      materials.lambert1.metalnessMap = null;
    }
    materials.lambert1.needsUpdate = true;
  }, [texture, woolTexture, cottonTexture, materials.lambert1]);

  materials.lambert1.color = new THREE.Color(hexColor);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        position={[0.419, 0, 0]}
        scale={scale}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
};

useGLTF.preload(defaultModelPath);

export default Shirt;
