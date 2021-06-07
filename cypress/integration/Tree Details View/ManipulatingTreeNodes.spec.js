const { lorem } = require("faker");

context(`Adding, removing and generating Story Tree nodes`, () => {
  beforeEach(() => {
    cy.viewport(1440, 1024);

    cy.visit('/');

    cy.get('button').eq(1).click();
    cy.get('button').eq(3).click();
    cy.get('button').eq(5).click();
    cy.get('button').eq(10).click();
  });

  it(`allows to add story tree node and persists the change`, () => {
    cy.get('[data-testid=card-teaser]').eq(0)
      .should('be.visible')
      .and('have.text', 'Your story begins here.')
      .get('[data-testid=card-teaser]').eq(1)
      .should('be.visible')
      .and('have.text', '')
      .get('[data-testid=card-teaser]').eq(2)
      .should('be.visible')
      .and('have.text', '')
      .get('[data-testid=card-teaser]').eq(3)
      .should('be.visible')
      .and('have.text', '')
      .get('[data-testid=card-teaser]').eq(4)
      .should('be.visible')
      .and('have.text', '')
      .get('[data-testid=card-teaser]').eq(5)
      .should('be.visible')
      .and('have.text', 'It can go in one direction.')
      .get('[data-testid=card-teaser]').eq(6)
      .should('be.visible')
      .and('have.text', 'It can go the other direction.')
      .get('[data-testid=card-teaser]').eq(7)
      .should('be.visible')
      .and('have.text', 'The other direction has one scenario.')
      .get('[data-testid=card-teaser]').eq(8)
      .should('be.visible')
      .and('have.text', 'And other scenario.');

    cy.reload();

    cy.get('[data-testid=card-teaser]').eq(0)
      .should('be.visible')
      .and('have.text', 'Your story begins here.')
      .get('[data-testid=card-teaser]').eq(1)
      .should('be.visible')
      .and('have.text', '')
      .get('[data-testid=card-teaser]').eq(2)
      .should('be.visible')
      .and('have.text', '')
      .get('[data-testid=card-teaser]').eq(3)
      .should('be.visible')
      .and('have.text', '')
      .get('[data-testid=card-teaser]').eq(4)
      .should('be.visible')
      .and('have.text', '')
      .get('[data-testid=card-teaser]').eq(5)
      .should('be.visible')
      .and('have.text', 'It can go in one direction.')
      .get('[data-testid=card-teaser]').eq(6)
      .should('be.visible')
      .and('have.text', 'It can go the other direction.')
      .get('[data-testid=card-teaser]').eq(7)
      .should('be.visible')
      .and('have.text', 'The other direction has one scenario.')
      .get('[data-testid=card-teaser]').eq(8)
      .should('be.visible')
      .and('have.text', 'And other scenario.');
  });

  it(`allows to inline edit card header and persists the change`, () => {
    const texts = [
      lorem.sentences(2),
      lorem.sentences(2),
      lorem.sentences(2)
    ];

    cy.get('[data-testid=card-teaser]').eq(4)
      .click()
      .type(texts[0])
      .get('[data-testid=card-teaser]').eq(5).find('[contenteditable]')
      .click()
      .clear()
      .type(texts[1])
      .get('[data-testid=card-teaser]').eq(1)
      .click()
      .type(texts[2])
      .get('body')
      .click();

    cy.get('[data-testid=card-teaser]').eq(0)
      .should('be.visible')
      .and('have.text', 'Your story begins here.')
      .get('[data-testid=card-teaser]').eq(1)
      .should('be.visible')
      .and('have.text', texts[2])
      .get('[data-testid=card-teaser]').eq(2)
      .should('be.visible')
      .and('have.text', '')
      .get('[data-testid=card-teaser]').eq(3)
      .should('be.visible')
      .and('have.text', '')
      .get('[data-testid=card-teaser]').eq(4)
      .should('be.visible')
      .and('have.text', texts[0])
      .get('[data-testid=card-teaser]').eq(5)
      .should('be.visible')
      .and('have.text', texts[1])
      .get('[data-testid=card-teaser]').eq(6)
      .should('be.visible')
      .and('have.text', 'It can go the other direction.')
      .get('[data-testid=card-teaser]').eq(7)
      .should('be.visible')
      .and('have.text', 'The other direction has one scenario.')
      .get('[data-testid=card-teaser]').eq(8)
      .should('be.visible')
      .and('have.text', 'And other scenario.');

    cy.reload();

    cy.get('[data-testid=card-teaser]').eq(0)
      .should('be.visible')
      .and('have.text', 'Your story begins here.')
      .get('[data-testid=card-teaser]').eq(1)
      .should('be.visible')
      .and('have.text', texts[2])
      .get('[data-testid=card-teaser]').eq(2)
      .should('be.visible')
      .and('have.text', '')
      .get('[data-testid=card-teaser]').eq(3)
      .should('be.visible')
      .and('have.text', '')
      .get('[data-testid=card-teaser]').eq(4)
      .should('be.visible')
      .and('have.text', texts[0])
      .get('[data-testid=card-teaser]').eq(5)
      .should('be.visible')
      .and('have.text', texts[1])
      .get('[data-testid=card-teaser]').eq(6)
      .should('be.visible')
      .and('have.text', 'It can go the other direction.')
      .get('[data-testid=card-teaser]').eq(7)
      .should('be.visible')
      .and('have.text', 'The other direction has one scenario.')
      .get('[data-testid=card-teaser]').eq(8)
      .should('be.visible')
      .and('have.text', 'And other scenario.');
  });

  it(`allows to remove tree node with its subcards and persists the change`, () => {
    cy.get('button').eq(2)
      .click()
      .get('[data-testid="picker-card-teaser-options"]').eq(1)
      .find('[data-testid="picker-item"]').eq(1)
      .click()
      .parent().parent()
      .find('[data-testid="picker-item"]').eq(3)
      .click();

    // Cancel
    cy.get('button').eq(5)
      .click()
      .get('[data-testid="picker-card-teaser-options"]').eq(2)
      .find('[data-testid="picker-item"]').eq(1)
      .click()
      .parent().parent()
      .find('[data-testid="picker-item"]').eq(4)
      .click()
      .get('body')
      .click();

    cy.get('button').eq(2)
      .click()
      .get('[data-testid="picker-card-teaser-options"]').eq(1)
      .find('[data-testid="picker-item"]').eq(1)
      .click()
      .parent().parent()
      .find('[data-testid="picker-item"]').eq(3)
      .click();

      cy.get('[data-testid=card-teaser]').eq(0)
      .should('be.visible')
      .and('have.text', 'Your story begins here.')
      .get('[data-testid=card-teaser]').eq(1)
      .should('be.visible')
      .and('have.text', 'It can go in one direction.')
      .get('[data-testid=card-teaser]').eq(2)
      .should('be.visible')
      .and('have.text', 'It can go the other direction.')
      .get('[data-testid=card-teaser]').eq(3)
      .should('be.visible')
      .and('have.text', '')
      .get('[data-testid=card-teaser]').eq(4)
      .should('be.visible')
      .and('have.text', 'The other direction has one scenario.')
      .get('[data-testid=card-teaser]').eq(5)
      .should('be.visible')
      .and('have.text', 'And other scenario.');

    cy.reload();

    cy.get('[data-testid=card-teaser]').eq(0)
      .should('be.visible')
      .and('have.text', 'Your story begins here.')
      .get('[data-testid=card-teaser]').eq(1)
      .should('be.visible')
      .and('have.text', 'It can go in one direction.')
      .get('[data-testid=card-teaser]').eq(2)
      .should('be.visible')
      .and('have.text', 'It can go the other direction.')
      .get('[data-testid=card-teaser]').eq(3)
      .should('be.visible')
      .and('have.text', '')
      .get('[data-testid=card-teaser]').eq(4)
      .should('be.visible')
      .and('have.text', 'The other direction has one scenario.')
      .get('[data-testid=card-teaser]').eq(5)
      .should('be.visible')
      .and('have.text', 'And other scenario.');
  });

  it(`allows to geenrate subcards and persists the change`);
});
