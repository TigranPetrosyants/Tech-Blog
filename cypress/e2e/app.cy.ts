describe('Login to accaount, Add post, check post', () => {
  const menu = 'ReactJS News';
  const title = 'Test Automate Title';
  const content =
    'Test Automate Post content, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo tenetur rem excepturi quasi laboriosam eos nemo tempora perspiciatis ducimus fugiat recusandae quia voluptas eveniet consequatur, facilis esse neque? Eaque, itaque.';

  const email = 'tigran@mail.com';
  const pass = '123456';

  beforeEach(() => {
    cy.visit('/home');
  });

  it('should log in, add post, check post successfully', () => {
    cy.visit('login');

    cy.get('[data-qa="email"]').type(email);

    cy.get('[data-qa="password"]').type(pass);

    cy.get('[data-qa="login"]').click();
    cy.wait(1000);

    cy.get('[data-qa="toggle-menu"]').click();
    cy.wait(1000);

    cy.get('[data-qa="Posts"]').click();
    cy.wait(1000);

    cy.get('[data-qa="menu-select"]').click();

    cy.get(`[data-qa="${menu}"]`).click();

    cy.get('[data-qa="title"]').type(title);

    cy.get('[data-qa="content"]').type(content);

    cy.get('[data-qa="add-post"]').click();
    cy.wait(1000);

    cy.get('[data-qa="logo"]').click();

    cy.get(`[data-qa="${menu}"]`).click();

    cy.get('mat-card-title').contains(title);

    cy.get('mat-card-content').contains('p', content);
  });
});
