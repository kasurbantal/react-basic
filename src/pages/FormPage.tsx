const FormPage = () => {
  const handleSubmit = () => {
    alert("Form Submited");
  };

  return (
    <>
      <h1>Form Page</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label htmlFor="full-name">Full Name</label>
        <input id="full-name" type="text" />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default FormPage;
