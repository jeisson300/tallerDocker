Feature: Creacion del usuario

  Scenario: Creacion de un usuario por medio de la gateway
    Given Mensaje de creacion de la api de seguridad y del perfil
    When redireccion de peticion a la api de seguridad y perfil
    Then devuelve un mensaje exitoso de ambas apis
    And el estado de la petición debe ser exitoso
