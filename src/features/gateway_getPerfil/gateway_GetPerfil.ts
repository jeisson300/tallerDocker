import { Given, When, Then } from '@cucumber/cucumber';
import axios, { AxiosError } from 'axios';
import { Assertion, assert } from 'chai';
import Ajv, { ErrorObject } from 'ajv';
import dotenv from 'dotenv';
import { schemaRespCreate } from '../json-schema/resp_gc';

dotenv.config();
const ajv = new Ajv();
let data: any;
let status: number;


  Given('ya hay varios perfil creados, se obtendran todos', function () {
    // Write code here that turns the phrase above into concrete actions    
  });

  When('redireccion de la peticion a la api de seguridad para obtener todos los perfil creados', async ()=> {
    // Write code here that turns the phrase above into concrete actions
    try{
        const resp = await axios.get(`http://localhost:8087/obtenerPerfil?id=1`);
        data = resp.data;
    }catch(error: any)
    {
     console.log(error)   
    }
  });

  Then('devuelve un json con todo el contenido del perfil', function () {
    // Write code here that turns the phrase above into concrete actions
    assert.isNotEmpty(data)
  });