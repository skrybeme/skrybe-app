/// <reference types="cypress" />

context(`Loading Story Tree persisted in the browser`, () => {
  it(`displays default story tree if none was persisted before`, () => {
    localStorage.removeItem('example-tree');

    cy.visit('/');

    cy.get('[data-testid=generic-card-teaser-tree]')
      .should('be.visible');

    cy.get('[data-testid=card-teaser]')
      .eq(0)
      .should('have.text', 'Your story begins here.');
    
    cy.get('[data-testid=card-teaser')
      .eq(1)
      .should('have.text', 'It can go in one direction.');

    cy.get('[data-testid=card-teaser')
      .eq(2)
      .should('have.text', 'It can go the other direction.');
    
    cy.get('[data-testid=card-teaser')
      .eq(3)
      .should('have.text', 'The other direction has one scenario.');

    cy.get('[data-testid=card-teaser')
      .eq(4)
      .should('have.text', 'And other scenario.');
  });

  it(`displays default story tree if persisted data is corrupted`, () => {
    localStorage.setItem('example-tree', 'corrupted!##data');

    cy.visit('/');

    cy.get('[data-testid=generic-card-teaser-tree]')
      .should('be.visible');

    cy.get('[data-testid=card-teaser]')
      .eq(0)
      .should('have.text', 'Your story begins here.');
    
    cy.get('[data-testid=card-teaser')
      .eq(1)
      .should('have.text', 'It can go in one direction.');

    cy.get('[data-testid=card-teaser')
      .eq(2)
      .should('have.text', 'It can go the other direction.');
    
    cy.get('[data-testid=card-teaser')
      .eq(3)
      .should('have.text', 'The other direction has one scenario.');

    cy.get('[data-testid=card-teaser')
      .eq(4)
      .should('have.text', 'And other scenario.');
  });

  it(`displays default story tree if persisted data is of invalid type`, () => {
    localStorage.setItem('example-tree', '{}');

    cy.visit('/');

    cy.get('[data-testid=generic-card-teaser-tree]')
      .should('be.visible');

    cy.get('[data-testid=card-teaser]')
      .eq(0)
      .should('have.text', 'Your story begins here.');
    
    cy.get('[data-testid=card-teaser')
      .eq(1)
      .should('have.text', 'It can go in one direction.');

    cy.get('[data-testid=card-teaser')
      .eq(2)
      .should('have.text', 'It can go the other direction.');
    
    cy.get('[data-testid=card-teaser')
      .eq(3)
      .should('have.text', 'The other direction has one scenario.');

    cy.get('[data-testid=card-teaser')
      .eq(4)
      .should('have.text', 'And other scenario.');
  });

  it(`displays story tree persisted in local storage if such is valid`, () => {
    localStorage.setItem('example-tree', '{"id":"ba5ff9b6-c93c-4af9-b6d2-8e73168db61c","tree":{"ad25244b-9d62-4506-9427-f5ee2e15b3e8":{"childrenIds":["1918eee1-619a-4fcc-bfe2-295cf20bb85c","d8e65ea3-4f07-4cad-9a65-574b8641dd7b","f3e37c6d-8292-4896-8a97-1f2a8cf99ef9"],"isRoot":true,"node":{"body":"","header":"The root of the story.","id":"ad25244b-9d62-4506-9427-f5ee2e15b3e8","tags":[]},"parentId":""},"1918eee1-619a-4fcc-bfe2-295cf20bb85c":{"childrenIds":["2b2bc0ec-889b-47a2-b26a-16ee95c59f19","a726fecb-b04e-4d38-a257-60384b06befa"],"isRoot":false,"node":{"body":"","header":"Left child.","id":"1918eee1-619a-4fcc-bfe2-295cf20bb85c","tags":[]},"parentId":"ad25244b-9d62-4506-9427-f5ee2e15b3e8"},"2b2bc0ec-889b-47a2-b26a-16ee95c59f19":{"childrenIds":[],"isRoot":false,"node":{"body":"","header":"Left\'s first grandchild.","id":"2b2bc0ec-889b-47a2-b26a-16ee95c59f19","tags":[]},"parentId":"1918eee1-619a-4fcc-bfe2-295cf20bb85c"},"a726fecb-b04e-4d38-a257-60384b06befa":{"childrenIds":[],"isRoot":false,"node":{"body":"","header":"Left\'s second grandchild.","id":"a726fecb-b04e-4d38-a257-60384b06befa","tags":[]},"parentId":"1918eee1-619a-4fcc-bfe2-295cf20bb85c"},"d8e65ea3-4f07-4cad-9a65-574b8641dd7b":{"childrenIds":["a5385880-e4ec-4634-841d-229633cfdc9d"],"isRoot":false,"node":{"body":"","header":"Middle child.","id":"d8e65ea3-4f07-4cad-9a65-574b8641dd7b","tags":[]},"parentId":"ad25244b-9d62-4506-9427-f5ee2e15b3e8"},"a5385880-e4ec-4634-841d-229633cfdc9d":{"childrenIds":[],"isRoot":false,"node":{"body":"","header":"Middle\'s grandchild.","id":"a5385880-e4ec-4634-841d-229633cfdc9d","tags":[]},"parentId":"d8e65ea3-4f07-4cad-9a65-574b8641dd7b"},"f3e37c6d-8292-4896-8a97-1f2a8cf99ef9":{"childrenIds":[],"isRoot":false,"node":{"body":"","header":"Right child.","id":"f3e37c6d-8292-4896-8a97-1f2a8cf99ef9","tags":[]},"parentId":"ad25244b-9d62-4506-9427-f5ee2e15b3e8"}}}');
  
    cy.visit('/');

    cy.get('[data-testid=generic-card-teaser-tree]')
      .should('be.visible');

    cy.get('[data-testid=card-teaser]')
      .eq(0)
      .should('have.text', 'The root of the story.');

    cy.get('[data-testid=card-teaser]')
      .eq(1)
      .should('have.text', 'Left child.');

    cy.get('[data-testid=card-teaser]')
      .eq(2)
      .should('have.text', 'Left\'s first grandchild.');

    cy.get('[data-testid=card-teaser]')
      .eq(3)
      .should('have.text', 'Left\'s second grandchild.');

    cy.get('[data-testid=card-teaser]')
      .eq(4)
      .should('have.text', 'Middle child.');

    cy.get('[data-testid=card-teaser]')
      .eq(5)
      .should('have.text', 'Middle\'s grandchild.');

    cy.get('[data-testid=card-teaser]')
      .eq(6)
      .should('have.text', 'Right child.');
  });
});
