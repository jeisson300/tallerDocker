Feature: Loggin del sistema

  Scenario: El sistema debe mostrar el listado de los logs
    Given La api cargada
    When se realiza la petición a la api de logs
    Then devuelve el listado de los logs en json