import app from "./src/app";
import { connectDB } from "./src/config/database";

const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        const server = app.listen(PORT, () => {
            console.log("Server is running on PORT:", PORT);
        });

        server.on("error", (err: any) => {
            console.error(`Server failed to start on port ${PORT}:`, err);
            process.exit(1);
        });
    })
    .catch((err: any) => {
        console.error("Database connection failed:", err);
        process.exit(1);
    });