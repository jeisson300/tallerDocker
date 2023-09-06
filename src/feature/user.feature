Feature: User controller

  Scenario: login
    Given user and password
    When they will sign in 
    Then response will get token 