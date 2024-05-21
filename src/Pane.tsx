import { useControls, button } from 'leva'
import React, { useEffect } from 'react'

interface PaneProps {
  setParentHexColor: (color: number) => void;
  handleFileUpload: (file: File) => void;
}

export const Pane: React.FC<PaneProps> = ({
  setParentHexColor,
  handleFileUpload,
}) =>  {

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

  const { color, upload } = useControls({ 
    color: '#fff', 
    upload: {
      image: undefined
    },
    download: button(() => handleDownloadPNG()),
  })

  async function blobUrlToFile(blobUrl: string): Promise<File> {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const fileName = blobUrl.substring(blobUrl.lastIndexOf("/") + 1);
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  }

  useEffect(() => {
    if(upload){
      console.log("Uploaded", upload)
      blobUrlToFile(upload)
        .then((file) => {
          handleFileUpload(file)
          console.log("File:", file);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    if(color){
      console.log("Color:", color)
      setParentHexColor(hexToNumber(color));
    }
  }, [upload, color]);
    

  return (
    <div>
    </div>
  )
}