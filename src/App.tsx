import React from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Display } from "./Canvas";
import { Overlay } from "./Overlay";

function HumanModel({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath, true);
  return <primitive object={scene} scale={0.1} />;
}

function ThreeScene() {
  return (
    <>
      <Display />
      <Overlay />
    </>
  );
}

export default ThreeScene;
