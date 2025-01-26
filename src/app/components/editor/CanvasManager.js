"use client";

import React, { useRef, useEffect, useState } from "react";
import DrawingCanvas from "@/app/components/editor/canvas/Drawing";
import ShapesCanvas from "@/app/components/editor/canvas/Shapes";
import TextCanvas from "@/app/components/editor/canvas/Text";

export default function CanvasManager({ tool }) {
  return (
    <div className="relative w-full h-full">
      {/* Canvas pour le dessin */}
      <DrawingCanvas isActive={tool === "pencil"} />

      {/* Canvas pour les formes */}
      <ShapesCanvas
        isActive={tool === "circle" || tool === "square" || tool === "arrow"}
      />

      {/* Canvas pour le texte */}
      <TextCanvas isActive={tool === "text"} />
    </div>
  );
}
