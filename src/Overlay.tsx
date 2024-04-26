import React from "react";
import { Logo } from "@pmndrs/branding";
import { motion, AnimatePresence } from "framer-motion";
import {
  AiFillCamera,
  AiOutlineArrowLeft,
  AiOutlineHighlight,
  AiOutlineShopping,
} from "react-icons/ai";
import { useSnapshot } from "valtio";
import { state } from "./store";

export function Overlay() {
  const snap = useSnapshot(state);
  const transition = { type: "spring", duration: 0.8 };
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
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
      <motion.section key="custom" {...config}>
        <div className="customizer">
          <div className="color-options">
            <input className="color-options"></input>
          </div>

          <button
            className="share"
            style={{ background: snap.color }}
            onClick={() => {
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
            }}
          >
            DOWNLOAD
            <AiFillCamera size="1.3em" />
          </button>
        </div>
      </motion.section>
    </div>
  );
}
