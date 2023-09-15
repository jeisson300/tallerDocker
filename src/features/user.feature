Feature: inicio de sesion usuario

  Scenario: inicio de sesion email y password
    Given un login
    When se ingresa email y password
    Then devolvera un token
  Scenario: inicio de sesion email y password correctos
    Given un login
    When se ingresa email "REX1@hotmail.com" y password "123"
    Then devolvera un token
