import { Given, When, Then } from '@cucumber/cucumber';
import axios, { AxiosError } from 'axios';
import { Assertion, assert } from 'chai';
import Ajv, { ErrorObject } from 'ajv';
import dotenv from 'dotenv';
import { schemaRespUp } from '../json-schema/resp_gup';

dotenv.config();
const ajv = new Ajv();
let data: any;
let status: number;


Given('se creara un json con todos los datos correspondientes para actualizar', function () {
    // Write code here that turns the phrase above into concrete actions  
});

When('redireccion la peticon a la api de perfiles', async ()=> {
    // Write code here that turns the phrase above into concrete actions
    try{
        const resp = await axios.put(`http://localhost:8087/actualizarPerfil`,
        {
            id: 1,
            first_name: "hola",
            last_name: "mundo",
            nickname: "hm",
            public_info: 1,
            postal_address: "630001",
            biography: "hola mundo",
            company: "hola mundo",
            country: "hola mundo",
            links: "hola mundo"
        });
        data = resp.data;
    }catch(error: any)
    {
     console.log(error)   
    }
});
Then('devuelve un mensaje exitoso', function () {
    // Write code here that turns the phrase above into concrete actions
    let validate = ajv.compile(schemaRespUp);
    // Validar la respuesta con el JSON Schema
    let isValid = validate(data);

    console.log(isValid)
    console.log(data)
    assert.isTrue(isValid);
});
