describe('Check post', () => {
  const menu = 'ReactJS News';
  const title = 'Test Automate Title';
  const content =
    'Test Automate Post content, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo tenetur rem excepturi quasi laboriosam eos nemo tempora perspiciatis ducimus fugiat recusandae quia voluptas eveniet consequatur, facilis esse neque? Eaque, itaque.';

  it('should check the post', () => {
    cy.visit('/admin/dashboard');

    cy.get('[data-qa="logo"]').click();

    cy.get(`[data-qa="${menu}"]`).click();

    cy.get('mat-card-title').contains(title);

    cy.get('mat-card-content').contains('p', content);
  });
});
