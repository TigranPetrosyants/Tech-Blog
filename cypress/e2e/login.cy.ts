describe('Login', () => {
  const email = 'tigran@mail.com';
  const pass = '123456';

  beforeEach(() => {
    cy.visit('/home');
  });

  it('should log in successfully', () => {
    cy.visit('login');

    cy.get('[data-qa="email"]').type(email);

    cy.get('[data-qa="password"]').type(pass);

    cy.get('[data-qa="login"]').click();
    cy.wait(1000);
  });
});
