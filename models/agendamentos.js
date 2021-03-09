const moment = require("moment");
const conexao = require("../infraestrutura/conexao");

class Agendamento {
    adiciona(agendamento, res) {
        const dataCriacao = moment().format("YYYY/MM/DD HH:mm:ss");
        const dataMarcada = moment(agendamento.dataMarcada, "DD/MM/YYYY" ).format("YYYY/MM/DD HH:mm:ss ");

        const dataEhValida = moment(dataMarcada).isSameOrAfter(dataCriacao);
        const clienteEhValido = agendamento.cliente.length >= 5;

        const validacoes = [
            {
                nome: "dataMarcada",
                valido: dataEhValida,
                mensagem: "Data deve ser maior ou igual a data atual"
            },
            {
                nome: "cliente",
                valido: clienteEhValido,
                mensagem: "Cliente deve ter pelo menos cinco caracteres"
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if(existemErros) {
            res.status(400).json(erros);
        }else {
            const agendamentoDatado = {...agendamento, dataCriacao, dataMarcada};

            const sql = "INSERT INTO Agendamentos SET ?";

            conexao.query(sql, agendamentoDatado,(erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro);
                }else {
                    res.status(201).json(resultados);
                }
            })
        }

    }
}

module.exports = new Agendamento;
