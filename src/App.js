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
    <div style={{ display: "flex", height: "100vh" }}>
      <section
        style={{
          margin: "auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          paddingLeft: "2rem",
          paddingRight: "2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: "10px",
            width: "300px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div style={{ display: "grid", gap: "5px" }}>
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
          </div>

          <div style={{ display: "grid", gap: "5px" }}>
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
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              style={{
                width: "100%",
                borderRadius: "4px",
                border: "none",
                padding: "10px",
                cursor: "pointer",
                backgroundColor: "darkblue",
                color: "white",
              }}
              onClick={handleEncrypt}
            >
              Encrypt
            </button>
            <button
              style={{
                width: "100%",
                borderRadius: "4px",
                border: "none",
                padding: "10px",
                cursor: "pointer",
                backgroundColor: "darkblue",
                color: "white",
              }}
              onClick={handleDecrypt}
            >
              Decrypt
            </button>
          </div>
        </div>
        <div
          style={{
            width: "300px",
            display: "grid",
            gap: "5px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <label for="result">Result: </label>
          <textarea
            id="result"
            style={{ width: "100%" }}
            value={result}
            placeholder="Result"
            rows={16}
          ></textarea>
        </div>
      </section>
    </div>
  );
}

export default App;
