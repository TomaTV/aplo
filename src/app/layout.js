"use client";
import "@/styles/globals.css";
import React from "react";
import { useState } from "react";
import Toolbar from "@/app/components/editor/Toolbar";
import Sidebar from "@/app/components/layout/Sidebar";
import Canvas from "@/app/components/editor/Canvas"; // Import direct du Canvas

export default function RootLayout({ children }) {
  const [tool, setTool] = useState("pencil");

  return (
    <html lang="fr">
      <body className="min-h-screen bg-dotted-paper">
        <Sidebar />
        <main className="ml-64 min-h-screen relative">
          <Canvas tool={tool} />
          {children}
        </main>
        <Toolbar tool={tool} onToolChange={setTool} />
      </body>
    </html>
  );
}
