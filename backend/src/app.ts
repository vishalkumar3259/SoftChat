import express from "express";
import cors from "cors";
import path from "path";

import { clerkMiddleware } from '@clerk/express';

import authRoutes from "./routes/authRoutes";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express()

// app.use(cors()); // Enable CORS for all routes
app.use(express.json()); //parse incoming JSON requests bodies and makes them available as req.body in your route handlers.

app.get("/health", (req,res) =>{
    res.json({status:"ok",message:"server is running" })
})

app.use(clerkMiddleware())

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes); 
app.use("/api/users", userRoutes);

//error handeler must come after the all the routes ans other middleware so they can catch error passed with next(err) or throw inside async hadlers.

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../web/dist")));

  app.get("/{*any}", (_, res) => {
    res.sendFile(path.join(__dirname, "../../web/dist/index.html"));
  });
}


app.use(errorHandler);

export default app;