/// <reference types="cypress" />

describe("Sessions", () => {
  it("should navigate to conference sessions page and view day filter buttons", () => {
    cy.visit("/conference");
    cy.get("h1").contains("View Sessions").click();
    cy.url().should("include", "/sessions");

    // Validate day filter buttons exist
    cy.get("[data-cy=AllSessions]");
    cy.get("[data-cy=Wednesday]");
    cy.get("[data-cy=Thursday]");
    cy.get("[data-cy=Friday]");
  });

  it("should filter sessions and display only Thursday sessions when Thursday button is clicked", () => {
    cy.get("[data-cy=Thursday]").click();

    // Validate Thursday sessions are visible
    cy.get("[data-cy=day]").contains("Thursday").should("be.visible");

    // Validate other days are not visible
    cy.get("[data-cy=day]").contains("Wednesday").should("not.exist");
    cy.get("[data-cy=day]").contains("Friday").should("not.exist");
  });

  it("should filter sessions and display only Friday sessions when Friday button is clicked", () => {
    cy.get("[data-cy=Friday]").click();

    // Validate Friday sessions are visible
    cy.get("[data-cy=day]").contains("Friday").should("be.visible");

    // Validate other days are not visible
    cy.get("[data-cy=day]").contains("Wednesday").should("not.exist");
    cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
  });

  it("should filter sessions and display only Wednesday sessions when Wednesday button is clicked", () => {
    cy.get("[data-cy=Wednesday]").click();

    // Validate Wednesday sessions are visible
    cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");

    // Validate other days are not visible
    cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
    cy.get("[data-cy=day]").contains("Friday").should("not.exist");
  });

  it("should filter sessions and display all sessions when All Sessions button is clicked", () => {
    cy.get("[data-cy=AllSessions]").click();

    // Validate all sessions are visible
    cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");
    cy.get("[data-cy=day]").contains("Thursday").should("be.visible");
    cy.get("[data-cy=day]").contains("Friday").should("be.visible");
  });
});
