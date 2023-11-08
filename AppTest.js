import { useState } from "react";
import "./App.css";
import { aesEncrypt, aesEncryptbase64} from "./AESHelper";
import { aesDecrypt } from "./AESHelper";

function App() {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [deviceid, setDeviceId] = useState("");
  const [result, setResult] = useState("");
  const [resultb64, setResultb64] = useState("");
  const [doBase64, setDoBase64] = useState(false);
  const [openSurprize, setOpenSurprize] = useState(false);

  const handleEncrypt = () => {
    if (!message || !key) {
      return;
    }

    const encrypted = aesEncrypt(message, key);
    const encryptedbase64 =  aesEncryptbase64(message, key);
    setResult(encrypted);
    // setResultb64(encryptedbase64);
  };

  const handleDecrypt = () => {
    if (!message || !key) {
      return;
    }
    const decrypted = aesDecrypt(message, key);
    setResult(decrypted);
  };

  const getDevSubTopic = ()=>{

    var myHeaders = new Headers();
    myHeaders.append("g_key", "interop_is_lowkey_selfish");
    myHeaders.append("Authorization", "Bearer 3S0cfyRKey20.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDU1NDA0MjA4ODEsImVhdCI6MTY1MDcyNDQyMDg4MX0.90989ZY81d7MbNvFymX2STnBqHVUdpuBdwLn60A0Tps");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "device_id": deviceid
      });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://platform.kazam.in/getSubtopic", requestOptions)
      .then(response => response.text())
      .then(result => setKey(JSON.parse(result).sub_topic+'168'))
      .catch(error => console.log('error', error));
  
  }
  
  const handleCopy = () => {
    var resultText = document.getElementById("result");

    resultText.select();
    resultText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(resultText.value);

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied: " + resultText.value;
  };

  const outFunc = () => {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
  };

  return (
    //
    <div className="container">
      <section className="m-auto sub-container">
        <button
          onClick={() => {
            setOpenSurprize((prev) => !prev);
          }}
          className="surprize surprize-absolute"
        >
          surprize!
        </button>

        {openSurprize && (
          <div className="modal-container">
            <div
              className="modal grid gap-10"
              onClick={() => setOpenSurprize(false)}
            >
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
            
            <div>
              <input type='checkbox' value={doBase64} onClick={(e)=>{console.log(e.target.checked); setDoBase64(val=>!val)}} id="doBase64" />
              <label htmlFor="doBase64" >Base64</label>
            </div>

            <section className="flex gap-10">
              <button className="btn" onClick={handleEncrypt}>
                Encrypt
              </button>
              <button className="btn" onClick={handleDecrypt}>
                Decrypt
              </button>
            </section>
            <section className="grid gap-6">
              <label htmlFor="deviceid">DeviceId</label>
              <input
                id="deviceid"
                type="text"
                className="textInputField"
                value={deviceid}
                onChange={(e) => {
                  setDeviceId(e.target.value.toLowerCase());
                }}
              />
            </section>
            <section className="flex gap-10">
              <button className="btn" onClick={getDevSubTopic}>
                get device key
              </button>
            </section>

          </div>

          {/* Result */}
          <section className="w-300 grid gap-5 mx-auto">
            <div className="flex justify-between">
              <label htmlFor="result">Result: </label>
              <div className="tooltip">
                <button
                  className="copyBtn"
                  onClick={handleCopy}
                  onMouseOut={outFunc}
                >
                  <span className="tooltiptext" id="myTooltip">
                    Copy to clipboard
                  </span>
                  Copy Result
                </button>
              </div>
            </div>
            <textarea
              id="result"
              className="textInputField"
              value={result}
              placeholder="Result"
              rows={18}
              readOnly
            ></textarea>
          </section>
          {/* <section className="w-300 grid gap-5 mx-auto">
            <div className="flex justify-between">
              <label htmlFor="result">Result: </label>
              <div className="tooltip">
                <button
                  className="copyBtn"
                  onClick={handleCopy}
                  onMouseOut={outFunc}
                >
                  <span className="tooltiptext" id="myTooltip">
                    Copy to clipboard
                  </span>
                  Copy Result
                </button>
              </div>
            </div>
            <textarea
              id="result"
              className="textInputField"
              value={resultb64}
              placeholder="Result"
              rows={18}
              readOnly
            ></textarea>
          </section> */}
        </div>
      </section>
    </div>
  );
}

export default App;
