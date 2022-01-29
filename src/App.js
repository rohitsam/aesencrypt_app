
import { useState } from 'react'
import './App.css';
import { aesEncrypt } from './AESHelper';
import { aesDecrypt } from './AESHelper';

function App() {

  const [message, setMessage] = useState('')
  const [key, setKey] = useState('')

  const [result, setResult] = useState('')

  const handleEncrypt = () => {
    if (!message || !key) {
      return
    }

    const encrypted = aesEncrypt(message, key)
    setResult(encrypted)
  }

  const handleDecrypt = () => {
    if (!message || !key) {
      return
    }
    const decrypted = aesDecrypt(message, key)
    setResult(decrypted)
  }
  return (
    <div style={{ display: 'flex', height: '100vh' }}>


      <div style={{ display: 'grid', width: '350px', maxWidth: '350px', margin: 'auto', gap: '10px' }}>

        <div style={{ display: 'grid' }}>
          <label htmlFor='message'>Message</label>
          <input id="message" type="text" style={{ padding: '7px' }} value={message} onChange={(e) => { setMessage(e.target.value) }} />
        </div>

        <div style={{ display: 'grid' }}>
          <label htmlFor='key'>Key</label>
          <input id="key" type="text" style={{ padding: '7px' }} value={key} onChange={(e) => { setKey(e.target.value) }} />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ width: '100%', borderRadius: '4px', padding: '7px', backgroundColor: 'darkblue', color: 'white' }} onClick={handleEncrypt}>Encrypt</button>
          <button style={{ width: '100%', borderRadius: '4px', padding: '7px', backgroundColor: 'darkblue', color: 'white' }} onClick={handleDecrypt}>Decrypt</button>
        </div>

        <p>Result: {result || '--'}</p>
      </div>

    </div>
  );
}

export default App;
