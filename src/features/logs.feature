Feature: Loggin del sistema

  Scenario: El sistema debe mostrar el listado de los logs
    Given La api cargada
    When se realiza la petición a la api de logs
    Then devuelve el listado de los logs en json
    And el estado de la petición debe ser exitoso

  Scenario: Se pueden crear logs a traves del api
    Given El mensaje "log nuevo" y el tipo "INF"
    When se realiza la petición al api de logs
    Then la respuesta de la api es exitosa