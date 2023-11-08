
import {cipher,util} from 'node-forge'
import {Buffer} from 'buffer'

const aesEncrypt =  (message, key) => {
console.log('entered');
    const ivBuff =  Buffer.alloc(16).fill(0);

    const cp = cipher.createCipher('AES-CBC', key);
    cp.start({iv: ivBuff.toString()});
    cp.update(util.createBuffer(message));
    cp.finish();

    return cp.output.toHex();
}
function hexStringToByteArray(hexString) {
    // Remove any spaces or non-hexadecimal characters
    hexString = hexString.replace(/\s/g, '');
    
    // Check if the input string has an odd length (invalid)
    if (hexString.length % 2 !== 0) {
      throw new Error("Invalid hex string length");
    }
  
    // Create a byte array
    const byteArray = [];
  
    // Convert the hex string to bytes
    for (let i = 0; i < hexString.length; i += 2) {
      byteArray.push(parseInt(hexString.substr(i, 2), 16));
    }
  
    return byteArray;
  }
  
  function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
  }
  // Example usage:
  const hexString = "48656c6c6f20776f726c64"; // Hex representation of "
  
  
const aesEncryptbase64 =  (message, key) => {
    console.log('entered_123');
        const ivBuff =  Buffer.alloc(16).fill(0);
        const cp = cipher.createCipher('AES-CBC', key);
        cp.start({iv: ivBuff.toString()});
        cp.update(util.createBuffer(message));
        cp.finish();
        var b64encoded = hexStringToByteArray(cp.output.toHex());
        var b64 = Buffer.from(b64encoded).toString('base64');
        return b64;
    }

const aesDecrypt =  (encrypted, key) => {

    const ivBuff =  Buffer.alloc(16).fill(0);
    
    const decipher = cipher.createDecipher('AES-CBC', key);
    decipher.start({iv: ivBuff.toString()});
    decipher.update(util.createBuffer(util.hexToBytes(encrypted)));
    decipher.finish();

    return decipher.output.toString();
}
// var key = 'KC6Vt9/hR_5D$168';

const aesDecryptbase64 =  (encrypted, key) => {
    var buf = new Buffer(encrypted, 'base64');
    encrypted = toHexString(buf)
    console.log(buf)
    const ivBuff =  Buffer.alloc(16).fill(0);
    const decipher = cipher.createDecipher('AES-CBC', key);
    decipher.start({iv: ivBuff.toString()});
    decipher.update(util.createBuffer(util.hexToBytes(encrypted)));
    decipher.finish();

    return decipher.output.toString();
}
// var key = 'KC6Vt9/hR_5D$168';
// var data = ''
// const result = aesEncrypt('hello', )
// console.log({result});

export {aesDecrypt, aesEncrypt,aesEncryptbase64,aesDecryptbase64}