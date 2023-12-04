import mongoose from "mongoose";

const URI = "mongodb+srv://<user>:<password>@cluster0.s3nzifm.mongodb.net/ecommerce";

export const init = async () => {
    try {
        await mongoose.connect(URI);
        console.log("✅La conexión a la Base de Datos fue establecida con éxito!");
    } catch (error) {
        console.error("⛔Error al conectarse a la Base de Datos!", error.message);
    }
};