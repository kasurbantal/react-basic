import { useRef, useState } from "react";

const FormPage = () => {
  //Uncontrolled component
  // const inputNameRef = useRef<HTMLInputElement>(null);
  // const inputEmailRef = useRef<HTMLInputElement>(null);

  //Controlled component
  const [fullNameInput, setfullNameInput] = useState("");
  const [passwordInput, setpasswordInput] = useState("");

  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const handleSubmit = () => {
    // const fullNameForValue = inputNameRef.current?.value;
    // const emailForValue = inputEmailRef.current?.value;
    // alert("Form Submited " + fullNameForValue + " " + emailForValue);

    const fullNameValidation = fullNameInput.length < 3;
    const passwordValidation = passwordInput.length < 8;

    if (fullNameValidation) {
      setUsernameErrorMessage("Username must be at least 3 characters");
      return;
    }

    if (passwordValidation) {
      setPasswordErrorMessage("Password must be at least 8 characters");
      return;
    }
  };

  return (
    <>
      <h1>Form Page</h1>

      <h3>Full Name: {fullNameInput}</h3>
      <h3>Password: {passwordInput}</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label htmlFor="full-name">Full Name</label>
        {/* <input ref={inputNameRef} id="full-name" type="text" /> */}
        <input
          onChange={(e) => {
            setfullNameInput(e.target.value);
            const fullNameValidation = e.target.value.length < 3;
            if (fullNameValidation) {
              setUsernameErrorMessage("Username must be at least 3 chars");
              return;
            } else {
              setUsernameErrorMessage("");
            }
          }}
          id="full-name"
          type="text"
          value={fullNameInput}
        />
        {/* memberikan notifikasi atas kesalahan pengisian */}
        <span style={{ color: "red" }}>{usernameErrorMessage}</span>
        <label htmlFor="password">Password</label>
        {/* <input ref={inputEmailRef} id="email" type="email" /> */}
        <input
          onChange={(e) => {
            setpasswordInput(e.target.value);
            const passwordValidation = e.target.value.length < 8;
            if (passwordValidation) {
              setPasswordErrorMessage("Password must be at least 8 chars");
              return;
            } else {
              setPasswordErrorMessage("");
            }
          }}
          id="password"
          type="password"
          value={passwordInput}
        />

        {/* memberikan notifikasi atas kesalahan pengisian */}
        <span style={{ color: "red" }}>{passwordErrorMessage}</span>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default FormPage;
