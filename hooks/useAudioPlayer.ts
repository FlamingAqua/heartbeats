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

  // ================= REF =================
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ================= DERIVED STATE =================
  const currentSong =
    currentSongIndex !== null ? songs[currentSongIndex] : null;

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
  const play = useCallback(() => {
    if (currentSongIndex === null) return;
    setIsPlaying(true);
  }, [currentSongIndex]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (currentSongIndex === null) return;
    setIsPlaying((prev) => !prev);
  }, [currentSongIndex]);

  const playSong = useCallback((index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
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
  };
}