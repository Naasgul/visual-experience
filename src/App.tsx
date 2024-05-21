import React, { useState } from "react";
import ThreeScene from "./ThreeScene";
import { Overlay } from "./Overlay";
import { prominent } from "./color";
import { removeBackground } from "@imgly/background-removal";

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
        
        removeBackground(file)
          .then((blob: Blob) => {
            const imageUrl = URL.createObjectURL(blob);
            prominent(imageUrl, { amount: 1, format: "hex" })
              .then((colors) => {
                console.log("Prominent colors:", colors);
                setParentHexColor(hexToNumber(colors.toString()));
              })
              .catch((error) =>
                console.error("Error extracting colors:", error)
              );
          })
          .catch((error) => console.error("Error removing background:", error));
      })
      .catch((error) => console.error("Error:", error));
  };

  const hexToNumber = (hex: string): number => {
    return parseInt(hex.slice(1), 16);
  };

  return (
    <>
      <ThreeScene hexColor={parentHexColor} />
      <Overlay
        setParentHexColor={setParentHexColor}
        handleFileUpload={handleFileUpload}
      />
    </>
  );
}

export default App;
