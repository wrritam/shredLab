import { randomBytes } from 'crypto';

export function sendOTP(): number {
    const randomBytesBuffer = randomBytes(3);
    const cryptoRandomNumber = randomBytesBuffer.readUIntBE(0, 3);

    const mathRandomNumber = Math.floor(Math.random() * 900000) + 100000;
    const combinedRandomNumber = cryptoRandomNumber * mathRandomNumber;

    const oneTimePassword = combinedRandomNumber % 900000 + 100000;

    return oneTimePassword;
}
