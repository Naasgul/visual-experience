import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Center, OrbitControls, Float } from "@react-three/drei"; // Import OrbitControls
import Backdrop from "./three-components/Backdrop";
import CameraRig from "./three-components/CameraRig";
import Shirt from "./three-components/Shirt";
import { extend } from "@react-three/fiber";
import { Overlay } from "./Overlay";
extend({ useGLTF, Environment, Center, OrbitControls, Canvas });

interface ThreeSceneProps {
  position?: [number, number, number];
  fov?: number;
  canvasProps?: Record<string, any>;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({
  position = [0, 0, 2.5],
  fov = 25,
  canvasProps = {},
}) => {
  return (
    <>
      <Canvas
        shadows
        camera={{ position, fov }}
        gl={{ preserveDrawingBuffer: true }}
        //@ts-ignore event source type error, not yet handled...
        eventSource={document.getElementById("root")}
        eventPrefix="client"
      >
        <ambientLight intensity={2} />
        <OrbitControls enableZoom={false} />
        {/* Place OrbitControls at the top */}
        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
        <CameraRig>
          <Backdrop />
          <Center>
            <Float
              speed={1} // Animation speed, defaults to 1
              rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
              floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
              floatingRange={[-0, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
            >
              <Shirt />
            </Float>
          </Center>
        </CameraRig>
      </Canvas>
    </>
  );
};

export default ThreeScene;
