import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
});

const sendOtp = async (email, otp) => {
  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code for registering to forever is ${otp}. Do not share it with anyone`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("otp send successfull");
  } catch (error) {
    console.log(error);
    throw new Error("Failed To send OTP Email");
  }
};

export { sendOtp };
