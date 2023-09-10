Feature: User controller

  Scenario: login
    Given user="carlos@gmail.com" and password="123"
    When they will sign in api
    Then response will get token 