import React, { useState } from "react";
import ThreeScene from "./ThreeScene";
import { Overlay } from "./Overlay";
import { prominent } from "./color"
import {Pane} from "./Pane";

function App() {
  const [parentHexColor, setParentHexColor] = useState<number>(0x000000);

  const handleFileUpload = (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        // Create a URL for the uploaded image
        const imageUrl = URL.createObjectURL(file);

        // Extract prominent colors using color.js
        prominent(imageUrl, { amount: 1, format: 'hex' })
          .then((colors) => {
            console.log("Prominent colors:", colors);
            setParentHexColor(hexToNumber(colors.toString()));
          })
          .catch((error) => console.error("Error extracting colors:", error));
      })
      .catch((error) => console.error("Error:", error));
  };

  const hexToNumber = (hex: string): number => {
    return parseInt(hex.slice(1), 16);
  };

  return (
    <>
      <Pane  setParentHexColor={setParentHexColor}
        handleFileUpload={handleFileUpload}></Pane>
      <ThreeScene hexColor={parentHexColor} />
      <Overlay
        setParentHexColor={setParentHexColor}
        handleFileUpload={handleFileUpload}
      />
    </>
  );
}

export default App;
