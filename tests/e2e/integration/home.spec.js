describe('Home Page', () => {
  it('Visits the landing page', () => {
    cy.visit('/');
    cy.contains('Login');
    cy.contains('Register');
  });
});
