"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Song = {
  id: number;
  title: string;
  artist: string;
  cover: string;
  audio: string;
};

export function useAudioPlayer(songs: Song[]) {
  // ================= STATE =================
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const [audioEnergy, setAudioEnergy] = useState(0);
  const openExpandedPlayer = useCallback(() => {
     setIsExpanded(true);
    }, []);

  const closeExpandedPlayer = useCallback(() => {
    setIsExpanded(false);
    }, []);
  // ================= REF =================
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ================= DERIVED STATE =================
  const currentSong =
    currentSongIndex !== null ? songs[currentSongIndex] : null;

  
  useEffect(() => {
  if (!audioRef.current) return;

  const audio = audioRef.current;

  const context = new AudioContext();
  const source = context.createMediaElementSource(audio);
  const analyser = context.createAnalyser();

  analyser.fftSize = 256;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  source.connect(analyser);
  analyser.connect(context.destination);

  audioContextRef.current = context;
  analyserRef.current = analyser;
  dataArrayRef.current = dataArray;
}, []);


// ================= INIT AUDIO =================
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.pause();
      audio.src = "";

      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  // ================= LOAD SONG =================
  useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;
  if (currentSongIndex === null) return;

  const song = songs[currentSongIndex];
  if (!song) return;

  audio.src = song.audio;
  audio.load();

  // ✅ SAFE RESET (deferred, prevents React warning)
  queueMicrotask(() => {
    setCurrentTime(0);
  });
}, [currentSongIndex, songs]);
  // ================= PLAY / PAUSE SYNC =================
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && currentSongIndex !== null) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSongIndex]);

  // ================= CONTROLS =================
  const [beatTrigger, setBeatTrigger] = useState(0);
  const play = useCallback((index: number) => {
  setCurrentSongIndex(index);
  setIsPlaying(true);

  // 💥 BEAT EXPLOSION TRIGGER
  setBeatTrigger((prev) => prev + 1);
}, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const togglePlayPause = useCallback(() => {
  setIsPlaying((prev) => !prev);

  // 💥 small pulse even on play/pause
  setBeatTrigger((p) => p + 1);
}, []);

  const playSong = useCallback((index: number) => {
  setCurrentSongIndex(index);
  setIsPlaying(true);
  setIsExpanded(true); // ⭐ open fullscreen automatically
}, []);

  const playNext = useCallback(() => {
    setCurrentSongIndex((prev) => {
      const current = prev ?? 0;
      return (current + 1) % songs.length;
    });
    setIsPlaying(true);
  }, [songs.length]);

  const playPrevious = useCallback(() => {
    setCurrentSongIndex((prev) => {
      const current = prev ?? 0;
      return (current - 1 + songs.length) % songs.length;
    });
    setIsPlaying(true);
  }, [songs.length]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  // ✅ FIXED CLOSE (IMPORTANT)
  const close = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentSongIndex(null); // ✅ FIX: no auto fallback to song 0
  }, []);

  // ================= AUTO NEXT =================
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [playNext]);
  

  // ================= PROGRESS =================
  const progress =
    duration > 0 ? (currentTime / duration) * 100 : 0;

  // ================= UTILS =================
  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  // ================= RETURN =================
  return {
    // state
    currentSong,
    currentSongIndex,
    isPlaying,
    currentTime,
    duration,
    progress,

    // controls
    play,
    pause,
    togglePlayPause,
    playSong,
    playNext,
    playPrevious,
    seek,
    close,

    // utils
    formatTime,

    // ref
    audioRef,

    isExpanded,
    openExpandedPlayer,
    closeExpandedPlayer,

    //beattrigger
    beatTrigger,

  };
}