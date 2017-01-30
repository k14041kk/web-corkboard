var connect = require('connect'),
    serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic(__dirname + "/../build" ));
app.listen(6060);
console.log("Start Server: localhost:6060");
