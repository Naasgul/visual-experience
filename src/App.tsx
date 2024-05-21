import React, { useState } from "react";
import ThreeScene from "./ThreeScene";
import { Overlay } from "./Overlay";

function App() {
  const [parentHexColor, setParentHexColor] = useState(0x000000); 
  const [parentTexture, setParentTexture] = useState('')

  return (
    <>
      <ThreeScene hexColor={parentHexColor} texture={parentTexture} />
      <Overlay setParentHexColor={setParentHexColor} setParentTexture={setParentTexture} />
    </>
  );
}

export default App;
