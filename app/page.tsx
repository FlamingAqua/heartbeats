/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState } from "react";
import {
  X,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react"
import SongCard from "@/components/SongCard";
const songs = [
  {
    id: 1,
    title: "Aashiqui",
    artist: "Me",
    cover: "/covers/Cover 1.jpg",
    audio: "/songs/Aashiqui.m4a",
  },
  {
    id: 2,
    title: "Andha Arabic Kadal",
    artist: "Me",
    cover: "/covers/Cover 2.jpg",
    audio: "/songs/Andha Arabic Kadal.m4a",
  },
  {
    id: 3,
    title: "Bae",
    artist: "Me",
    cover: "/covers/Cover 3.jpg",
    audio: "/songs/Bae.m4a",    
  },
  {
    id: 4,
    title: "Idhazhin Oram",
    artist: "Me",
    cover: "/covers/Cover 4.jpg",
    audio: "/songs/Idhazhin Oram.m4a",
  },
  {
    id: 5,
    title: "Kadhal Aasai",
    artist: "Me",
    cover: "/covers/Cover 5.jpg",
    audio: "/songs/Kadhal Aasai.mp3",
  },
  {
    id: 6,
    title: "Kanmoodi",
    artist: "Me",
    cover: "/covers/Cover 6.jpg",
    audio: "/songs/Kanmoodi.mp3",
  },
  {
    id: 7,
    title: "Kannana Kanne",
    artist: "Me",
    cover: "/covers/Cover 7.jpg",
    audio: "/songs/Kannana Kanne.m4a",
  },
  {
    id: 8,
    title: "My Heart Will Go On",
    artist: "Me",
    cover: "/covers/Cover 8.jpg",
    audio: "/songs/My heart will go on.mp3",
  },
  {
    id: 9,
    title: "Nee Kavithaigala",
    artist: "Me",
    cover: "/covers/Cover 9.jpg",
    audio: "/songs/Nee Kavithaigala.mp3",
  },
  {
    id: 11,
    title: "Neeyum Naanum Anbe",
    artist: "Me",
    cover: "/covers/Cover 11.jpg",
    audio: "/songs/Neeyum Nanum Anbe.m4a",
  },
  {
    id: 12,
    title: "Oh Penne",
    artist: "Me",
    cover: "/covers/Cover 12.jpg",
    audio: "/songs/Oh Penne.m4a",
  },
  {
    id: 13,
    title: "Othaiyadi Pathayila",
    artist: "Me",
    cover: "/covers/Cover 13.jpg",
    audio: "/songs/Othaiadi pathaiilye.m4a",
  },
  {
    id: 14,
    title: "Perfect",
    artist: "Me",
    cover: "/covers/Cover 14.jpg",
    audio: "/songs/Perfect.m4a",
  },
  {
    id: 15,
    title: "Pookale Sattru Oyivedungal",
    artist: "Me",
    cover: "/covers/Cover 15.jpg",
    audio: "/songs/Pookale.m4a",
  },
  {
    id: 16,
    title: "Right By Your Side",
    artist: "Me",
    cover: "/covers/Cover 16.jpg",
    audio: "/songs/Right by your side.m4a",
  },
  {
    id: 17,
    title: "Thangamey",
    artist: "Me",
    cover: "/covers/Cover 17.jpg",
    audio: "/songs/Thangamey.mp3",
  },
  {
    id: 18,
    title: "Unnaku Enna Venu Sollu",
    artist: "Me",
    cover: "/covers/Cover 18.jpg",
    audio: "/songs/Unnaku enna venu sollu.m4a",
  },
];
export default function Home() {

  const [currentSong, setCurrentSong] = useState<
    (typeof songs)[0] | null
  >(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const progressPercentage =
  duration > 0 ? (currentTime / duration) * 100 : 0
  const playNextSong = () => {
  const nextIndex = (currentSongIndex + 1) % songs.length

  setCurrentSongIndex(nextIndex)
  setCurrentSong(songs[nextIndex])
  setIsPlaying(true)
}
const playPreviousSong = () => {
  const prevIndex =
    (currentSongIndex - 1 + songs.length) % songs.length

  setCurrentSongIndex(prevIndex)
  setCurrentSong(songs[prevIndex])
  setIsPlaying(true)
}
const closePlayer = () => {
  if (audioRef.current) {
    audioRef.current.pause()
    audioRef.current.currentTime = 0
  }

  setIsPlaying(false)
  setCurrentSong(null)
  setCurrentTime(0)
}
  return (
    <>
      <main className="min-h-screen bg-black text-white p-10">
        <h1 className="text-5xl font-bold mb-10">
          HeartBEATS 🎵
        </h1>

      <div className="flex gap-6 flex-wrap">
        {songs.map((song, index) => (
          <div
            key={song.id}
            onClick={() => {
  setCurrentSong(song)
  setCurrentSongIndex(index)
  setIsPlaying(false);
}}
          >
            <SongCard
              title={song.title}
              artist={song.artist}
              cover={song.cover}
              isActive={currentSong?.id === song.id}
            />
          </div>
        ))}
      </div>
      {currentSong && (
        <>
  <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-40">
  <button
  onClick={closePlayer}
  className="
    fixed
    top-6
    right-6
    z-50
    w-12
    h-12
    rounded-full
    bg-black/10
    backdrop-blur-md
    border border-white/10
    text-white
    text-2xl
    transition-all
    duration-300
    hover:scale-110
    hover:bg-black/20
  "
>
  <X size={24} />
</button>
  <div className="animate-[float_5s_ease-in-out_infinite]">
    <div
      className={
        isPlaying
          ? "animate-[pulseGlow_3s_ease-in-out_infinite]"
          : ""
      }
    >
      <img
        src={currentSong.cover}
        alt={currentSong.title}
      className={`
max-h-[70vh]
w-auto
max-w-[90vw]
object-contain
rounded-3xl
border border-white/10
transition-all duration-700
`}
      />
    </div>
    
  </div>
  
</div>

  <div className="fixed bottom-0 left-0 w-full bg-zinc-900 border-t border-zinc-800 px-6 py-4 flex items-center justify-between">

    {/* LEFT SECTION */}
    <div className="flex items-center gap-4">
      <img
        src={currentSong.cover}
        alt={currentSong.title}
        className="w-16 h-16 rounded-lg object-cover"
      />

      <div>
        <h2 className="font-semibold">
          {currentSong.title}
        </h2>

        <p className="text-sm text-zinc-400">
          {currentSong.artist}
        </p>
      </div>
    </div>

    {/* CENTER CONTROLS */}
    <div className="flex items-center gap-4">
  <button
  onClick={playPreviousSong}
  className="
    text-white
    transition
    hover:scale-110
    hover:text-green-400
  "
>
  <SkipBack size={28} />
</button>

  <button
    onClick={() => {
      if (!audioRef.current) return

      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }

      setIsPlaying(!isPlaying)
    }}
    className="
  bg-green-500
  rounded-full
  w-14
  h-14
  text-black
  flex
  items-center
  justify-center
  transition-all
  duration-300
  hover:scale-110
  hover:bg-green-400
  shadow-lg
  shadow-green-500/30
"
  >
    {isPlaying ? "⏸" : "▶"}
  </button>

  <button
  onClick={playNextSong}
  className="
    text-white
    transition
    hover:scale-110
    hover:text-green-400
  "
>
  <SkipForward size={28} />
</button>
  
</div>
    {/* HIDDEN AUDIO */}
    <audio
  ref={audioRef}
  src={currentSong?.audio}
  onTimeUpdate={() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }}
  onLoadedMetadata={() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }}
/>
<div className="w-full mt-4 flex items-center gap-3">
  <span className="text-sm text-gray-400">
    {Math.floor(currentTime / 60)}:
    {String(Math.floor(currentTime % 60)).padStart(2, "0")}
  </span>

  <input
    type="range"
    style={{
  background: `linear-gradient(to right, #1db954 ${progressPercentage}%, #374151 ${progressPercentage}%)`,
}}
    min="0"
    max={duration || 0}
    value={currentTime}
    onChange={(e) => {
      const newTime = Number(e.target.value)

      if (audioRef.current) {
        audioRef.current.currentTime = newTime
      }

      setCurrentTime(newTime)
    }}
    className="flex-1 h-1 appearance-none bg-gray-700 rounded-lg cursor-pointer"
  />

  <span className="text-sm text-gray-400">
    {Math.floor(duration / 60)}:
    {String(Math.floor(duration % 60)).padStart(2, "0")}
  </span>
</div>
  </div>
  </>
)}
    </main>
      
    </> 
  );
}
