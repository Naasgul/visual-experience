import React from "react";

export function Overlay() {

  function handleDownloadPNG(){
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
  }
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
            <input placeholder="Color" type="color" className="color-options"></input>
          </div>
          <button
            onClick={() => {
             handleDownloadPNG()
            }}
          >
            Download
          </button>
        </div>
    </div>
  );
}
