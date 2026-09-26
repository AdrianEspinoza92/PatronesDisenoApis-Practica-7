import cors from 'cors';
import express, { type Express } from 'express';
import morgan from 'morgan';
import { EmployeeController } from './controllers/employee.controller.js';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';
import { MongooseEmployeeRepository } from './repositories/mongoose-employee.repository.js';
import { createEmployeeRouter } from './routes/employee.routes.js';

export const createApp = (): Express => {
  const app = express();
  const controller = new EmployeeController(new MongooseEmployeeRepository());
  app.disable('x-powered-by');
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
  app.get('/health', (_request, response) => {
    response.json({ success: true, message: 'API disponible', data: null });
  });
  app.use('/api/v1/employees', createEmployeeRouter(controller));
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
};
