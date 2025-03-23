// index.js
const express = require('express');
const { Client } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

// Credenciais do banco
const client = new Client({
  host: 'aws-0-us-west-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  user: 'postgres.yubobdzkeqdhsemeiftt',
  password: 'gUTO33675866', // <-- Atenção: não exponha em produção
});

// Conecta ao banco
client.connect()
  .then(() => console.log('Conectado ao banco de dados!'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

// Rota que retorna dados da tabela "Resultado Baixada"
app.get('/api/infractions', async (req, res) => {
  try {
    const query = `
      SELECT
        placa,
        proprietario,
        endereco_horario,
        veiculo,
        debitos_restricoes,
        total,
        contatos
      FROM "Resultado Baixada"
    `;
    const result = await client.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao consultar tabela:', error);
    res.status(500).json({ error: 'Erro ao consultar tabela' });
  }
});

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
