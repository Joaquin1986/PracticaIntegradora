import { Router } from "express";

const router = Router();

router.get("/chat", (req, res) => {
    res.render('chat', { title: 'Chat de usuarios en Tiempo Real ⌚' });
});

export { router };