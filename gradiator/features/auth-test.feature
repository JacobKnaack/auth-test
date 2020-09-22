Feature: Devloper can perform role related operations
  As a Developer
  I want to be able to validate roles
  So that I can access capabilites related to my role type

  Scenario: Client can create a User
    Given the Client can display the acl view
    And the Client can set a the api url
    When the Client signs up as a user
    And the Client selects the "Read" capability
    Then the Client displays "Access Granted"

  Scenario: Client can create an Admin
    Given the Client can display the acl view
    And the Client can set a the api url
    When the Client signs up as an admin
    And the Client selects the "Change" capability
    Then the Client displays "Access Granted"
    And the Client selects the "Add" capability
    Then the Client displays "Access Granted"
    And the Client selects the "Remove" capability
    Then the Client displays "Access Granted"