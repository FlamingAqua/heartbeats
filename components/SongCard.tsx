import { Music } from 'lucide-react';

interface SongCardProps {
  title: string;
  artist: string;
  cover: string;
  isActive: boolean;
}

export default function SongCard({ title, artist, cover, isActive }: SongCardProps) {
  return (
    <div
      className={`
        group relative w-48 h-56 rounded-2xl overflow-hidden shadow-lg
        transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
        ${isActive ? 'ring-4 ring-green-500 shadow-green-500/30' : 'ring-1 ring-white/10'}
      `}
    >
      {/* Background Image */}
      <img
        src={cover}
        alt={title}
        className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <h3 className="text-white font-bold truncate text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {title}
        </h3>
        <p className="text-zinc-300 text-xs truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {artist}
        </p>
      </div>

      {/* Play Icon - Shows on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-green-500 rounded-full p-3 shadow-lg">
          <Music size={24} className="text-black" />
        </div>
      </div>

      {/* Active Indicator */}
      {isActive && (
        <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-green-500 animate-pulse" />
      )}
    </div>
  );
}
