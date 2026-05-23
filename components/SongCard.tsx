type SongCardProps = {
  title: string;
  artist: string;
  cover: string;
  isActive: boolean
};

export default function SongCard({
  title,
  artist,
  cover,
  isActive,
}: SongCardProps) {
  return (
    <div
  className={`p-4 rounded-xl transition-all duration-300 cursor-pointer
  ${
    isActive
      ? "bg-green-500/20 border border-green-400 shadow-lg shadow-green-500/20 scale-105"
      : "bg-gray-900 hover:bg-gray-800"
  }`}
>
    <img
  src={cover}
  alt={title}
  className="h-52 w-full object-cover rounded-lg mb-4"
/>

      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="text-zinc-400">{artist}</p>
    </div>
  );
}