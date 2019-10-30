Feature: endpoint test

Scenario: Number of items should be 30 and Field titles should be defined
    When I successfully access the endpoint
    Then I should see 30 items
    And All items should have a fields object
    And All field titles should be defined

