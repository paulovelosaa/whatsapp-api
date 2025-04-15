const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor WhatsApp no ar 🚀");
});

app.post("/send", async (req, res) => {
  const { nome, telefone, date, hora, status } = req.body;

  if (!nome || !telefone || !date || !hora || !status) {
    return res.status(400).send("Dados incompletos.");
  }

  const text = encodeURIComponent(
    `Olá ${nome}, seu agendamento para ${date} às ${hora} foi ${status}.`
  );

  const phoneClean = telefone.replace("+", "");
  const apiKey = "8624290"; // 🔁 Substitua aqui

  const url = `https://api.callmebot.com/whatsapp.php?phone=${phoneClean}&text=${text}&apikey=${apiKey}`;

  try {
    const response = await axios.get(url);
    console.log("Mensagem enviada:", response.data);
    res.send("Mensagem enviada com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar:", error);
    res.status(500).send("Erro ao enviar WhatsApp.");
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
