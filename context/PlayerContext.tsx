"use client";

import { createContext, useContext } from "react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

type Song = {
  id: number;
  title: string;
  artist: string;
  cover: string;
  audio: string;
};

type PlayerContextType = ReturnType<typeof useAudioPlayer>;

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({
  songs,
  children,
}: {
  songs: Song[];
  children: React.ReactNode;
}) {
  const player = useAudioPlayer(songs);

  return (
    <PlayerContext.Provider value={player}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("PlayerContext must be used inside PlayerProvider");
  }

  return context;
}