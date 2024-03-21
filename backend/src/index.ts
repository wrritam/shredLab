import express, { Request, Response } from "express";
import "dotenv/config";
import userRoutes from "./routes/userRoutes";
const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => res.send("Hello World!"));

app.use("/user", userRoutes);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
