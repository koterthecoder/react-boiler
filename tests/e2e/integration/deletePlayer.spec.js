describe('Delete Player', () => {
  beforeEach(() => {
    cy.login();
    cy.server();
    cy.route(
      'DELETE',
      'https://players-api.developer.alchemy.codes/api/players/5b24deb1310d217ff39012c4',
      'fixture:deletePlayer.json',
    );
    cy.route('GET', 'https://players-api.developer.alchemy.codes/api/players', 'fixture:getPlayersDeleted.json');
  });

  it('Will delete a player', () => {
    cy
      .get('.delete')
      .last()
      .click();

    cy.get('.delete').should(($a) => {
      // should have found 3 elements
      expect($a).to.have.length(3);
    });
  });
});
