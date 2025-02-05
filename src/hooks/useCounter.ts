import { useState } from "react";

// Custom Hooks
export const useCounter = () => {
  const [count, setCount] = useState(0);

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };
  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleReset = () => {
    setCount(0);
    alert("Reset");
  };

  // Object yang dikembalikan
  return {
    count,
    handleDecrement,
    handleIncrement,
    handleReset,
  };
};
