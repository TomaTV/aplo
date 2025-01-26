"use client";
import { useState } from "react";
import React from "react";
import { Pencil, Paintbrush, Eraser, Text } from "lucide-react";

export default function Toolbar({ tool, onToolChange }) {
  const handleToolClick = (selectedTool) => {
    console.log("Tool selected in Toolbar:", selectedTool);
    onToolChange(selectedTool);
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-full shadow-lg py-2 px-4 flex justify-center space-x-4">
      <button
        className={`p-2 rounded-full ${
          tool === "pencil" ? "bg-gray-200" : "hover:bg-gray-100"
        } focus:outline-none`}
        onClick={() => handleToolClick("pencil")}
      >
        <Pencil size={20} />
      </button>
      <button
        className={`p-2 rounded-full ${
          tool === "eraser" ? "bg-gray-200" : "hover:bg-gray-100"
        } focus:outline-none`}
        onClick={() => handleToolClick("eraser")}
      >
        <Eraser size={20} />
      </button>
    </div>
  );
}
