const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { nombre, email, mensaje } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Email_Icon.png/64px-Email_Icon.png" alt="Logo" style="width: 50px; margin-bottom: 20px;" />
        
        <h2 style="color: #003865; margin-bottom: 10px;">Nuevo mensaje desde el formulario</h2>
        
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong><br>${mensaje.replace(/\n/g, "<br>")}</p>
        
        <hr style="margin: 30px 0;" />
        <p style="font-size: 0.9em; color: #555;">Este mensaje fue enviado desde <a href="https://paginanicolas.vercel.app" style="color: #003865;">paginanicolas.vercel.app</a></p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Formulario Web" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: "📨 Nuevo mensaje desde el sitio web",
      html: htmlContent,
    });

    return res.status(200).json({ message: "Mensaje enviado con éxito" });
  } catch (error) {
    console.error("Error enviando correo:", error);
    return res.status(500).json({ message: "Hubo un error al enviar el correo" });
  }
};
