// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('assertDefaultStoryTree', () => {
  cy.get('[data-testid=generic-card-teaser-tree]')
    .should('be.visible')
    .get('[data-testid=card-teaser]')
    .eq(0)
    .should('have.text', 'Your story begins here.')
    .get('[data-testid=card-teaser')
    .eq(1)
    .should('have.text', 'It can go in one direction.')
    .get('[data-testid=card-teaser')
    .eq(2)
    .should('have.text', 'It can go the other direction.')
    .get('[data-testid=card-teaser')
    .eq(3)
    .should('have.text', 'The other direction has one scenario.')
    .get('[data-testid=card-teaser')
    .eq(4)
    .should('have.text', 'And other scenario.')
});
