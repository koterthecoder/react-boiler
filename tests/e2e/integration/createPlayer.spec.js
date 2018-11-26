describe('Add player page', () => {
  beforeEach(() => {
    cy.login();
    cy.server();
    // Cypress routes are one time use
    cy.route('POST', 'https://players-api.developer.alchemy.codes/api/players', 'fixture:createPlayer.json');
    cy.route('GET', 'https://players-api.developer.alchemy.codes/api/players', 'fixture:getPlayers.json');
  });

  it('Contains player field labels', () => {
    cy.visit('/player/new');
    cy.contains('First Name');
    cy.contains('Last Name');
    cy.contains('Rating');
    cy.contains('Handedness');
  });

  it('Accepts valid email and password', () => {
    cy.visit('/player/new');
    cy.get('#firstName').type('Tom');
    cy.get('#lastName').type('Riddle');
    cy.get('#rating').type('10');
    cy.get('#handedness').select('Right');
    cy.get('#create').click();
    cy.url().should('eq', 'http://localhost:3000/roster');
    cy.contains('Tom');
  });
});
