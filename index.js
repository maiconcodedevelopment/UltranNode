const socketio = require("socket.io")
const mysql = require("mysql")
const http = require("http")

const formatDate = require("./helpers/Date")
const Consultation = require("./app/Model/Consultation")
const appApplication = require("./server")
const database = require("./database")

var connectMysql = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    port : "3306",
    password : 'password',
    database : 'ultran'
})

var databaseUltran = new database.DatabseUltran(connectMysql)

connectMysql.connect(function(error){
    if(!!error){
        console.log("Error",error)
    }else{
        databaseUltran.createConsultation()
    }
})


const server = http.createServer(appApplication.app)
//socket io
const socket = socketio(server)

socket.on("connection",socket => {
    console.log(`Socket connection ${socket.id}`)

    socket.on("allConsultation",function(data){
        databaseUltran.allConsultation((result) => {
            var consultations = []
            result.map((item) => {
                let consultation = new Consultation(item.title,item.description,formatDate.getDateFormat(new Date(item.date),"-"),item.time)
                consultation.setId(item.id)
                consultations.push(Consultation.toObjectFormat(consultation))
            })
            socket.emit("onAllConsultation",consultations)
        })
    })

    
    socket.on("insertConsultation",function(data){
        
        if(!data.title && !data.description && !data.date && !data.time) return "Not Params"
        let consultation = new Consultation(data.title,data.description,data.date,data.time)
        databaseUltran.insertConsultation(consultation,(id) => {
            consultation.setId(id)
            socket.broadcast.to(socket.id).emit("onInsertConsultation",Consultation.toObjectFormat(consultation))
        })
    })

    socket.on("updateConsultation",function(data){
        console.log(data)
        let consultation = new Consultation(data.title,data.description,data.date,data.time)
        consultation.setId(data.id)
        databaseUltran.updateConsultation(consultation,(result) => {
            socket.broadcast.emit("onUpdateConsultation",Consultation.toObjectFormat(consultation))
        })
    })

    socket.on("deleteConsultation",function(data){
        console.log(data)
        databaseUltran.deleteConsultation(data.id,(result) => {
            socket.broadcast.emit("onDeleteConsultation",data)
        })
    })
    
    socket.on("disconnect",() => {
        console.log("disconnet")
    })
})

server.listen(4000, () => { console.log("Server : 4000") })