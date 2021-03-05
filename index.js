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
    console.log("A new client has connected")

    socket.on('disconnect', () => {
        console.log("The client just disconnected")
    })
})


http.listen(process.env.PORT || 3000, (err) => {
    if(!err){
        console.log("[+] Server ready!")
    } else{
        console.warn("[!] Server could not start")
    }
})