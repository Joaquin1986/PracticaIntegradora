const socket = io();
socket.on("messages", async (messages) => {
    const messageList = document.getElementById("message-list");
    messageList.innerText = "";
    if (Object.keys(messages).length == 0) {
        messageList.innerHTML = `<hr><br><p><strong>Aún no se han publicado mensajes en el Chat</strong></p>`;
    } else {
        const hr = document.createElement("hr");
        messageList.appendChild(hr);
        messages.forEach((message) => {
            moment.locale('es');
            let date = moment();
            date = moment(message.createdAt).fromNow();
            const msgArticle = document.createElement("article");
            messageList.appendChild(msgArticle);
            const title = document.createElement("h6");
            title.innerText = `<${message.user}> (${date}):`;
            msgArticle.appendChild(title);
            const description = document.createElement("h7");
            description.innerText = `"${message.message}"`;
            msgArticle.appendChild(description);
            messageList.appendChild(hr);
        });
        window.scrollTo(0, document.querySelector("#message-list").scrollHeight);
    }
});
let user = "";
const { value: email } = Swal.fire({
    icon: "question",
    title: "Ingresa tu usuario (email)",
    input: "email",
    inputPlaceholder: "<Tu casilla de correo aquí>",
    allowOutsideClick: false
}).then((result) => {
    user = result.value;
    if (user == undefined) {
        Swal.fire({
            icon: "error",
            title: "Usuario (email) no definido, ingresa uno válido por favor"
        }).then(() => {
            location.reload();
        })
    } else {
        const title = document.getElementById("header");
        title.innerHTML += `<br><p>Bienvenid@ <strong>${result.value}!<strong></p>`
        const textMessage = document.getElementById("txtMsg");
        const sendButton = document.getElementById("btnSnd");
        sendButton.addEventListener("click", () => {
            const message = {
                "user": user,
                "message": textMessage.value
            };
            if (message.message) {
                socket.emit("message", message);
                textMessage.value = "";
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    iconColor: '#1cc738',
                    color: '#11191f',
                    background: 'white',
                    customClass: {
                        popup: 'colored-toast',
                    },
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: false,
                });
                Toast.fire({
                    icon: 'success',
                    title: 'Mensaje enviado!✅',
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "El mensaje no puede estar vacío"
                });
            }
        });
    }
});




