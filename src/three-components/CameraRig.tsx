import { useFrame } from "@react-three/fiber";
import React, { useRef, ReactNode } from "react"; // Import ReactNode
import { useSnapshot } from "valtio";
import { state } from "../store";
import { easing } from "maath";

interface CameraRigProps {
  children: ReactNode;
}

const CameraRig: React.FC<CameraRigProps> = ({ children }) => { // Use CameraRigProps type
  const group = useRef<any>();
  // const snap = useSnapshot(state);
  // useFrame((state, delta) => {
  //   easing.damp3(
  //     state.camera.position,
  //     [snap.intro ? -state.viewport.width / 4 : 0, 0, 2],
  //     0.25,
  //     delta
  //   );
  //   easing.dampE(
  //     group.current.rotation,
  //     [state.pointer.y / 10, -state.pointer.x / 5, 0],
  //     0.25,
  //     delta
  //   );
  // });
  return (
    <group ref={group}>{children}</group>
  );
};

export default CameraRig;
