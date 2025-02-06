"use client";

import SphereAnimation from "./sphereanimation";

export function SphereAnimationDemo() {
  return (
    <div
      className="relative z-10 p-4 h-[160px] w-[160px] overflow-hidden rounded-3xl"
      style={{
        borderTop: "ridge 2px #ffffff2e",
        borderBottom: "ridge 2px #ffffff2e",
        borderRight: "ridge 1px rgba(255,255,255,0.08)",
        borderLeft: "ridge 1px rgba(255,255,255,0.08)", // Ridge border with the specified color
        background:
          "linear-gradient(to bottom left, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0) 30%), linear-gradient(to top right, rgba(24,0,43, .7), rgba(128, 0, 128, 0) 40%)",
      }}
    >
      <div className="-mt-[250px]">
        <SphereAnimation />
      </div>
    </div>
  );
}
