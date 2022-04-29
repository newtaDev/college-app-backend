import express, { Application } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { errorMiddleware } from './middlewares/error_middleware';
import { routeNotFoundMiddleware } from './middlewares/route_not_found_middleware';
import BaseRouter, { InitialRouter } from './routers/router';
// import errorMiddleware from './middlewares/error_middleware';

class App {
  public express: Application;
  /*   3000  */
  public port: number;
  /*   /v1  */
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
    version: string;
    mongoUri: string;
  }) {
    this.express = express();
    this.port = port;
    this.version = version;
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
    // Initial route
    this.express.use('/', new InitialRouter().router);
    // Other routs
    routers.forEach((controller: BaseRouter) => {
      this.express.use(`/api${this.version}`, controller.router);
    });
  }

  private initialiseErrorHandling(): void {
    //TODO
    this.express.use(routeNotFoundMiddleware);
    this.express.use(errorMiddleware);
  }

  private initialiseDatabaseConnection(mongoUri: string): void {
    // const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

    mongoose.connect(mongoUri);
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on the port  http://localhost:${this.port}`);
    });
  }
}

export default App;
