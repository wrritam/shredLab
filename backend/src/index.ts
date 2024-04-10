import express, { Response } from "express";
import "dotenv/config";
import userRoutes from "./routes/userRoutes";
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors({ credentials: true }));
app.use(compression());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (res: Response) => res.send("Welcome to the backside!"));
app.use("/api", userRoutes);
app.listen(port, () => console.log(`App listening on port ${port}!`));
