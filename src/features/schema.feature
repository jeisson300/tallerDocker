Feature: schema de json para iniciar sesion

    Scenario: dto para obtener una respuesta al momento de inicio de sesion
        Given un inicio de sesion
        When se ingresa el usuario "REX@hotmail.com" y la contraseña "123"
        Then estructura correcta del token
# Scenario: dto para obtener una respuesta al momento de inicio de sesion
#     Given un login
#     When se ingresa "REXll@hotmail.com" y "1233"
#     Then estructura incorrecta del token