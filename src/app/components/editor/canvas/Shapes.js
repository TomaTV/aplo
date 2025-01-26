"use client";

import React, { useRef, useEffect, useState } from "react";

export default function ShapesCanvas({ isActive }) {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [shapes, setShapes] = useState([]);

  // Détecte les dimensions de la fenêtre au montage
  useEffect(() => {
    const updateCanvasSize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateCanvasSize(); // Initialise la taille
    window.addEventListener("resize", updateCanvasSize); // Met à jour lors du redimensionnement

    return () => {
      window.removeEventListener("resize", updateCanvasSize); // Nettoie l'écouteur
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Efface tout le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessine les formes
    shapes.forEach(({ type, x, y, width, height, radius }) => {
      ctx.beginPath();
      if (type === "circle") {
        ctx.arc(x, y, radius, 0, Math.PI * 2);
      } else if (type === "square") {
        ctx.rect(x, y, width, height);
      } else if (type === "arrow") {
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y + height);
      }
      ctx.stroke();
    });
  }, [shapes]);

  const handlePointerDown = (e) => {
    if (!isActive) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newShape = { type: "circle", x, y, radius: 50 }; // Exemple : Cercle
    setShapes((prev) => [...prev, newShape]);
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0"
      width={canvasSize.width}
      height={canvasSize.height}
      onPointerDown={handlePointerDown}
    />
  );
}
