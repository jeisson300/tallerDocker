Feature: Obtener perfil creados

  Scenario: Obtener todos los perfiles creados
    Given ya hay varios perfil creados, se obtendran todos
    When redireccion de la peticion a la api de seguridad para obtener todos los perfil creados
    Then devuelve un json con todo el contenido del perfil
