/// <reference types="cypress" />

context(`Loading Story Tree persisted in the browser`, () => {
  it(`displays default story tree if none was persisted before`, () => {
    localStorage.removeItem('collection:story-tree-root');

    cy.visit('/');

    cy.assertDefaultStoryTree();
  });

  it(`displays default story tree if persisted data is corrupted`, () => {
    localStorage.setItem('collection:story-tree-info', '[]');
    localStorage.setItem('collection:story-tree-root', 'corrupted!##data');

    cy.visit('/');

    cy.assertDefaultStoryTree();
  });

  it(`displays default story tree if persisted data is of invalid type`, () => {
    localStorage.setItem('collection:story-tree-info', '[]');
    localStorage.setItem('collection:story-tree-root', '[{}]');

    cy.visit('/');

    cy.assertDefaultStoryTree();
  });

  it(`displays story tree persisted in local storage if such is valid`, () => {
    localStorage.setItem('collection:story-tree-info', '[{"id":"7ff53dea-5aaf-4d7e-9a2f-fa6c652579da","title":"Once Upon a Time in Hollywood"},{"id":"da9f737a-63b9-45a1-88b0-6e8bf9a8c0e6","title":"Polly Wants a Cracker"},{"id":"672052bd-be40-4f47-887c-02a9cb5c33fc","title":"She Was Never a Virgin: A Story Of Diane\'s Insecurities"},{"id":"c80ff14a-4ede-491f-8fcf-d19e8742eb41","title":"New Untitled Project"}]');
    localStorage.setItem('collection:story-tree-root', '[{"id":"ba5ff9b6-c93c-4af9-b6d2-8e73168db61c","infoId":"7ff53dea-5aaf-4d7e-9a2f-fa6c652579da","tree":{"ad25244b-9d62-4506-9427-f5ee2e15b3e8":{"childrenIds":["b5db3f95-0c6e-474d-ac47-0adf68b16fa5","0373574e-3160-4b9e-9e4c-082c5abfa1eb"],"isRoot":true,"node":{"body":"","header":"The root of the story.","id":"ad25244b-9d62-4506-9427-f5ee2e15b3e8","tags":[{"color":"#FF8D6C","id":"f607c85f-303d-49be-a4cc-274f897218cd","label":"orange"},{"color":"#FFC15C","id":"65c5bdf6-e6cb-454d-87f6-2861039363a9","label":"yellow"}]},"parentId":""},"b5db3f95-0c6e-474d-ac47-0adf68b16fa5":{"childrenIds":[],"isRoot":false,"node":{"body":"","header":"Left child.","id":"b5db3f95-0c6e-474d-ac47-0adf68b16fa5","tags":[]},"parentId":"ad25244b-9d62-4506-9427-f5ee2e15b3e8"},"0373574e-3160-4b9e-9e4c-082c5abfa1eb":{"childrenIds":["63a93d48-1040-4a8e-9a47-ef4bc3420e29","5aef3981-b775-4232-b833-d94636079e2b"],"isRoot":false,"node":{"body":"","header":"Left\'s first grandchild.","id":"0373574e-3160-4b9e-9e4c-082c5abfa1eb","tags":[]},"parentId":"ad25244b-9d62-4506-9427-f5ee2e15b3e8"},"63a93d48-1040-4a8e-9a47-ef4bc3420e29":{"childrenIds":[],"isRoot":false,"node":{"body":"","header":"Left\'s second grandchild.","id":"63a93d48-1040-4a8e-9a47-ef4bc3420e29","tags":[]},"parentId":"0373574e-3160-4b9e-9e4c-082c5abfa1eb"},"5aef3981-b775-4232-b833-d94636079e2b":{"childrenIds":[],"isRoot":false,"node":{"body":"","header":"Middle child.","id":"5aef3981-b775-4232-b833-d94636079e2b","tags":[]},"parentId":"0373574e-3160-4b9e-9e4c-082c5abfa1eb"}}},{"id":"b6ca02de-3758-4fb3-b401-1a72b9cad387","infoId":"da9f737a-63b9-45a1-88b0-6e8bf9a8c0e6","tree":{"e2622447-b25a-442c-b86c-b8f54a179088":{"childrenIds":["ad2a7d1a-5da9-4ef1-806c-03fbdfd442b2","3df2734e-d241-46ff-90ae-b866781b99d0","603bfdc7-679d-4cc4-bae1-9961b5d1d012"],"isRoot":true,"node":{"body":"Jakaś ciekawa edycja...<div>Tutaj!</div>","header":"Bah...","id":"e2622447-b25a-442c-b86c-b8f54a179088","tags":[{"color":"#FFC15C","id":"65c5bdf6-e6cb-454d-87f6-2861039363a9","label":"yellow"},{"color":"#1EC689","id":"2af389f1-b827-431f-87b2-f76571f3af50","label":"green"}]},"parentId":""},"ad2a7d1a-5da9-4ef1-806c-03fbdfd442b2":{"childrenIds":[],"isRoot":false,"node":{"body":"","header":"sssasdsad","id":"ad2a7d1a-5da9-4ef1-806c-03fbdfd442b2","tags":[]},"parentId":"e2622447-b25a-442c-b86c-b8f54a179088"},"3df2734e-d241-46ff-90ae-b866781b99d0":{"childrenIds":["39c7fd5a-b547-4ddc-a913-ead4be4d6497"],"isRoot":false,"node":{"body":"","header":"Jakaś ciekawa edycja","id":"3df2734e-d241-46ff-90ae-b866781b99d0","tags":[{"color":"#008BDB","id":"32e08724-853d-481d-a00f-79779bd4001b","label":"blue"}]},"parentId":"e2622447-b25a-442c-b86c-b8f54a179088"},"603bfdc7-679d-4cc4-bae1-9961b5d1d012":{"childrenIds":[],"isRoot":false,"node":{"body":"","header":"div>Tutaj!</div","id":"603bfdc7-679d-4cc4-bae1-9961b5d1d012","tags":[]},"parentId":"e2622447-b25a-442c-b86c-b8f54a179088"}}},{"id":"eae41908-57a8-46ef-addc-c8fc16001047","infoId":"672052bd-be40-4f47-887c-02a9cb5c33fc","tree":{"ddad082b-0d53-41d9-af58-253505aca2d0":{"childrenIds":["72796ec1-35a1-413a-8d63-90334ef82b69"],"isRoot":true,"node":{"body":"","header":"Casdasd","id":"ddad082b-0d53-41d9-af58-253505aca2d0","tags":[]},"parentId":""},"72796ec1-35a1-413a-8d63-90334ef82b69":{"childrenIds":[],"isRoot":false,"node":{"body":"sdf","header":"sfd","id":"72796ec1-35a1-413a-8d63-90334ef82b69","tags":[{"color":"#FF8D6C","id":"f607c85f-303d-49be-a4cc-274f897218cd","label":"orange"},{"color":"#FFC15C","id":"65c5bdf6-e6cb-454d-87f6-2861039363a9","label":"yellow"}]},"parentId":"ddad082b-0d53-41d9-af58-253505aca2d0"}}},{"id":"77a6c7e9-075d-449d-bdda-178a0f6343e2","infoId":"c80ff14a-4ede-491f-8fcf-d19e8742eb41","tree":{"061e163b-f1b5-4390-aa50-efd4a77a7502":{"childrenIds":["f0d765fe-2ec1-4dfa-b1c6-14e1fa12bb26"],"isRoot":true,"node":{"body":"","header":"Some data here","id":"061e163b-f1b5-4390-aa50-efd4a77a7502","tags":[]},"parentId":""},"f0d765fe-2ec1-4dfa-b1c6-14e1fa12bb26":{"childrenIds":["6e246550-f509-4598-a56b-c760711cffa8"],"isRoot":false,"node":{"body":"","header":"Some data here","id":"f0d765fe-2ec1-4dfa-b1c6-14e1fa12bb26","tags":[]},"parentId":"061e163b-f1b5-4390-aa50-efd4a77a7502"},"6e246550-f509-4598-a56b-c760711cffa8":{"childrenIds":[],"isRoot":false,"node":{"body":"","header":"Some data here","id":"6e246550-f509-4598-a56b-c760711cffa8","tags":[]},"parentId":"f0d765fe-2ec1-4dfa-b1c6-14e1fa12bb26"}}}]');
  
    cy.visit('/');

    cy.get('[data-testid=generic-story-tree]')
      .should('be.visible');

    cy.get('[data-testid=card]')
      .eq(0)
      .should('have.text', 'The root of the story.');

    cy.get('[data-testid=card]')
      .eq(1)
      .should('have.text', 'Left child.');

    cy.get('[data-testid=card]')
      .eq(2)
      .should('have.text', 'Left\'s first grandchild.');

    cy.get('[data-testid=card]')
      .eq(3)
      .should('have.text', 'Left\'s second grandchild.');

    cy.get('[data-testid=card]')
      .eq(4)
      .should('have.text', 'Middle child.');
  });

  it(`dragging`);
});
