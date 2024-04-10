import express from "express";
import jwt from "jsonwebtoken";
import { sendMail } from "../../../helpers/sentMail";
import prisma from "../../../db/db.config";
import * as fs from 'fs';
import path from 'path';
import Handlebars from "handlebars";
import { sendOTP } from "../../../helpers/sendOTP";

export const forgotPassword = async ( req: express.Request, res: express.Response ) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (user && user.is_verified === true) {
    const randomOTP = sendOTP();
    const otpUpdated = await prisma.user.update({
      where: { email: email },
      data: { otp: randomOTP },
    });
    const token = jwt.sign({ email: email }, process.env.hiddenKey as string, {
      expiresIn: "1d",
    });
    const emailTemplatePath = path.resolve(__dirname, '../../../templates/oneTimePassword.handlebars');
    const emailTemplateSource = fs.readFileSync(emailTemplatePath, 'utf-8');
    const emailTemplate = Handlebars.compile(emailTemplateSource);
    const content = emailTemplate({ randomOTP });
    sendMail(email, "ShreddLab Account Recovery", content);
    if (otpUpdated) {
      res.json({ message: "Verified", token: token });
    } else {
      res.json({ message: "Error", token: null });
    }
  } else {
    res.json({ message: "User not verified or registered", token: null });
  }
};
