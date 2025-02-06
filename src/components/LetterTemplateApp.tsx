import { useState } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

function LetterTemplateApp() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const generateDocx = async () => {
    try {
      const response = await fetch("/template.docx");
      const arrayBuffer = await response.arrayBuffer();

      const zip = new PizZip(arrayBuffer);
      const doc = new Docxtemplater(zip);

      doc.render({ name, date });
      const output = doc.getZip().generate({ type: "blob" });
      saveAs(output, "Generate-Doc.docx");
    } catch (error) {
      console.error("Error generating doc:", error);
    }
  };

  return (
    <>
      <h1>Generate Docx</h1>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={generateDocx}>Buat Docx</button>
    </>
  );
}

export default LetterTemplateApp;
