import 'dotenv/config';
import mongoose from 'mongoose';
import { createApp } from './app.js';
import { connectDatabase } from './config/database.js';

const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? '127.0.0.1';

const start = async (): Promise<void> => {
  await connectDatabase();
  const server = createApp().listen(port, host, () => console.log(`API disponible en http://${host}:${port}`));

  const shutdown = (signal: string): void => {
    console.log(`${signal} recibido. Cerrando conexiones...`);
    server.close(() => {
      void mongoose.disconnect().finally(() => process.exit(0));
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};

start().catch((error: unknown) => {
  console.error('No se pudo iniciar el servidor:', error);
  process.exit(1);
});
