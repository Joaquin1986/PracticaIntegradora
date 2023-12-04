// Se definen los imports
import messagesModel from "../models/messages.model.js";
import { Error } from "mongoose";

// Clase Message, con su correspondiente contructor las props definidas en la consigna
class Message {
    constructor(user, message) {
        this.user = user;
        this.message = message;
    }
}

// Clase ChatManager con sus correspondientes métodos estáticos
class ChatManager {

    // Agrega un mensaje en la DB
    static async addMessage(user, message) {
        try {;
            const messageCreated = await messagesModel.create(new Message(user, message));
            console.log(`✅ El mensaje fue agregado con éxito a la Base de Datos`);
            return messageCreated;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo guardar en la BD de Productos.
   Descripción del error: ${error.message}`);
        }
    }

    // Obtiene todos los mensajes de la DB
    static async getMessages() {
        try {
            return messagesModel.find().lean();
        } catch (error) {
            throw new Error(`⛔ Error al obtener datos de la BD: ${error.message}`);
        }
    }
}

export { Message, ChatManager };