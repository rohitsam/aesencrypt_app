import { useState } from "react";
import "./App.css";
import { aesEncrypt } from "./AESHelper";
import { aesDecrypt } from "./AESHelper";

function App() {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");

  const [open, setOpen] = useState(false);

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
    //
    <div className="container">
      <section className="m-auto sub-container">
        <button
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          className="surprize surprize-absolute"
        >
          surprize!
        </button>

        {open && (
          <div className="modal-container">
            <div className="modal grid gap-10" onClick={() => setOpen(false)}>
              <img
                src="https://c.tenor.com/8EgAFZdO8JUAAAAC/sitpost.gif"
                alt="funny"
              />
              <button className="surprize">close</button>
            </div>
          </div>
        )}

        <h1 className="heading px-2 sm:heading-lg">
          Hex string AES Encrypt/Decrypt
        </h1>
        <div className="container-inner px-2">
          <div className="grid gap-10 w-300 mx-auto">
            <section className="grid gap-5">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                type="text"
                className="textInputField"
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
                className="textInputField"
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
              className="textInputField"
              value={result}
              placeholder="Result"
              rows={18}
            ></textarea>
          </section>
        </div>
      </section>
    </div>
  );
}

export default App;
