"use client";

import React, { useEffect, useRef, useState } from "react";
import { getStroke } from "perfect-freehand";

export default function Canvas({ tool }) {
  const canvasRef = useRef(null);
  const toolRef = useRef(tool); // Référence pour l'outil actif
  const [points, setPoints] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Mettre à jour la référence à l'outil actif
  useEffect(() => {
    toolRef.current = tool;
    console.log("Current tool in Canvas:", tool);
  }, [tool]);

  // Mise à jour des dimensions du canvas
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Dessiner sur le canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Efface le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessine les traits existants
    points.forEach((stroke) => {
      const strokePoints = getStroke(stroke, {
        size: 16,
        thinning: 0.5,
        smoothing: 0.5,
        streamline: 0.5,
      });

      ctx.beginPath();
      strokePoints.forEach(([x, y], index) => {
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.closePath();
      ctx.fillStyle = stroke[0]?.color || "black";
      ctx.fill();
      ctx.strokeStyle = stroke[0]?.color || "black";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [points]);

  // Supprimer les points proches de la position
  const erasePoints = (x, y) => {
    const eraseRadius = 20;
    console.log("Erasing at:", x, y);

    setPoints((prevPoints) =>
      prevPoints
        .map((stroke) =>
          stroke.filter(
            (point) => Math.hypot(point.x - x, point.y - y) > eraseRadius
          )
        )
        .filter((stroke) => stroke.length > 0)
    );
  };

  // Gestion des clics ou événements tactiles
  const handlePointerDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    console.log("Tool used on PointerDown:", toolRef.current);

    if (toolRef.current === "eraser") {
      erasePoints(x, y);
    } else {
      startDrawing(x, y);
    }
  };

  // Ajouter des points pendant le dessin
  const handlePointerMove = (e) => {
    if (e.buttons !== 1) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    console.log("Tool used on PointerMove:", toolRef.current);

    if (toolRef.current === "eraser") {
      erasePoints(x, y);
    } else {
      addDrawingPoint(x, y);
    }
  };

  // Commencer un nouveau trait
  const startDrawing = (x, y) => {
    console.log("Start drawing at:", x, y);
    setPoints((prevPoints) => [...prevPoints, [{ x, y, color: "black" }]]);
  };

  // Ajouter un point au dernier trait
  const addDrawingPoint = (x, y) => {
    setPoints((prevPoints) => {
      const lastStroke = prevPoints[prevPoints.length - 1];
      if (!lastStroke) return prevPoints;

      const newPoint = { x, y, color: "black" };
      const updatedStroke = [...lastStroke, newPoint];
      return [...prevPoints.slice(0, -1), updatedStroke];
    });
  };

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      className={`absolute inset-0 ${
        toolRef.current === "eraser" ? "cursor-crosshair" : ""
      }`}
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
      }}
    />
  );
}
