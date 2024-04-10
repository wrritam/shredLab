import express from 'express';
import jwt from 'jsonwebtoken';
import { sendMail } from '../../../helpers/sentMail';
import prisma from '../../../db/db.config';
import { sendOTP } from '../../../helpers/sendOTP';
import bcrypt from 'bcrypt';
import * as fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

const mailSubject = 'ShreddLab Account Verification';

export const register = async (req: express.Request, res: express.Response) => {
    const { name, username, bio, profilePictureUrl, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({
        where: { email: email },
    });
    if (existingUser) {
        const isUserVerified = existingUser.is_verified;
        if (isUserVerified === false) {
            const randomOTP = sendOTP();
            await prisma.user.update({
                where: { email: email },
                data: {
                    username: username,
                    name: name,
                    otp: randomOTP,
                    createdAt: new Date().toISOString(),
                },
            });
            const emailTemplatePath = path.resolve(
                __dirname,
                '../../../templates/email.handlebars',
            );
            const emailTemplateSource = fs.readFileSync(emailTemplatePath, 'utf-8');
            const emailTemplate = Handlebars.compile(emailTemplateSource);
            const content = emailTemplate({ randomOTP });
            await sendMail(email, mailSubject, content);
            const token = jwt.sign({ email: email, name: name }, process.env.hiddenKey as string, {
                expiresIn: '1d',
            });
            res.cookie('token', token, {
                maxAge: 86400000,
                httpOnly: true
            });
            res.status(200).json({ success: true, message: 'User updated' });
        } else {
            res.status(403).json({ success: false, message: 'User already exists', token: null });
        }
    } else {
        const hashedPassword: string = await new Promise((resolve, reject) => {
            bcrypt.hash(password, 7, (err, hash) => {
                if (err) reject(err);
                else resolve(hash);
            });
        });
        const randomOTP = sendOTP();
        await prisma.user.create({
            data: {
                username: username,
                bio: bio,
                name: name,
                email: email,
                password: hashedPassword,
                is_verified: false,
                otp: randomOTP,
                createdAt: new Date().toISOString(),
                profilePictureUrl: profilePictureUrl,
            },
        });
        const emailTemplatePath = path.resolve(
            __dirname,
            '../../../templates/oneTimePassword.handlebars',
        );
        const emailTemplateSource = fs.readFileSync(emailTemplatePath, 'utf-8');
        const emailTemplate = Handlebars.compile(emailTemplateSource);
        const content = emailTemplate({ randomOTP });
        await sendMail(email, mailSubject, content);
        await prisma.user.update({
            where: { email: email },
            data: { updatedAt: new Date().toISOString() },
        });
        const token = jwt.sign({ email: email, name: name }, process.env.hiddenKey as string, {
            expiresIn: '1d',
        });
        res.cookie('token', token, {
            maxAge: 86400000,
            httpOnly: true
        });
        res.json({ success: true, message: 'User created successfully'});
    }
};
