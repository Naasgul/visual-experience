import React, { useState } from "react";
import ThreeScene from "./ThreeScene";
import { Overlay } from "./Overlay";
import { prominent } from "./color";
import { removeBackground } from "@imgly/background-removal";

function App() {
  const [parentHexColor, setParentHexColor] = useState<number>(0x000000);

  const handleFileUpload = async (file: File) => {
    try {
      const uploadResponse = await uploadFile(file);
      console.log("Upload Success:", uploadResponse);

      const backgroundRemovedBlob = await removeBackground(file);
      const imageUrl = URL.createObjectURL(backgroundRemovedBlob);

      const colors = await extractProminentColor(imageUrl);
      console.log("Prominent colors:", colors);

      if (colors && colors.length > 0) {
        const hexColor = hexToNumber(colors.toString());
        setParentHexColor(hexColor);
      } else {
        console.error("No colors found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const uploadFile = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("File upload failed");
    }

    return response.json();
  };

  const extractProminentColor = async (imageUrl: string) => {
    try {
      const colors = await prominent(imageUrl, { amount: 1, format: "hex" });
      return colors;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error extracting colors: " + error.message);
      } else {
        throw new Error("Error extracting colors: Unknown error");
      }
    }
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
