import { useRef, useState } from "react";

const FormPage = () => {
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);

  const [fullNameInput, setfullNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const handleSubmit = () => {
    const fullNameForValue = inputNameRef.current?.value;
    const emailForValue = inputEmailRef.current?.value;
    alert("Form Submited " + fullNameForValue + " " + emailForValue);
  };

  return (
    <>
      <h1>Form Page</h1>

      <h3>{fullNameInput}</h3>
      <h3>{emailInput}</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label htmlFor="full-name">Full Name</label>
        {/* <input ref={inputNameRef} id="full-name" type="text" /> */}
        <input
          onChange={(e) => setfullNameInput(e.target.value)}
          id="full-name"
          type="text"
        />
        <label htmlFor="email">Email</label>
        {/* <input ref={inputEmailRef} id="email" type="email" /> */}
        <input
          onChange={(e) => setEmailInput(e.target.value)}
          id="email"
          type="email"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default FormPage;
