class Tabelas {
    init(conexao) {
        this.conexao = conexao
        this.CriarAgendamento()

    };

    CriarAgendamento() {
        const sql = "CREATE TABLE IF NOT EXISTS Agendamentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, servico varchar(20) NOT NULL, dataMarcada datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))"

            this.conexao.query(sql,erro => {
                if(erro) {
                    console.log(erro);
                }else {
                    console.log("Tabela de Agendamentos criada com sucesso")
                }
            });
    };

};



module.exports = new Tabelas;

