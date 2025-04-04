const nodemailer = require("nodemailer");
const { APIError } = require("../../utils/errors/APIError");

exports.sendContactEmail = async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;

    // Input validation
    if (!firstName || !email || !subject || !message) {
      throw new APIError("Missing required fields", 400);
    }

    // Create reusable transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Create email content
    const emailContent = `
      NEW CONTACT REQUEST
      -------------------------------
      Name: ${firstName} ${lastName}
      Email: ${email}
      Subject: ${subject}
      
      Message:
      ${message}
      
      -------------------------------
      Received: ${new Date().toLocaleString()}
    `;

    // Setup email data
    const mailOptions = {
      from: `"Herafy Hub Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `Contact Form: ${subject}`,
      text: emailContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to send message",
    });
  }
};
