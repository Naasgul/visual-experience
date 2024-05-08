import React, { useState } from "react";
import ThreeScene from "./ThreeScene";
import { Overlay } from "./Overlay";

function App() {
  const [parentHexColor, setParentHexColor] = useState(0x000000);

  const handleFileUpload = (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
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
