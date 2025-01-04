export class Encryption {
    // private static async generateKeyPair() {
    //   const keyPair = await window.crypto.subtle.generateKey(
    //     {
    //       name: "RSA-OAEP",
    //       modulusLength: 2048,
    //       publicExponent: new Uint8Array([1, 0, 1]),
    //       hash: "SHA-256",
    //     },
    //     true,
    //     ["encrypt", "decrypt"]
    //   );
    //   return keyPair;
    // }
  
    public static async generateAESKey() {
      return await window.crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"]
      );
    }
  
    static async encryptMessage(message: string, encryptionKey: CryptoKey) {
      const encoder = new TextEncoder();
      const encodedMessage = encoder.encode(message);
      
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      
      const encryptedMessage = await window.crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv: iv,
        },
        encryptionKey,
        encodedMessage
      );
  
      return {
        encryptedData: new Uint8Array(encryptedMessage),
        iv: iv,
      };
    }
  
    static async decryptMessage(
      encryptedData: Uint8Array,
      iv: Uint8Array,
      decryptionKey: CryptoKey
    ) {
      const decryptedMessage = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: iv,
        },
        decryptionKey,
        encryptedData
      );
  
      const decoder = new TextDecoder();
      return decoder.decode(decryptedMessage);
    }
  
    static async exportKey(key: CryptoKey) {
      const exportedKey = await window.crypto.subtle.exportKey("raw", key);
      return new Uint8Array(exportedKey);
    }
  
    static async importKey(keyData: Uint8Array) {
      return await window.crypto.subtle.importKey(
        "raw",
        keyData,
        {
          name: "AES-GCM",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"]
      );
    }
  }