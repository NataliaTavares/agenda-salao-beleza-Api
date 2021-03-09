const Agendamento = require("../models/agendamentos")

module.exports = app => {
    app.get("/agendamentos", (req, res) => res.send("Você está na rota de agendamentos e esta realizando um GET"));

    app.post("/agendamentos", (req, res) => {

        const agendamento = req.body;

        console.log(req.body)

        Agendamento.adiciona(agendamento, res);
    });
   
};

