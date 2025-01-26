import Canvas from "@/app/components/editor/CanvasManager";

export default function Home({ tool }) {
  return (
    <div className="relative h-screen">
      <Canvas tool={tool} />
    </div>
  );
}
