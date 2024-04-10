"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = void 0;
const crypto_1 = require("crypto");
function sendOTP() {
    const randomBytesBuffer = (0, crypto_1.randomBytes)(3);
    const cryptoRandomNumber = randomBytesBuffer.readUIntBE(0, 3);
    const mathRandomNumber = Math.floor(Math.random() * 900000) + 100000;
    const combinedRandomNumber = cryptoRandomNumber * mathRandomNumber;
    const oneTimePassword = combinedRandomNumber % 900000 + 100000;
    return oneTimePassword;
}
exports.sendOTP = sendOTP;
//# sourceMappingURL=sendOTP.js.map