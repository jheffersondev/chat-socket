const app = require("express")()
const http = require("http").createServer(app)
const io = require("socket.io")(http)

app.use(require("express").static(__dirname + "/public"))
app.use(require("express").json())
app.use(require("express").urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.sendFile(__dirname +  "/views/index.html")
  
})

app.post("/message", (req, res) => {
    var message = req.body.message
    io.emit("newmessage", message)

    res.json({status: "success"})
})

io.on('connection', (socket) => {
    console.log("novo cliente conectado")

    socket.on('disconnect', () => {
        console.log("Este cliente desconectou")
    })
})


http.listen(80, (err) => {
    if(!err) console.log("Servidor iniciado com sucesso")
    else  console.log("Erro ao iniciar servidor")
})