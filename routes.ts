import bcrypt from "bcrypt";
import { db } from "./db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";
import type { Express } from "express";
import { type Server } from "http";

    export async function registerRoutes(
      httpServer: Server,
      app: Express
    ): Promise<Server> {

      // Register
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      username,
      email,
      password: hashedPassword,
    });

    res.json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar" });
  }
});

  // Login
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (!user.length) {
        return res.status(400).json({ error: "Usuário não encontrado" });
      }

      const validPassword = await bcrypt.compare(
        password,
        user[0].password || ""
      );

      if (!validPassword) {
        return res.status(400).json({ error: "Senha incorreta" });
      }

      res.json({ message: "Login feito com sucesso", user: user[0] });

    } catch (error) {
      res.status(500).json({ error: "Erro no login" });
    }
  });

  return httpServer;
}