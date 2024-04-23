import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Center, OrbitControls } from "@react-three/drei"; // Import OrbitControls
import Backdrop from "./three-components/Backdrop";
import CameraRig from "./three-components/CameraRig";
import Shirt from "./three-components/Shirt";

interface ThreeSceneProps {
  position?: [number, number, number];
  fov?: number;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({ position = [0, 0, 2.5], fov = 25 }) => {
  return (
    <Canvas
      shadows
      camera={{ position, fov }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <ambientLight intensity={2} />
      <OrbitControls enableZoom={false} /> {/* Place OrbitControls at the top */}
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt></Shirt>
        </Center>
      </CameraRig>
    </Canvas>
  );
};
