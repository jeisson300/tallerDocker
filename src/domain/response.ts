import { Code } from '../enum/code.enum';
import { Status } from '../enum/status.enum';

export class HttpResponse {
  private timeStmap: string;

  constructor(
    private statusCode: Code,
    private httpStatus: Status,
    private message: string,
    private data?: {}
  ) {
    this.timeStmap = new Date().toLocaleString();
    this.statusCode = statusCode;
    this.httpStatus = httpStatus;
    this.message = message;
    this.data = data;
  }
}
