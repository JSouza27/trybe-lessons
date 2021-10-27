const net = require('net');

const server = net.createServer((connection) => {
  // console.log('Cliente conectado');
  connection.push(connection);
  connection.on('end', () => {
    console.log('Cliente desconectado');
  });

  connection.on('data', (data) => {
    console.log(`O cliente disse: ${data}`);
  });
});

server.listen(8080, () => {
  console.log('Servidor escutando na porta 8080');
});

server.getConnections((_err, count) => {
  console.log(count);
})
