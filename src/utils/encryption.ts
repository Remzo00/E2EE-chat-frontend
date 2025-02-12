export class Encryption {
  static async generateAESKey(): Promise<CryptoKey> {
    return await window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
  }

  static async encryptMessage(message: string, key: CryptoKey): Promise<{ encryptedData: string; iv: string }> {
    const encoder = new TextEncoder();
    const encodedMessage = encoder.encode(message);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      encodedMessage
    );

    return {
      encryptedData: btoa(String.fromCharCode(...new Uint8Array(encryptedData))),
      iv: btoa(String.fromCharCode(...iv))
    };
  }

  static async decryptMessage(encryptedData: string, iv: string, key: CryptoKey): Promise<string> {
    const encryptedArray = new Uint8Array(
      atob(encryptedData)
        .split('')
        .map(char => char.charCodeAt(0))
    );
    
    const ivArray = new Uint8Array(
      atob(iv)
        .split('')
        .map(char => char.charCodeAt(0))
    );

    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: ivArray,
      },
      key,
      encryptedArray
    );

    return new TextDecoder().decode(decryptedData);
  }

  static async exportKey(key: CryptoKey): Promise<string> {
    const exported = await window.crypto.subtle.exportKey("raw", key);
    return btoa(String.fromCharCode(...new Uint8Array(exported)));
  }

  static async importKey(keyString: string): Promise<CryptoKey> {
    const keyData = new Uint8Array(
      atob(keyString)
        .split('')
        .map(char => char.charCodeAt(0))
    );

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