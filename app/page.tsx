/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { X,  SkipBack,  SkipForward,} from "lucide-react"
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
  // ========== STATE ==========
  const [currentSong, setCurrentSong] = useState<(typeof songs)[0] | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // ========== REFS ==========
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ========== COMPUTED VALUES ==========
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // ========== CALLBACKS ==========
  const playNextSong = useCallback(() => {
    setCurrentSongIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % songs.length;
      setCurrentSong(songs[nextIndex]);
      setIsPlaying(true);
      return nextIndex;
    });
  }, []);

  const playPreviousSong = useCallback(() => {
    setCurrentSongIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + songs.length) % songs.length;
      setCurrentSong(songs[newIndex]);
      setIsPlaying(true);
      return newIndex;
    });
  }, []);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  }, [isPlaying]);

  const closePlayer = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentSong(null);
    setCurrentTime(0);
  }, []);

  const handleProgressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  }, []);

  // ========== EFFECTS ==========
  // Update audio source when song changes
  useEffect(() => {
    if (currentSong && audioRef.current) {
      <audio 
        ref={audioRef}
        src={currentSong?.audio} />
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong, isPlaying]);

  // Auto-play next song when current ends
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      playNextSong();
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playNextSong]);

  // ========== HELPERS ==========
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  // ========== RENDER ==========
  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
      />

      <main className="min-h-screen bg-black text-white p-10 pb-40">
        <h1 className="text-5xl font-bold mb-10">HeartBEATS 🎵</h1>

        {/* Song Grid */}
        <div className="flex gap-6 flex-wrap mb-10">
          {songs.map((song, index) => (
            <div
              key={song.id}
              onClick={() => {
                setCurrentSong(song);
                setCurrentSongIndex(index);
                setIsPlaying(true);
              }}
              className="cursor-pointer"
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
      </main>

      {/* Player Overlay - Shows when song is selected */}
      {currentSong && (
        <>
          {/* Close Button */}
          <button
            onClick={closePlayer}
            className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white hover:bg-black/50 transition-all duration-300 hover:scale-110 flex items-center justify-center"
          >
            <X size={24} />
          </button>

          {/* Floating Album Art */}
          <div className="fixed bottom-40 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
            <div className="animate-[float_5s_ease-in-out_infinite]">
              <div
                className={`rounded-3xl overflow-hidden border border-white/10 shadow-2xl ${
                  isPlaying ? 'animate-[pulseGlow_3s_ease-in-out_infinite]' : ''
                }`}
              >
                <img
                  src={currentSong.cover}
                  alt={currentSong.title}
                  className="max-h-[60vh] w-auto max-w-[80vw] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Bottom Player Bar */}
          <div className="fixed bottom-0 left-0 w-full bg-linear-to-t from-zinc-900 via-zinc-900 to-transparent border-t border-zinc-800 p-6 z-30">
            {/* Main Player Content */}
            <div className="flex items-center justify-between gap-6 mb-4">
              {/* Left Section - Song Info */}
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <img
                  src={currentSong.cover}
                  alt={currentSong.title}
                  className="w-16 h-16 rounded-lg object-cover shrink-0 shadow-lg"
                />
                <div className="min-w-0">
                  <h2 className="text-white font-bold truncate text-lg">
                    {currentSong.title}
                  </h2>
                  <p className="text-sm text-zinc-400 truncate">
                    {currentSong.artist}
                  </p>
                </div>
              </div>

              {/* Center Section - Controls */}
              <div className="flex items-center justify-center gap-6 shrink-0">
                <button
                  onClick={playPreviousSong}
                  className="text-white hover:text-green-400 transition hover:scale-110 active:scale-95"
                >
                  <SkipBack size={28} />
                </button>

                <button
                  onClick={togglePlayPause}
                  className="bg-green-500 hover:bg-green-400 rounded-full w-16 h-16 text-black flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg shadow-green-500/30 text-2xl font-bold"
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>

                <button
                  onClick={playNextSong}
                  className="text-white hover:text-green-400 transition hover:scale-110 active:scale-95"
                >
                  <SkipForward size={28} />
                </button>
              </div>

              {/* Right Section - Empty for future features */}
              <div className="flex-1" />
            </div>

            {/* Progress Bar Section */}
            <div className="w-full flex items-center gap-3">
              <span className="text-xs text-gray-400 min-w-10">
                {formatTime(currentTime)}
              </span>

              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleProgressChange}
                className="flex-1 h-1.5 appearance-none bg-gray-700 rounded-lg cursor-pointer accent-green-500 hover:h-2 transition-[height] duration-200"
                style={{
                  background: `linear-gradient(to right, #22c55e 0%, #22c55e ${progressPercentage}%, #374151 ${progressPercentage}%, #374151 100%)`,
                }}
              />

              <span className="text-xs text-gray-400 min-w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </>
      )}

      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
          }
          50% {
            box-shadow: 0 0 0 20px rgba(34, 197, 94, 0);
          }
        }
      `}</style>
    </>
  );
}
