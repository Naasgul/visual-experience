import { useControls, button } from 'leva'
import React, { useEffect } from 'react'
import * as THREE from "three";

interface PaneProps {
  setParentHexColor: (color: number) => void;
  setParentScale: (scale: THREE.Vector3) => void;
  setParentTexture: (texture: string) => void;
  handleFileUpload: (file: File) => void;
}

export const Pane: React.FC<PaneProps> = ({
  setParentHexColor,
  setParentScale,
  setParentTexture,
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

  const { color, upload, scale, texture } = useControls({ 
    color: '#fff', 
    texture: {
      value: 'None',
      options: ['None', 'Wool', 'Cotton'], // Default options
    }, 
    scale: {
      x: 1,
      y: 1,
      z: 1,
    }, 
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
      console.log("From Pane Upload")
      blobUrlToFile(upload)
        .then((file) => {
          handleFileUpload(file)
          console.log("From Pane File:", file);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [upload]);

  useEffect(() => {
    if(scale){
      setParentScale(new THREE.Vector3(scale.x, scale.y, scale.z))
    }
  }, [scale])

  useEffect(() => {
    if(texture){
      setParentTexture(texture)
    }
  }, [texture])

  useEffect(() => {
    if(color){
      setParentHexColor(hexToNumber(color));
    }
  }, [color])
    

  return (
    <div>
    </div>
  )
}