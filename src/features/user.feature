Feature: inicio de sesion usuario

  Scenario: validar si el email esta en la base de datos
    Given un email, se buscara un email, si existe en la base de datos
    When se ingresa el usuario "REX@hotmail.com" y la contraseña "123"
    Then el esquema es valido