import { Given, When, Then } from '@cucumber/cucumber';
import axios, { AxiosError } from 'axios';
import { Assertion, assert } from 'chai';
import Ajv, { ErrorObject } from 'ajv';
import { schemaSearch } from '../json-schema/resp-search';
import { User } from '../../interface/user';
import dotenv from 'dotenv';

dotenv.config();
const ajv = new Ajv();
let data: any;
let status : number;

Given('La api cargada', () => {
  // Write code here that turns the phrase above into concrete actions
});

When(
  'se realiza la petición a la api de logs',
  async () => {

    try {
      const headers = {
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUkVYIiwiaWQiOjEsImlhdCI6MTY5NTE2NjUwNH0.TXlvCLNikLkR7U6JnvEWdB5NnRinFMUCuzdvfm3HvVE', // Ejemplo de encabezado de autorización
        'Content-Type': 'application/json', // Ejemplo de encabezado de tipo de contenido
      };
      // Write code here that turns the phrase above into concrete actions
      const resp = await axios.post(`http://${process.env.LOGS_HOST}:80/logs`,{
        
          "FechaCreacion": (new Date()).toISOString().substring(0,10),
          "tipolog":"INF"
        
        },{
        headers,
      });
      data = resp.data.data;
      status = resp.status;

    } catch (error: any) {
      console.log(error)
    }
  }
);

Then('devuelve el listado de los logs en json', () => {

  assert.isNotNull(data);
});

Then('el estado de la petición debe ser exitoso', () => {

  assert.equal(status, 200);
});



// Escenario II

let newLog:any;
let statusCreate:number;


Given('El mensaje {string} y el tipo {string}', (msg: string, type: string) => {
  newLog={log:msg, tipo:type};
});

When('se realiza la petición al api de logs', async () => {
  const resp = await axios.post(`http://${process.env.LOGS_HOST}:80/createLog`,newLog);

        data = resp.data.data;
        statusCreate = resp.status;

});

Then('la respuesta de la api es exitosa', () => {

  assert.equal(statusCreate, 200);
});
