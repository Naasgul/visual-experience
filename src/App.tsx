import React, { useState } from "react";
import ThreeScene from "./ThreeScene";
import { Overlay } from "./Overlay";

function App() {
  const [parentHexColor, setParentHexColor] = useState(0x000000); 

  return (
    <>
      <ThreeScene hexColor={parentHexColor} />
      <Overlay setParentHexColor={setParentHexColor} />
    </>
  );
}

export default App;
