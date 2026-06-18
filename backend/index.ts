import app from "./src/app";
import { connectDB } from "./src/config/database";
import { createServer } from "http";
import { initializeSocket } from "./src/utils/socket";

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);


initializeSocket(httpServer);

connectDB()
    .then(() => {
        httpServer.listen(PORT, () => {
            console.log("Server is running on PORT:", PORT);
        });

        httpServer.on("error", (err: any) => {
            console.error(`Server failed to start on port ${PORT}:`, err);
            process.exit(1);
        });
    })
    .catch((err: any) => {
        console.error("Database connection failed:", err);
        process.exit(1);
    });