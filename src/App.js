import { useState } from "react";
import "./App.css";
import { aesEncrypt } from "./AESHelper";
import { aesDecrypt } from "./AESHelper";

function App() {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");

  const [result, setResult] = useState("");

  const handleEncrypt = () => {
    if (!message || !key) {
      return;
    }

    const encrypted = aesEncrypt(message, key);
    setResult(encrypted);
  };

  const handleDecrypt = () => {
    if (!message || !key) {
      return;
    }
    const decrypted = aesDecrypt(message, key);
    setResult(decrypted);
  };
  return (
    // Hex string aes encrypt/decrypt
    <div className="container">
      <section className="m-auto container-inner">
        <div className="grid gap-10 w-300 mx-auto">
          <section className="grid gap-5">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              type="text"
              style={{ padding: "7px" }}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              rows={10}
            />
          </section>

          <section className="grid gap-5">
            <label htmlFor="key">Key</label>
            <input
              id="key"
              type="text"
              style={{ padding: "7px" }}
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
              }}
            />
          </section>

          <section className="flex gap-10">
            <button className="btn" onClick={handleEncrypt}>
              Encrypt
            </button>
            <button className="btn" onClick={handleDecrypt}>
              Decrypt
            </button>
          </section>
        </div>

        {/* Result */}
        <section className="w-300 grid gap-5 mx-auto">
          <label for="result">Result: </label>
          <textarea
            id="result"
            style={{ width: "100%" }}
            value={result}
            placeholder="Result"
            rows={16}
          ></textarea>
        </section>
      </section>
    </div>
  );
}

export default App;
