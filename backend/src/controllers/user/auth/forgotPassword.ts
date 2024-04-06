import express from "express";
import jwt from "jsonwebtoken";
import { sendMail } from "../../../helpers/sentMail";
import prisma from "../../../db/db.config";
import { sendOTP } from "../../../helpers/sendOTP";
import Handlebars from "handlebars";
import * as fs from 'fs';

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
    const emailTemplateSource = fs.readFileSync('../../../templates/email.handlebars', 'utf-8');
    const emailTemplate = Handlebars.compile(emailTemplateSource);
    const content = emailTemplate({ randomOTP })
    sendMail(email, "Forgot Password?", content);
    if (otpUpdated) {
      res.json({ message: "Verified", token: token });
    } else {
      res.json({ message: "Error", token: null });
    }
  } else {
    res.json({ message: "User not verified or registered", token: null });
  }
};
