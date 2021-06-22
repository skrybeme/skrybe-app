/// <reference types="cypress" />

const { lorem } = require("faker");

context(`Adding, removing and generating Story Tree nodes`, () => {
  beforeEach(() => {
    cy.viewport(1440, 1024);

    cy.visit('/');
  });

  it(`adds card and persists the change`, () => {
    cy.get('[data-testid=generic-story-tree]')
      .find('[data-testid=generic-story-tree]').eq(0)
      .find('[data-testid=card-placeholder-button]').eq(0)
      .click({ force: true })
      
    cy.get('[data-testid=generic-story-tree]')
      .find('[data-testid=generic-story-tree]').eq(1)
      .find('[data-testid=card-placeholder-button]').eq(1)
      .click({ force: true });

    cy.get('[data-testid=generic-story-tree]')
      .find('[data-testid=generic-story-tree]').eq(1)
      .find('[data-testid=card-placeholder-button]').eq(2)
      .click({ force: true });

    cy.get('body').click();

    cy.get('[data-testid=generic-story-tree]')
      .find('[data-testid=generic-story-tree]').eq(0)
      .find('[data-testid=card]').eq(0)
      .should('be.visible')
      .and('have.text', '');

    cy.get('[data-testid=generic-story-tree]')
      .find('[data-testid=generic-story-tree]').eq(3)
      .find('[data-testid=card]').eq(0)
      .should('be.visible')
      .and('have.text', '');

    cy.get('[data-testid=generic-story-tree]')
      .find('[data-testid=generic-story-tree]').eq(1)
      .find('[data-testid=generic-story-tree]').eq(0)
      .find('[data-testid=card]').eq(0)
      .should('be.visible')
      .and('have.text', '');

    cy.reload();

    cy.get('[data-testid=generic-story-tree]')
      .find('[data-testid=generic-story-tree]').eq(0)
      .find('[data-testid=card]').eq(0)
      .should('be.visible')
      .and('have.text', '');

    cy.get('[data-testid=generic-story-tree]')
      .find('[data-testid=generic-story-tree]').eq(3)
      .find('[data-testid=card]').eq(0)
      .should('be.visible')
      .and('have.text', '');

    cy.get('[data-testid=generic-story-tree]')
      .find('[data-testid=generic-story-tree]').eq(1)
      .find('[data-testid=generic-story-tree]').eq(0)
      .find('[data-testid=card]').eq(0)
      .should('be.visible')
      .and('have.text', '');
  });

  it(`adds card with text and persists the change`, () => {
    const text = lorem.words();

    cy.get('[data-testid=generic-story-tree]')
      .find('[data-testid=generic-story-tree]').eq(0)
      .find('[data-testid=card-placeholder-button]').eq(0)
      .click({ force: true });

    cy.focused().type(text);

    cy.get('body').click();

    cy.get('[data-testid=generic-story-tree]')
      .find('[data-testid=generic-story-tree]').eq(0)
      .find('[data-testid=card]').eq(0)
      .should('have.text', text);

    cy.reload();

    cy.get('[data-testid=generic-story-tree]')
      .find('[data-testid=generic-story-tree]').eq(0)
      .find('[data-testid=card]').eq(0)
      .should('have.text', text);
  });

  it(`updates header content of existing card`, () => {
    const text = lorem.words();

    cy.get('[data-testid=generic-story-tree]')
      .find('[data-testid=generic-story-tree]').eq(1)
      .find('[data-testid=editable]').eq(1)
      .click({ force: true });

    cy.focused().clear().type(text);

    cy.reload();

    cy.get('[data-testid=generic-story-tree]')
      .find('[data-testid=generic-story-tree]').eq(1)
      .find('[data-testid=editable]').eq(1)
      .should('have.text', text);
  });
  
  it(`removes card with its descendants and persists the change`, () => {
    cy.get('[data-testid=generic-story-tree]')
      .find('[data-testid=generic-story-tree]').eq(1)
      .find('[data-testid=picker-card-options]').eq(0)
      .click()
      .contains('Remove card...')
      .click();

    cy.get('[data-testid=generic-story-tree]')
      .find('[data-testid=generic-story-tree]').eq(1)
      .find('[data-testid=picker-card-options]').eq(0)
      .contains('Yes')
      .click();

    cy.get('[data-testid=generic-story-tree]')
      .should('have.length', 2);

    cy.reload();

    cy.get('[data-testid=generic-story-tree]')
      .should('have.length', 2);
  });

  it(`generates subcards and persists the change`);
});
