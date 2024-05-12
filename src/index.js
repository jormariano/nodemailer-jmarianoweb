import express from 'express';
import nodemailer from 'nodemailer';
import { __dirname } from './path.js';

const app = express();
const PORT = 4000;

const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: 'jmarianoweb@gmail.com',
    pass: 'wzvv flqy ubhs dfar',
  },
});

app.get('/mail', async (req, res) => {
  const mail = await transport.sendMail({
    from: 'Test Coder <jmarianoweb@gmail.com>',
    to: 'jorgelina.mariano@gmail.com',
    subject: 'Estamos probando si esto funciona!',
    html: `
        <div> 
          <h1>Hola desde mi mail de prueba </h1>
          <h2>Te recuerdo que siempre esta bueno utilizar: </h2>
        </div>
    `,
    // Se pueden enviar imagenes o pdf como archivos adjuntos
    attachments: [
      {
        filename: 'mvc-testnodemailer.png',
        path: __dirname + '/img/mvc-testnodemailer.png',
        cid: 'mvc',
      },
      {
        filename: 'mvc-testnodemailer.pdf',
        path: __dirname + '/img/mvc-testnodemailer.pdf',
        cid: 'mvc.pdf',
      },
    ],
  });
  console.log(mail);
  res.status(200).send('Mail enviado');
});

app.listen(PORT, () => {
  console.log(`Server on PORT ${PORT}`);
});
