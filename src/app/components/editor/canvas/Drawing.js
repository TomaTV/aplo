"use client";

import React, { useRef, useEffect, useState } from "react";

export default function DrawingCanvas({ isActive }) {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [points, setPoints] = useState([]);

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

    // Dessine les traits
    points.forEach((stroke) => {
      ctx.beginPath();
      stroke.forEach(([x, y], index) => {
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });
  }, [points]);

  const handlePointerDown = (e) => {
    if (!isActive) return; // Ne fonctionne que si le canvas est actif
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints((prev) => [...prev, [[x, y]]]);
  };

  const handlePointerMove = (e) => {
    if (!isActive || e.buttons !== 1) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints((prev) => {
      const lastStroke = prev[prev.length - 1];
      return [...prev.slice(0, -1), [...lastStroke, [x, y]]];
    });
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0"
      width={canvasSize.width}
      height={canvasSize.height}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    />
  );
}
