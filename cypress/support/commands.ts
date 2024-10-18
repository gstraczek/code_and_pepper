/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        signin(email: string, password: string): void;
    }
}

Cypress.Commands.add('signin', (email, password) => {
    cy.visit('http://localhost:3000');
    cy.get('input#input-email-for-credentials-provider').type(email);
    cy.get('input#input-password-for-credentials-provider').type(password);
    cy.get('button[type="submit"]').click();
});