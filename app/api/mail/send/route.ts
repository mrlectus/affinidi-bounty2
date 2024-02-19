import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
export const POST = async (req: NextRequest) => {
  const { email, message } = await req.json();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Job Application successful",
    text: message,
  };

  const doSend = await transporter.sendMail(mailOptions);
  if (doSend.accepted) {
    return NextResponse.json({
      message: "Email sent successfully check spam",
    });
  } else {
    return NextResponse.json(
      {
        message: "Email not sent",
      },
      { status: 500 }
    );
  }
};
