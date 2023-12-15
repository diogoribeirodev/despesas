import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import { errorMiddleware } from "./middlewares/error";
import router from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use("/api/", router);
app.use(errorMiddleware);

/* Start the Express app and listen
 for incoming requests on the specified port */
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
