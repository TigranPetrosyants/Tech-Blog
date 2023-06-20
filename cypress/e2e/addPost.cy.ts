describe('Add post', () => {
  const menu = 'ReactJS News';
  const title = 'Test Automate Title';
  const content =
    'Test Automate Post content, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo tenetur rem excepturi quasi laboriosam eos nemo tempora perspiciatis ducimus fugiat recusandae quia voluptas eveniet consequatur, facilis esse neque? Eaque, itaque.';

  it('should add a post successfully', () => {
    cy.visit('/admin/dashboard');

    cy.get('[data-qa="toggle-menu"]').click();
    cy.wait(1000);

    cy.get('[data-qa="Posts"]').click();
    cy.wait(1000);

    cy.get('[data-qa="title"]').type(title);

    cy.get('[data-qa="content"]').type(content);

    cy.get('[data-qa="menu-select"]').click();

    cy.get(`[data-qa="${menu}"]`).click();

    cy.get('[data-qa="add-post"]').click();
    cy.wait(1000);
  });
});
