import express from "express";
import authRoutes from "./routes/auth.routes";
import privateRoutes from "./routes/auth.routes";
import { initDb } from "./db/database";
import { config } from "./config/env";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/private", privateRoutes);

app.get("/", (req, res) => res.send("API estruturada com REST"));

initDb().then(() => {
  app.listen(config.port, () => {
    console.log(`Servidor rodando em http://localhost:${config.port}`);
  });
});
