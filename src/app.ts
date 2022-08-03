import express, { Application } from 'express';
import { Server } from 'http';
import mongoose from 'mongoose';
import morgan from 'morgan';
import db from './config/database/db';
import { errorMiddleware } from './middlewares/error_middleware';
import { routeNotFoundMiddleware } from './middlewares/route_not_found_middleware';
import BaseRouter, { InitialRouter } from './routers/routes';
import logger from './utils/logger';
// import errorMiddleware from './middlewares/error_middleware';

class App {
  public express: Application;
  public port: number;
  // @default: /v1
  public version: string;
  public isTestingEnv: boolean;
  private mongoUri: string;
  static routers: BaseRouter[];
  constructor({
    appRouters,
    mongoUri,
    port,
    version,
    isTestingEnv,
  }: {
    appRouters: BaseRouter[];
    port: number;
    version?: string;
    mongoUri: string;
    isTestingEnv?: boolean;
  }) {
    this.express = express();
    this.port = port;
    this.mongoUri = mongoUri;
    this.version = version ?? '/v1';
    this.isTestingEnv = isTestingEnv ?? false;
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
      /// by default mongo validators run only while [creating] a document
      /// This method will ensure to run validators on every changes like [create/update]
      mongoose.set('runValidators', true);

      /* By default connects to [college_db]
      connects to [college_db] if [this.isTestingEnv] is false
      connects to [college_db_test] if [this.isTestingEnv] is true
      */
      const _db = await mongoose.connect(
        `${mongoUri}/college_db4${this.isTestingEnv ? '_test' : ''}`
      );
      db.college = _db.connection;
      /* connects to [user_db] if [this.isTestingEnv] is false
       connects to [user_db_test] if [this.isTestingEnv] is true */
      db.user = mongoose.createConnection(
        `${mongoUri}/user_db4${this.isTestingEnv ? '_test' : ''}`
      );
      logger.info('Connected to database');
      logger.info(`Total DB Connections: ${mongoose.connections.length}`);
      this.getDbNames();
    } catch (error) {
      logger.error('Error connecting to database: ', error);
    }
  }

  private getDbNames(): void {
    let _connectionNames = 'DB Names: \n  [\n';
    /// setting delay for 1 sec
    /// becaz for some reason [db.user] is not updated asyncronsly
    setTimeout(() => {
      const _allConnections = [db.college, db.user];
      _allConnections.forEach(conn => {
        _connectionNames += `\t${conn.name},\n`;
      });
      logger.info(`${_connectionNames}  ]`);
      ///
    }, 1000);
  }

  public async listen(): Promise<Server> {
    await this.initialiseDatabaseConnection(this.mongoUri);
    return this.express.listen(this.port, () => {
      console.log(`App listening to http://localhost:${this.port}`);
    });
  }
}

export default App;
