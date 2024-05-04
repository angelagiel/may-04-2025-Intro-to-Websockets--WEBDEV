const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const server = http.createServer(express)
const ws_server = new WebSocket.Server({server})

ws_server.on("connection", (conn)=> {
    conn.send("connection established.")
    
    conn.on("message", (message)=>{
        const received = JSON.parse(message)
        const reply = received.name + ": " + received.message
        ws_server.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN){
                client.send(reply)
            }
        })
    })
})

server.listen(8080, ()=>{
    console.log("Server currently listens to port 8080")
})