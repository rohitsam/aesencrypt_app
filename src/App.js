import { useState } from "react";
import "./App.css";
import { aesEncrypt, aesEncryptbase64 } from "./AESHelper";
import { aesDecrypt,aesDecryptbase64 } from "./AESHelper";
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [deviceid, setDeviceId] = useState("");
  const [result, setResult] = useState("");
  const [doBase64, setDoBase64] = useState(false);
  const [openSurprize, setOpenSurprize] = useState(false);

  const handleEncrypt = () => {
    if (!message || !key) {
      return;
    }

    if (doBase64) {
      const encrypted = aesEncryptbase64(message, key);
      setResult(encrypted);
    } else {
      const encrypted = aesEncrypt(message, key);
      setResult(encrypted);
    }
  };

  const handleDecrypt = () => {
    if (!message || !key) {
      return;
    }
    // const decrypted = aesDecrypt(message, key);

    if (doBase64) {
      const decrypted = aesDecryptbase64(message, key);
      setResult(decrypted);
    } else {
      const decrypted = aesDecrypt(message, key);
      setResult(decrypted);
    }
  };

  const getDevSubTopic = () => {
    var myHeaders = new Headers();
    myHeaders.append("g_key", "interop_is_lowkey_selfish");
    myHeaders.append(
      "Authorization",
      "Bearer 3S0cfyRKey20.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDU1NDA0MjA4ODEsImVhdCI6MTY1MDcyNDQyMDg4MX0.90989ZY81d7MbNvFymX2STnBqHVUdpuBdwLn60A0Tps"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      device_id: deviceid,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://platform.kazam.in/getSubtopic", requestOptions)
      .then((response) => response.text())
      .then((result) => setKey(JSON.parse(result).sub_topic + "168"))
      .catch((error) => console.log("error", error));
  };

  const handleCopy = () => {
    var resultText = document.getElementById("result");

    resultText.select();
    resultText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(resultText.value);

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied: " + resultText.value;
  };
  const genstart = () => {
  

    var start_packet = {"cp_cmd":7,"request_id":uuidv4(),
    "txd_details":{"txd_id":uuidv4(),"start_time":Math.floor(Date.now() / 1000),"duration":800,"usage_limit":10000,"user_id":uuidv4()}}
    setMessage(JSON.stringify(start_packet));
    console.log(JSON.stringify(start_packet));
  };
  const gentimesync = () => {
    var timepacket = {"cp_cmd":12,"request_id":uuidv4(),"time":Math.floor(Date.now() / 1000)};
    setMessage(JSON.stringify(timepacket));
  };

  const genstop = () => {
    var timepacket = {"cp_cmd":8,"request_id":uuidv4()};
    setMessage(JSON.stringify(timepacket));
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
                src="https://media.tenor.com/jzM_LDwcQw4AAAAC/bear-wild-animal.gif"
                alt="funny"
              />
              <button className="surprize">close</button>
            </div>
          </div>
        )}

        <h1 className="heading px-2 sm:heading-lg">
          Hex/Base64 string AES Encrypt/Decrypt
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
              <input
                type="checkbox"
                value={doBase64}
                onClick={(e) => setDoBase64(e.target.checked)}
                id="doBase64"
              />
              <label htmlFor="doBase64"> Base64 </label>
              <button className="btn" onClick={gentimesync} style={{ fontSize: '12px', padding: '3px', width: '50px',color:"white",backgroundColor:"green" }}>
                Time
              </button>
                   
              <button className="btn" onClick={genstart} style={{ fontSize: '12px', padding: '3px', width: '50px',color:"white",backgroundColor:"green" }} >
                Start
              </button>

              <button className="btn" onClick={genstop} style={{ fontSize: '12px', padding: '3px', width: '50px',color:"white",backgroundColor:"green" }} >
                Stop
              </button>
                
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
      

          
                


        </div>
      </section>
      

      


      
      
      
    </div>
  );
}

export default App;
