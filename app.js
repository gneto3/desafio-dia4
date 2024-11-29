const https = require('https'); // Modificado para usar o módulo https
const fs = require('fs');
const path = require('path');

// Lê os arquivos de certificado SSL e chave privada
const options = {
  key: fs.readFileSync('key.pem'), // Chave privada (gerada com openssl)
  cert: fs.readFileSync('cert.pem') // Certificado público (gerado com openssl)
};

const server = https.createServer(options, (req, res) => {
  if (req.url === '/') {
    // Serve a página HTML principal
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Servidor com Reações</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 50px;
          }
          #heart-container {
            display: none;
            margin: 20px auto;
          }
          #heart-container img {
            width: 150px;
          }
          #name {
            margin-top: 20px;
            font-size: 24px;
            color: red;
            font-weight: bold;
          }
          .reaction-buttons {
            margin-top: 20px;
          }
          .reaction-buttons button {
            margin: 5px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            border: none;
            border-radius: 5px;
            color: #fff;
          }
          .reaction-buttons .amei {
            background-color: #ff4081;
          }
          .reaction-buttons .gostei {
            background-color: #4caf50;
          }
          .reaction-buttons .razoavel {
            background-color: #ff9800;
          }
          .reaction-count {
            display: block;
            margin-top: 5px;
            font-size: 14px;
            color: #555;
          }
        </style>
      </head>
      <body>
        <h1>Olá, Mundo! Este é meu servidor Node.js!</h1>
        <button onclick="showHeart()">Clique aqui para gerar o coração</button>
        <div id="heart-container">
          <img src="/img-gold-heart.png" alt="Coração">
          <div id="name">I love you, Adriana</div>
        </div>

        <div class="reaction-buttons">
          <button class="amei" onclick="react('amei')">Amei</button>
          <span class="reaction-count" id="count-amei">0</span>
          <button class="gostei" onclick="react('gostei')">Gostei</button>
          <span class="reaction-count" id="count-gostei">0</span>
          <button class="razoavel" onclick="react('razoavel')">Razoável</button>
          <span class="reaction-count" id="count-razoavel">0</span>
        </div>

        <script>
          // Função para exibir o coração e a frase
          function showHeart() {
            document.getElementById('heart-container').style.display = 'block';
          }

          // Contadores de reações
          let reactions = {
            amei: 0,
            gostei: 0,
            razoavel: 0
          };

          // Função para reagir e atualizar contagem
          function react(type) {
            reactions[type]++;
            document.getElementById('count-' + type).innerText = reactions[type];
          }
        </script>
      </body>
      </html>
    `);
  } else if (req.url === '/img-gold-heart.png') {
    // Serve a imagem do coração
    const imgPath = path.join(__dirname, 'img-gold-heart.png');
    fs.readFile(imgPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Imagem não encontrada');
      } else {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(data);
      }
    });
  } else {
    // Para outras URLs, retorna 404
    res.writeHead(404);
    res.end('Página não encontrada');
  }
});

// Define a porta que o servidor irá ouvir (ex: 3000)
server.listen(3000, () => {
  console.log('Servidor HTTPS rodando na porta 3000');
});
