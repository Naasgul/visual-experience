import React, { useState } from "react";

interface OverlayProps {
  setParentHexColor: (color: number) => void;
  handleFileUpload: (file: File) => void;
  setParentTexture: (texture: string) => void;
}

export const Overlay: React.FC<OverlayProps> = ({ setParentHexColor, handleFileUpload, setParentTexture }) => {
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selectedTexture, setSelectedTexture] = useState("None");

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setSelectedColor(color);
    setParentHexColor(hexToNumber(color));
  };

  const handleTextureChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const texture = event.target.value;
    setSelectedTexture(texture);
    setParentTexture(texture);
  };

  const hexToNumber = (hex: string): number => {
    return parseInt(hex.slice(1), 16);
  };

  const handleDownloadPNG = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.setAttribute("download", "canvas.png");
      const dataUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      link.setAttribute("href", dataUrl);
      link.click();
    } else {
      console.error("Canvas element not found.");
    }
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "auto",
      }}
    >
      <div className="customizer">
        <div className="color-options">
          <input
            placeholder="Color"
            type="color"
            className="color-picker"
            value={selectedColor}
            onChange={handleColorChange}
          />
        </div>
        <div className="texture-options">
          <select value={selectedTexture} onChange={handleTextureChange}>
            <option value="None">None</option>
            <option value="Cotton">Cotton</option>
            <option value="Wool">Wool</option>
          </select>
        </div>
        <button onClick={handleDownloadPNG}>Download</button>
        <input
          type="file"
          onChange={onFileChange}
          accept="image/*"
          style={{ display: "none" }}
          id="file-upload"
        />
        <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
          Upload Image
        </label>
      </div>
    </div>
  );
};
