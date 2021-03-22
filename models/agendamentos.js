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
                    res.status(201).json(agendamento);
                };
            });
        };

    };

    lista(res) {
        const sql = "SELECT * FROM Agendamentos"

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            }else {
                res.status(200).json(resultados)
            };
        });
    };

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Agendamentos WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const agendamento = resultados[0];
            if(erro) {
                res.status(400).json(erro)
            }else {
                res.status(200).json(agendamento)
            };
        });   
    };

    altera(id, valores, res) {

        if(valores.dataMarcada){
            valores.dataMarcada = moment(valores.dataMarcada, "DD/MM/YYYY").format("YYYY/MM/DD HH:mm:ss");
        }

        const sql = 'UPDATE Agendamentos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            }else {
                res.status(200).json({...valores, id})
            }
        });
    }; 
    
    deleta(id, res) {
        const sql = "DELETE FROM Agendamentos WHERE id=?"

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            }else {
                res.status(200).json({id})
            }
        });
    };

};

module.exports = new Agendamento;
