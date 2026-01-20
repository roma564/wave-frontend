import { createPortal } from "react-dom";
import EmojiPicker from "emoji-picker-react";

export function EmojiPortal({ onSelect }: { onSelect: (emoji: string) => void }) {
  const root = document.getElementById("emoji-root");
  if (!root) return null;

  return createPortal(
    <div className=" h-screen">
      <EmojiPicker onEmojiClick={(e) => onSelect(e.emoji)} />
    </div>,
    root
  );
}
