/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Equalizer from "@/components/Equalizer";
import SongCard from "@/components/SongCard";
import { X, SkipBack, SkipForward } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";
import { songs } from "@/data/songs";
import { motion, AnimatePresence } from "framer-motion";
import BeatParticles from "@/components/BeatParticles";
export default function Home() {
  const player = usePlayer();
  const bgImage = player.currentSong?.cover;
  const bg = player.currentSong?.cover;
  return (
    <>
      <BeatParticles trigger={player.beatTrigger} />
      {/* Song Grid */}
      <main className="relative overflow-hidden min-h-screen bg-black text-white px-4 py-6 sm:px-8 md:px-10 pb-40">
        <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-green-500/10 blur-[120px] top-[-200px] left-[-200px]" />
        <div className="absolute w-[400px] h-[400px] bg-purple-500/10 blur-[120px] bottom-[-200px] right-[-200px]" />
        </div>
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-extrabold tracking-tight relative">
           <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,197,94,0.5)]">
              HeartBEATS 🎵
           </span>
          </h1>

  <p className="text-zinc-400 mt-3">
    Feel the rhythm. Live the sound. Made just for you, by YOUR MANESH. ❤️
  </p>
</div>
 
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6 mb-10">
          {songs.map((song, index) => (
            <motion.div
  key={song.id}
  onClick={() => player.playSong(index)}
  className="cursor-pointer perspective-1000"
  whileHover={{
    scale: 1.06,
    rotateX: 6,
    rotateY: -6,
    y: -10,
  }}
  whileTap={{
    scale: 0.98,
    rotateX: 0,
    rotateY: 0,
  }}
  transition={{
    type: "spring",
    stiffness: 260,
    damping: 18,
  }}
>
  {/* 3D wrapper */}
  <div className="relative group preserve-3d">

    {/* ⭐ NOW PLAYING PULSE RING */}
    {player.currentSong?.id === song.id && (
      <div className="absolute inset-0 rounded-xl border border-green-400/60 shadow-[0_0_20px_rgba(34,197,94,0.4)] animate-pulse" />
    )}

    {/* 💡 Glow layer */}
    <div className="absolute inset-0 rounded-xl bg-green-400/10 blur-xl opacity-0 group-hover:opacity-100 transition duration-300" />
    

    {/* 🎧 Card */}
    <div className="relative transform-gpu transition-transform duration-300">
      <SongCard
        title={song.title}
        artist={song.artist}
        cover={song.cover}
        isActive={player.currentSong?.id === song.id}
      />
    </div>

  </div>
</motion.div>
          ))}
        </div>
      </main>
      {/* BACKGROUND BLUR LAYER */}
          {bg && (
  <         div className="fixed inset-0 z-0 overflow-hidden">
    
              {/* Background image */}
              <img
                src={bg}
                className="w-full h-full object-cover scale-110 blur-3xl opacity-60 transition-all duration-700"
                alt="background"
    />

              {/* Dark overlay */}
              <div className="absolute inset-0backdrop-blur-2xl bg-black/40 border-t border-white/10 shadow-[0_-20px_80px_rgba(0,0,0,0.6)]" />
                </div>
           )}
      {/* Player */}
      {player.currentSong && (
        <>
          {/* 🌌 BACKGROUND BLUR (PUT THIS FIRST) */}
    <AnimatePresence mode="wait">
      <motion.div
        key={player.currentSong.id}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center blur-3xl scale-110"
          style={{
            backgroundImage: `url(${player.currentSong.cover})`,
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
      </motion.div>
    </AnimatePresence>
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
          <div className="fixed bottom-0 left-0 w-full bg-white/5 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.4)] p-6 z-30">
            
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
              <div className="hidden md:flex items-center gap-5 pr-2">

  <button className="text-zinc-400 hover:text-red-400 transition hover:scale-110">
    ❤️
  </button>

  <button className="text-zinc-400 hover:text-white transition hover:scale-110">
    ☰
  </button>

  {/* Hover Volume */}
  <div className="flex items-center gap-2 group">
    <span className="text-zinc-400 group-hover:text-white transition">
      🔊
    </span>

    <input
      type="range"
      min="0"
      max="100"
      defaultValue="80"
      className="w-0 group-hover:w-24 transition-all duration-300 accent-green-500"
    />
  </div>

</div>
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