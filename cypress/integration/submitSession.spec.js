/// <reference types="cypress" />

describe("Submit Session", () => {
  beforeEach(() => {
    cy.visit("/conference");
    cy.get("h1").contains("View Sessions").click();
    cy.url().should("include", "/sessions");
    cy.get("a").contains("Submit a Session!").click();
  });

  it("should navigate to submit session page", () => {
    cy.url().should("include", "/sessions/new");
  });

  it("should submit a session", () => {
    cy.contains("Title").type("New session title");
    cy.contains("Description").type("This is the greatest session ever!");
    cy.contains("Day").type("Thursday");
    cy.contains("Level").type("Advanced");

    // Submit the form
    cy.get("form").submit();

    // success message
    cy.contains("Session Submitted Successfully");
  });
});
