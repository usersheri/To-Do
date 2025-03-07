import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import { createTransport } from 'nodemailer';
import dotenv from "dotenv";
import cron from "node-cron";

dotenv.config();

const sendMail = (email, subject, title, description) => {
    var transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: 'irfaanahamed505@gmail.com',
        to: email,
        subject: subject,
        html: `<h1>Task Reminder</h1><h2>Title: ${title}</h2><h3>Description: ${description}</h3>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Reminder Email sent: ' + info.response);
        }
    });
};

// Cron job to check tasks every 5 minutes
cron.schedule('*/5 * * * *', async () => {
    console.log("Checking for tasks to remind...");
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

    const tasks = await taskModel.find({
        completed: false,
        createdAt: { $lte: thirtyMinutesAgo }
    });

    for (const task of tasks) {
        const user = await userModel.findById(task.userId);
        if (user) {
            sendMail(user.email, "Task Reminder", task.title, task.description);
        }
    }
});

export default {};
