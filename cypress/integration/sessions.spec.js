/// <reference types="cypress" />

describe("Sessions", () => {
    beforeEach(() => {
        cy.visit("/conference");
        cy.get("h1").contains("View Sessions").click();
        cy.url().should("include", "/sessions");

        // Add alias for buttons
        cy.get("[data-cy=Wednesday]").as("WednesdayButton");
        cy.get("[data-cy=Thursday]").as("ThursdayButton");
        cy.get("[data-cy=Friday]").as("FridayButton");
        cy.get("[data-cy=AllSessions]").as("AllSessionsButton");
    });
  it("should navigate to conference sessions page and view day filter buttons", () => {

    // Validate day filter buttons exist
    cy.get("[data-cy=AllSessions]");
    cy.get("[data-cy=Wednesday]");
    cy.get("[data-cy=Thursday]");
    cy.get("[data-cy=Friday]");
  });

  it("should filter sessions and display only Thursday sessions when Thursday button is clicked", () => {

    cy.intercept("POST", "http://localhost:4000/graphql").as("getSessionInfo");
    cy.get("@ThursdayButton").click();
    cy.wait("@getSessionInfo");

    // Validate Thursday sessions are visible
    cy.get("@ThursdayButton").click();
    cy.get("[data-cy=day]").contains("Thursday").should("be.visible");

    // Validate other days are not visible
    cy.get("[data-cy=day]").contains("Wednesday").should("not.exist");
    cy.get("[data-cy=day]").contains("Friday").should("not.exist");
  });

  it("should filter sessions and display only Friday sessions when Friday button is clicked", () => {

    cy.intercept("POST", "http://localhost:4000/graphql").as("getSessionInfo");
    cy.get("@FridayButton").click();
    cy.wait("@getSessionInfo");

    // Validate Friday sessions are visible
    cy.get("[data-cy=day]").contains("Friday").should("be.visible");

    // Validate other days are not visible
    cy.get("[data-cy=day]").contains("Wednesday").should("not.exist");
    cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
  });

  it("should filter sessions and display only Wednesday sessions when Wednesday button is clicked", () => {

    // Validate Wednesday sessions are visible
    cy.get("@WednesdayButton").click();
    cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");

    // Validate other days are not visible
    cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
    cy.get("[data-cy=day]").contains("Friday").should("not.exist");
  });

  it("should filter sessions and display all sessions when All Sessions button is clicked", () => {
    
    cy.intercept("POST", "http://localhost:4000/graphql").as("getSessionInfo");
    cy.get("@AllSessionsButton").click();
    cy.wait("@getSessionInfo");

    // Validate all sessions are visible
    cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");
    cy.get("[data-cy=day]").contains("Thursday").should("be.visible");
    cy.get("[data-cy=day]").contains("Friday").should("be.visible");
  });
});
