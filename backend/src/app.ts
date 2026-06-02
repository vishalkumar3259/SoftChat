import express from "express"
import cors from "cors"

import authRoutes from "./routes/authRoutes"
import chatRoutes from "./routes/chatRoutes"
import messageRoutes from "./routes/messageRoutes"
import userRoutes from "./routes/userRoutes"

const app = express()

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); //parse incoming JSON requests bodies and makes them available as req.body in your route handlers
app.get("/health", (req,res) =>{
    res.json({status:"ok",message:"server is running" })
})

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes); 
app.use("/api/users", userRoutes);

export default app;