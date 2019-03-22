/// <reference types="node" />
export declare const padding: (data: string, max?: number, pad?: string) => string;
export declare const sha256: (data: Buffer) => Buffer;
export declare const getCheckSum: (buf: Buffer, max: number) => string;
export declare const bufToBinary: (buf: Buffer) => string;
export declare const toUtf8: (data: string) => Buffer;
export declare const pbkdf2: (password: Buffer, salt: Buffer) => Buffer;
