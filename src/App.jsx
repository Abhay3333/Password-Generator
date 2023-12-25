import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [password, setPassword] = useState("Generated Password");
  const [charLength, setCharLength] = useState("4");
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    switch (name) {
      case "uppercase":
        setIncludeUppercase(checked);
        break;
      case "lowercase":
        setIncludeLowercase(checked);
        break;
      case "numbers":
        setIncludeNumbers(checked);
        break;
      case "symbols":
        setIncludeSymbols(checked);
        break;
      default:
        break;
    }
  };

  const generatePassword = () => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+<>?";

    if (!charset) {
      toast.error("Please select at least one character set");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < charLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset.charAt(randomIndex);
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        toast.success("Password copied to clipboard!");
      })
      .catch((error) => {
        console.error("Unable to copy password: ", error);
      });
  };

  const handleCharLengthChange = (e) => {
    const length = parseInt(e.target.value);
    setCharLength(length);
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">Random Password Generator</h2>
        <div className="flex items-center mb-4">
          <label className="w-full border rounded py-2 px-3 mr-2 text-black bg-slate-400 h-auto">
            {password}
          </label>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">Character Length</h2>
        <h3 className="text=xl font-bold mb-2">{charLength}</h3>
        <div className="flex items-center mb-4">
          <label className="mr-2">Min</label>
          <input
            type="range"
            min={4}
            max={20}
            value={charLength}
            onChange={handleCharLengthChange}
            className="w-full"
          />
          <label className="ml-2">Max</label>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">Include</h2>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              name="uppercase"
              checked={includeUppercase}
              onChange={handleCheckboxChange}
            />
            Include Uppercase Letters
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              name="lowercase"
              checked={includeLowercase}
              onChange={handleCheckboxChange}
            />
            Include Lowercase Letters
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              name="numbers"
              checked={includeNumbers}
              onChange={handleCheckboxChange}
            />
            Include Numbers
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              name="symbols"
              checked={includeSymbols}
              onChange={handleCheckboxChange}
            />
            Include Symbols
          </label>
        </div>
      </section>

      <section>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={generatePassword}
        >
          Generate Password
        </button>
      </section>
    </div>
  );
};

export default App;
