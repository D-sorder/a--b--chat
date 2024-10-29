const input = document.querySelector(".chat__input");
const sendBtn = document.querySelector(".send");
const geoBtn = document.querySelector(".geo");
const chat = document.querySelector(".chat__body");
const websocket = new WebSocket('wss://echo-ws-service.herokuapp.com');

sendBtn.addEventListener("click",async function clientInput() {
    if (input.value) newMessage(input.value);

    websocket.onmessage = function serverMessage (mes) {
        if(mes.data) newMessage(mes.data);
    };

    websocket.onerror = function serverErr (err) {
        console.error("error:", err);
    }

    await websocket.send(input.value);
});

geoBtn.addEventListener("click",function getGeo() {
    newMessage("Геолокация");
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((pos)=>{
            const {coords} = pos;
            let link = document.createElement("a");
            link.href = `https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`;
            link.innerHTML = "На карте";
            newMessage(link);
        });
    } else {
        ()=>newMessage("нет доступа в браузере :(");
    }
});

function newMessage (text) {
    let caller = newMessage.caller.name;
    let message = document.createElement("p");
    if (caller == "getGeo"||caller=="clientInput") {
        message.className = "client"
    } else {
        message.className = "server"
    }
    
    message.append(text);
    chat.append(message);
};