/// <reference types="cypress" />

describe('Sessions', () => {
    it("should navigate to conference sessions page and view day filter buttons", () => {
        cy.visit('/conference');
        cy.get("h1").contains('View Sessions').click();
        cy.url().should('include', '/sessions');

        // Validate day filter buttons exist
        cy.get("[data-cy=AllSessions]");
        cy.get("[data-cy=Wednesday]");
        cy.get("[data-cy=Thursday]");
        cy.get("[data-cy=Friday]");

        
    });
});