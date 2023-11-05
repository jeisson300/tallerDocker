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
Given('Mensaje de creacion de la api de seguridad y del perfil', function () {
    // Write code here that turns the phrase above into concrete actions
    // return 'pending';
});


When('redireccion de peticion a la api de seguridad y perfil',  async ()=> {
    // Write code here that turns the phrase above into concrete actions
    try{
        const resp = await axios.post(`http://localhost:8087/crearUsuario`,{
            first_name: "Nepheli",
            last_name: "Loux",
            email: "nl@hotmail.com",
            password: "123",
            id_role: 10,
            status: "1"
        });
        data = resp.data;
        // console.log(data)
    }catch(error: any)
    {
     console.log(error)   
    }
});

Then('devuelve un mensaje exitoso de ambas apis', async ()=> {
    let validate = ajv.compile(schemaRespCreate);
    // Validar la respuesta con el JSON Schema
    let isValid = validate(data);

    console.log(isValid)
    console.log(data)
    assert.isTrue(isValid);
});