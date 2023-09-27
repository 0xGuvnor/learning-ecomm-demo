"use client";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import ReactConfetti from "react-confetti";

const ConfettiProvider = () => {
  const confetti = useConfettiStore();

  if (!confetti.isOpen) return null;
  return (
    <ReactConfetti
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={() => confetti.onClose()}
      className="pointer-events-none z-50"
    />
  );
};
export default ConfettiProvider;
