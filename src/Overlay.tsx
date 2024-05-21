import React, { useState } from "react";
import * as THREE from "three";

interface OverlayProps {
  setParentHexColor: (color: number) => void;
  setParentScale: (scale: THREE.Vector3) => void;
  handleFileUpload: (file: File) => void;
}

export const Overlay: React.FC<OverlayProps> = ({
  setParentHexColor,
  setParentScale,
  handleFileUpload,
}) => {
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [scale, setScale] = useState(new THREE.Vector3(1, 1, 1));

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setSelectedColor(color);
    setParentHexColor(hexToNumber(color));
  };

  const handleScaleChange = (axis: 'x' | 'y' | 'z', value: number) => {
    const newScale = scale.clone();
    newScale[axis] = value;
    setScale(newScale);
    setParentScale(newScale);
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
        <div className="scale-sliders">
          <label>
            X:
            <input
              type="range"
              min="0"
              max="2"
              step="0.01"
              value={scale.x}
              onChange={(e) => handleScaleChange('x', parseFloat(e.target.value))}
            />
          </label>
          <label>
            Y:
            <input
              type="range"
              min="0"
              max="2"
              step="0.01"
              value={scale.y}
              onChange={(e) => handleScaleChange('y', parseFloat(e.target.value))}
            />
          </label>
          <label>
            Z:
            <input
              type="range"
              min="0"
              max="2"
              step="0.01"
              value={scale.z}
              onChange={(e) => handleScaleChange('z', parseFloat(e.target.value))}
            />
          </label>
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
