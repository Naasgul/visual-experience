import { useControls, button } from 'leva'
import React from 'react'

function Pane() {

  const {color, scale, texture } = useControls({ 
    color: '#fff', 
    texture: {
      value: 'None',
      options: ['None', 'Wool', 'Cotton'], // Default options
    },
    upload: button(() => console.log("UPLOAD")), 
    download: button(() => console.log("DOWNLOAD")),
    scale: {
      x: 1,
      y: 1,
      z: 1,
    }, 
  })
    

  return (
    <div>
    </div>
  )
}

export default Pane