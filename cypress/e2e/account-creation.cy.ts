describe('Account creation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/account-creation');
  });

  it('must allow the user to create an account', () => {
    // Intercepte les alertes
    const stub = cy.stub();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Account created successfully!');
    });

    cy.get('input[formControlName="namee"]').type('testUser');
    cy.get('input[formControlName="email"]').type('testUser@example.com');
    cy.get('input[formControlName="password"]').type('testPassword123');
    cy.get('select[formControlName="type_of_account"]').select('employe');
    cy.get('button[type="submit"]').click();

    cy.wait(1000);
  });
});


