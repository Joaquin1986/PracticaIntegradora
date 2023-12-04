import { Server } from "socket.io";
import { ChatManager } from "./dao/ChatManager.js";

export const init = async (httpServer) => {
    const messages = await ChatManager.getMessages();
    const socketServer = new Server(httpServer);
    socketServer.on("connection", (socketClient) => {
        console.log(`Cliente conectado exitosamente 👍: id #${socketClient.id}`);
        socketClient.emit('messages', messages);
        socketClient.on('message', async (msg) => {
            await ChatManager.addMessage(msg.user, msg.message);
            let result = await ChatManager.getMessages();
            socketServer.emit('messages', result);
        });
    });
};