"use client";

import React, { useRef, useEffect, useState } from "react";

export default function TextCanvas({ isActive }) {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [texts, setTexts] = useState([]);

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

    // Dessine le texte
    texts.forEach(({ x, y, content }) => {
      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(content, x, y);
    });
  }, [texts]);

  const handlePointerDown = (e) => {
    if (!isActive) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const content = prompt("Enter your text:");
    if (content) {
      setTexts((prev) => [...prev, { x, y, content }]);
    }
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
