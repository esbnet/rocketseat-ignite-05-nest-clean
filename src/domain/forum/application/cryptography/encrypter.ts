export abstract class Encrypter {
  abstract encrypt(payload: Record<string, unknown>): Promise<string>
  // abstract decrypt(value: string): Promise<string>
}
