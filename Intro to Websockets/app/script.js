const conn = new WebSocket('ws://localhost:8080')
const chat_box = document.getElementById("chats")
let user

conn.addEventListener("message", (message)=>{
    const item = document.createElement("li")
    item.appendChild(document.createTextNode(message.data))
    chat_box.appendChild(item)
})

function get_name(){
    user = document.getElementById("name_field").value

    const name_div = document.getElementById("name_div")
    const chat_div = document.getElementById("chat_div")

    name_div.style.display = "none"
    chat_div.style.display = "block"

}

function send_message(){
    chat = document.getElementById("message_field").value
    const message = JSON.stringify(
        {
            user : user,
            data : chat
        }
    )
    conn.send(message)
    document.getElementById("message_field").value = ""
}