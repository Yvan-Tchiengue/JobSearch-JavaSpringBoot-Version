describe('Job Search', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/jobs-offer');
  });

  it('should display job offers when the user clicks on search', () => {
    cy.get('button').contains('search').click();
    cy.get('mat-card').should('exist');
    cy.get('mat-card').first().find('mat-card-title').should('not.be.empty');
  });
});
