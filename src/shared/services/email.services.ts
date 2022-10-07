import nodemailer, { SendMailOptions } from 'nodemailer';
import { AppKeys } from '../../config/keys/app_keys';

export const sendEmail = async (props: SendMailOptions) => {
  const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: AppKeys.email_address,
      pass: AppKeys.email_password,
    },
  });

  await mailTransporter.sendMail(props);
};

export * as emailServices from './email.services'