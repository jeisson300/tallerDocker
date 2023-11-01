Feature: inicio de sesion usuario

  Scenario: validar si el usuario esta en la base de datos
    Given un id, se validara si existe en la base de datos el usuario
    When enviamos un id "1" de usuario, para buscar el usuario
    Then hay informacion