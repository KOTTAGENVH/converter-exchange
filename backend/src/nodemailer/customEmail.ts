import nodemailer from 'nodemailer';

export const customEmail = async (email: string, subject: string, body: string): Promise<boolean> => {
    console.log("sending email");
    try {
        let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.email,
                pass: process.env.emailPass
            }
        });

        let mailDetails = {
            from: process.env.email,
            to: email,
            subject: subject,
            text: body
        };

        await mailTransporter.sendMail(mailDetails);
        console.log("Email sent successfully");
        return true;
    } catch (error) {
        console.error('Error sending email:', (error as Error).message);
        return false;
    }
};
