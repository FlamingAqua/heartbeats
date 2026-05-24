import "./globals.css";
import { PlayerProvider } from "@/context/PlayerContext";
import { songs } from "@/data/songs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PlayerProvider songs={songs}>
          {children}
        </PlayerProvider>
      </body>
    </html>
  );
}