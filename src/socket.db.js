import { Server } from "socket.io";
import { Product, ProductManager } from "./dao/ProductManager-DB.js";
import { ChatManager } from "./dao/ChatManager.js";

export const init = async (httpServer) => {
    const products = await ProductManager.getProducts();
    const messages = await ChatManager.getMessages();
    const socketServer = new Server(httpServer);
    socketServer.on("connection", (socketClient) => {
        console.log(`Cliente conectado exitosamente 👍: id #${socketClient.id}`);
        socketClient.emit('products', products);
        socketClient.emit('messages', messages);
        socketClient.on('product', async (prod) => {
            const productoAgregar =
                new Product(
                    prod.title,
                    prod.description,
                    prod.price,
                    prod.code,
                    prod.stock
                );
            await ProductManager.addProduct(productoAgregar);
            let result = await ProductManager.getProducts();
            socketServer.emit('products', result);
        });
        socketClient.on('message', async (msg) => {
            await ChatManager.addMessage(msg.user, msg.message);
            let result = await ChatManager.getMessages();
            socketServer.emit('messages', result);
        });
    });
};