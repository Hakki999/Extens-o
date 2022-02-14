const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

var port = process.env.PORT || 8080;
app.use(express.static(__dirname + "/public/"));
var id = 0;
var n = 0;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

io.on('connection', (socket) => {
    id++;
    n++;
    console.log('New user Id:', socket.id);
    io.to(socket.id).emit("info", {id: id});
    io.emit("n", n);

    socket.on("res", res => {
        socket.broadcast.emit("resu", res);
    })

    socket.on("disconect", d => {
        socket.to("main").emit("n", n);
    })


  });

http.listen(port, err => {
    if (err)
        console.log("Erro: ", err);

    console.log("Servidor: ", port);
})