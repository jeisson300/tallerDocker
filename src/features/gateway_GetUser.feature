Feature: Obtener usuarios creados

  Scenario: Obtener todos los usurios creados
    Given ya hay varios usuarios creados, se obtendran todos
    When redireccion de la peticion a la api de seguridad para obtener todos los usuarios creados
    Then devuelve un json con todo el contenido
