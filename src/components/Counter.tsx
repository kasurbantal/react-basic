import { useCounter } from "../hooks/useCounter";

const Counter = () => {
  //Pemanggilan object yang akan digunakan sebagai bagian dari custom hooks useCounter. Penempatannya harus di paling atas.
  const { count, handleDecrement, handleIncrement, handleReset } = useCounter();
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <button onClick={handleDecrement}>Kurangi</button>
      <p>{count}</p>
      <button onClick={handleIncrement}>Tambah</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Counter;
