const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { nombre, email, mensaje } = req.body;

  // ⚠️ Usa un correo Gmail solo si está habilitado para apps menos seguras o App Password
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,     // crea estas variables en Vercel
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const htmlContent = `
    <h2>Nuevo mensaje de contacto</h2>
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Mensaje:</strong><br/>${mensaje}</p>
  `;

  try {
    await transporter.sendMail({
      from: `"Formulario Web" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: "Nuevo mensaje desde el sitio web",
      html: htmlContent
    });

    return res.status(200).json({ message: "Mensaje enviado con éxito" });
  } catch (error) {
    console.error("Error enviando correo:", error);
    return res.status(500).json({ message: "Hubo un error al enviar el correo" });
  }
};
