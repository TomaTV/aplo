import Canvas from "@/app/components/editor/Canvas";

export default function Home({ tool }) {
  return (
    <div className="relative h-screen">
      <Canvas tool={tool} />
    </div>
  );
}
