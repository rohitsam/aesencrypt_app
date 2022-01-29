
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

const aesDecrypt =  (encrypted, key) => {

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

export {aesDecrypt, aesEncrypt}