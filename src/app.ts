import express, { Application } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { errorMiddleware } from './middlewares/error_middleware';
import { routeNotFoundMiddleware } from './middlewares/route_not_found_middleware';
import BaseRouter, { InitialRouter } from './routers/router';
import logger from './utils/logger';
// import errorMiddleware from './middlewares/error_middleware';

class App {
  public express: Application;
  public port: number;
  // @default: /v1
  public version: string;
  static routers: BaseRouter[];
  constructor({
    appRouters,
    mongoUri,
    port,
    version,
  }: {
    appRouters: BaseRouter[];
    port: number;
    version?: string;
    mongoUri: string;
  }) {
    this.express = express();
    this.port = port;
    this.version = version ?? '/v1';
    this.initialiseDatabaseConnection(mongoUri);
    this.initialiseMiddlewares();
    this.initialiseControllers(appRouters);
    this.initialiseErrorHandling();
  }

  private initialiseMiddlewares() {
    this.express.use(express.json());
    this.express.use(morgan('dev'));
    this.express.use(express.urlencoded({ extended: false }));
    //TODO
  }

  private initialiseControllers(routers: BaseRouter[]): void {
    App.routers = routers;
    // Initial route config
    this.express.use('/', new InitialRouter().router);
    // Other routes config
    for (const router of routers) {
      this.express.use(`/api${this.version}`, router.router);
    }
  }

  private initialiseErrorHandling(): void {
    //TODO
    this.express.use(routeNotFoundMiddleware());
    this.express.use(errorMiddleware());
  }
   async initialiseDatabaseConnection(mongoUri: string): Promise<void> {
    // const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
    try {
      await mongoose.connect(mongoUri);
      logger.info('Connected to database');
    } catch (error) {
      logger.error('Error connecting to database: ', error);
    }
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening to http://localhost:${this.port}`);
    });
  }
}

export default App;
