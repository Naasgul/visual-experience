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
      {/* <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <HumanModel modelPath="/basic_model.gltf" />
        <OrbitControls />
      </Canvas> */}
      <Display />
      <Overlay />
    </>
    // <>
    //   <App />
    //   <Overlay />
    // </>
  );
}

export default ThreeScene;
