"use client";

interface DeleteButtonProps {
  onClick: () => void;
}

export default function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="absolute top-2 left-2 bg-red-400 text-white text-xs px-3 py-1 font-mono border-2 border-black"
      style={{
        borderStyle: "outset",
        fontFamily: "'Courier New', monospace",
        boxShadow: "2px 2px 0px #333",
      }}
      onMouseDown={(e) => (e.currentTarget.style.borderStyle = "inset")}
      onMouseUp={(e) => (e.currentTarget.style.borderStyle = "outset")}
    >
      DELETE
    </button>
  );
}
