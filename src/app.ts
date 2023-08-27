import cors from 'cors';
import express, { Application } from 'express';
import ip from 'ip';
import { Code } from './enum/code.enum';
import { HttpResponse } from './domain/response';
import { Status } from './enum/status.enum';
import { patientRoutes } from './routes/patient.routes';

export class App {
  private readonly app: Application;
  private readonly APPLICATION_RUNNING: string = 'application is running on:';

  /**
   *
   */
  constructor(
    private readonly port: string | number = process.env.SERVER_PORT || 3000
  ) {
    this.app = express();
    this.middleWare();
    this.routes();
  }

  listen(): void {
    this.app.listen(this.port);
    console.info(`${this.APPLICATION_RUNNING} ${ip.address()}: ${this.port}`);
  }

  private middleWare(): void {
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use('/patients', patientRoutes);
    this.app.get('/', (req, res) =>
      res
        .status(Code.OK)
        .send(
          new HttpResponse(
            Code.OK,
            Status.OK,
            'Welcome to the patients API v1.0'
          )
        )
    );
    this.app.all('*', (req, res) =>
      res
        .status(Code.NOT_FOUND)
        .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'NOT FOUND'))
    );
  }
}
