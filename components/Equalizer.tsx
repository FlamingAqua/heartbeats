"use client";

type EqualizerProps = {
  isPlaying: boolean;
};

export default function Equalizer({
  isPlaying,
}: EqualizerProps) {
  return (
    <div className="flex items-end gap-1 h-6">
      {[1, 2, 3, 4, 5].map((bar) => (
        <div
          key={bar}
          className={`
            w-1 rounded-full bg-green-400
            ${isPlaying ? "animate-equalizer" : ""}
          `}
          style={{
            height: `${10 + bar * 4}px`,
            animationDelay: `${bar * 0.12}s`,
          }}
        />
      ))}
    </div>
  );
}