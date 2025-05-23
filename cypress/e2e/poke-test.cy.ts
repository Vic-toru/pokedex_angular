describe('Test de la poke-list', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });

  it('Tyranidex est bien fetch', () => {
    cy.request({
      method: 'GET',
      url: 'https://tyradex.vercel.app/api/v1/pokemon',
    });
  });

  it('Statut API à 200', () => {
    cy.request({
      method: 'GET',
      url: 'https://tyradex.vercel.app/api/v1/pokemon',
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Vérifier le temps que met l'API a retourner le résultat", () => {
    const debut = Date.now();
    cy.request({
      method: 'GET',
      url: 'https://tyradex.vercel.app/api/v1/pokemon',
    }).then(() => {
      const fin = Date.now();
      const temps = fin - debut;
      cy.log(`Le temps de réponse est de ${temps} ms`);
      expect(temps).to.be.lessThan(10000);
    });
  });

  it("Vérifier que l'on a bien 1026 pokémons retournés par l'API", () => {
    cy.request({
      method: 'GET',
      url: 'https://tyradex.vercel.app/api/v1/pokemon',
    }).then((response) => {
      expect(response.body.length).to.eq(1026);
    });
  });

  it('Vérifier que le premier pokémon est Bulbizarre', () => {
      cy.get('.pokecard').first().find('h5').should('contain.text', 'Bulbizarre');
  });

  it('la search bar fonctionne en tapant un nom complet', () => {
  cy.get('.search-bar').type('pikachu', { delay: 500 });
  cy.get('.filtered-list .pokecard').first().find('h5').should('contain.text', 'Pikachu');
  });

  it('la search bar fonctionne en tapant un nom incomplet et que Snubull et le second Pokémon', () => {
  cy.get('.search-bar').type('bul', { delay: 500 });
  cy.get('.filtered-list .pokecard').should('have.length', 7);
  cy.get('.filtered-list .pokecard').eq(1).find('h5').should('contain.text', 'Snubbull');
  });

  it("la search bar fonctionne avec un pokémon qui n'existe pas", () => {
    cy.get('.search-bar').type('toto', { delay: 500 });
    cy.get('.row .poke-card').should('have.length', 0);
  });
});
