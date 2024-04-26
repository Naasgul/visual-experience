import React from "react";

import ReactThreeTestRenderer from "@react-three/test-renderer";
import { ResizeObserver } from "@juggle/resize-observer";
import ThreeScene from "../ThreeScene";
import { Canvas } from "@react-three/fiber";
import Shirt from "../three-components/Shirt";

describe("Canvas Component", () => {
  //ToDo: fix url parsing for the local .glb file
  // test("renders without crashing", async () => {
  //   await ReactThreeTestRenderer.create(<Shirt />);
  // });

  test("renders without crashing", async () => {
    await ReactThreeTestRenderer.create(
      <mesh>
        <boxGeometry args={[2, 2]} />
        <meshStandardMaterial
          args={[
            {
              color: 0x0000ff,
            },
          ]}
        />
      </mesh>
    );
  });
});
