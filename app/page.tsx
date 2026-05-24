/* eslint-disable @next/next/no-img-element */
"use client";

import Equalizer from "@/components/Equalizer";
import SongCard from "@/components/SongCard";
import { X, SkipBack, SkipForward } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";
import { songs } from "@/data/songs";


export default function Home() {
  const player = usePlayer();
  return (
    <>
      {/* Song Grid */}
      <main className="min-h-screen bg-black text-white px-4 py-6 sm:px-8 md:px-10 pb-40">
        <h1 className="text-5xl font-bold mb-10">HeartBEATS 🎵</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mb-10">
          {songs.map((song, index) => (
            <div
              key={song.id}
              onClick={() => player.playSong(index)}
              className="cursor-pointer"
            >
              <SongCard
                title={song.title}
                artist={song.artist}
                cover={song.cover}
                isActive={player.currentSong?.id === song.id}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Player */}
      {player.currentSong && (
        <>
          {/* Close Button */}
          <button
            onClick={player.close}
            className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white hover:bg-black/50 transition-all duration-300 hover:scale-110 flex items-center justify-center"
          >
            <X size={24} />
          </button>

          {/* Floating Album Art */}
          <div className="fixed bottom-40 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
            <div className="animate-[float_5s_ease-in-out_infinite]">
              <div
                className={`rounded-3xl overflow-hidden border border-white/10 shadow-2xl ${
                  player.isPlaying
                    ? "animate-[pulseGlow_3s_ease-in-out_infinite]"
                    : ""
                }`}
              >
                <img
                  src={player.currentSong.cover}
                  alt={player.currentSong.title}
                  className="max-h-[40vh] sm:max-h-[50vh] md:max-h-[60vh] w-auto max-w-[85vw] sm:max-w-[70vw] md:max-w-[60vw] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Bottom Player Bar */}
          <div className="fixed bottom-0 left-0 w-full bg-linear-to-t from-zinc-900 via-zinc-900 to-transparent border-t border-zinc-800 p-6 z-30">
            
            {/* Top Row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">

              {/* Left */}
              <div className="flex items-center gap-4 min-w-0 flex-1 w-full md:w-auto">
                <img
                  src={player.currentSong.cover}
                  className="w-16 h-16 rounded-lg object-cover shrink-0 shadow-lg"
                  alt={player.currentSong.title}
                />

                <div className="flex items-center gap-3 min-w-0">
                  <Equalizer isPlaying={player.isPlaying} />

                  <div className="min-w-0">
                    <h2 className="text-white font-bold truncate text-lg">
                      {player.currentSong.title}
                    </h2>
                    <p className="text-sm text-zinc-400 truncate">
                      {player.currentSong.artist}
                    </p>
                  </div>
                </div>
              </div>

              {/* Center Controls */}
              <div className="flex items-center justify-center gap-4 md:gap-6 shrink-0">
                <button
                  onClick={player.playPrevious}
                  className="text-white hover:text-green-400 transition hover:scale-110 active:scale-95"
                >
                  <SkipBack size={28} />
                </button>

                <button
                  onClick={player.togglePlayPause}
                  className="bg-green-500 hover:bg-green-400 rounded-full w-14 h-14 text-black flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg shadow-green-500/30 text-2xl font-bold"
                >
                  {player.isPlaying ? "⏸" : "▶"}
                </button>

                <button
                  onClick={player.playNext}
                  className="text-white hover:text-green-400 transition hover:scale-110 active:scale-95"
                >
                  <SkipForward size={28} />
                </button>
              </div>

              {/* Right spacer */}
              <div className="flex-1 hidden md:block" />
            </div>

            {/* Progress Bar */}
            <div className="w-full flex items-center gap-2 sm:gap-3">
              <span className="text-xs text-gray-400 min-w-8 sm:min-w-10">
                {player.formatTime(player.currentTime)}
              </span>

              <input
                type="range"
                min="0"
                max={player.duration || 0}
                value={player.currentTime}
                onChange={(e) => player.seek(Number(e.target.value))}
                className="flex-1 h-1.5 appearance-none bg-gray-700 rounded-lg cursor-pointer accent-green-500 hover:h-2 transition-[height] duration-200"
                style={{
                  background: `linear-gradient(to right, #22c55e 0%, #22c55e ${
                    player.progress
                  }%, #374151 ${player.progress}%, #374151 100%)`,
                }}
              />

              <span className="text-xs text-gray-400 min-w-10">
                {player.formatTime(player.duration)}
              </span>
            </div>
          </div>
        </>
      )}

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          50% { box-shadow: 0 0 0 20px rgba(34, 197, 94, 0); }
        }
      `}</style>
    </>
  );
}