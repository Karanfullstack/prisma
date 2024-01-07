import "dotenv/config";
import express from "express";
const app = express();

const PORT = process.env.PORT;
app.use(express.json());
// routes imports
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

app.use("/api/v1", postRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", commentRoutes);

app.get("/", (req, res) => {
	res.send("<h1>Hello Everyone</h1>");
});
app.listen(PORT, () => console.log("Server is running...", PORT));
