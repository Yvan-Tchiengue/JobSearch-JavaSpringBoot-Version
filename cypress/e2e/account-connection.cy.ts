describe('User account login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/connection');
  });

  it('must enable the user to connect successfully', () => {
    cy.get('input[formControlName="email"]').type('yvan.tchiengue1504@yahoo.fr');
    cy.get('input[formControlName="password"]').type('qqqqqqqq');
    cy.get('button[type="submit"]').click();

    // Nous vérifions donc que l'URL est correcte.
    cy.url().should('include', '/dashboard');
  });

  it('should fail when logging in with incorrect credentials', () => {
    cy.get('input[formControlName="email"]').type('wrongEmail@example.com');
    cy.get('input[formControlName="password"]').type('wrongPassword123');
    cy.get('button[type="submit"]').click();

    // Lorsque les informations d'identification sont incorrectes, une alerte doit s'afficher.
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Erreur lors de l\'authentification: Authentication error: wrong email address or password!');
    });
  });
});
