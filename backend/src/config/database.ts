import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('La variable de entorno MONGO_URI es obligatoria');
  }
  await mongoose.connect(mongoUri);
  console.log('Conexión exitosa a MongoDB');
};
