describe('signin', () => {
  it('successfully signin', () => {
    cy.visit('http://localhost:3000')
    cy.get('input#input-email-for-credentials-provider').type('test@test.pl');
    cy.get('input#input-password-for-credentials-provider').type('test');
    cy.get('button[type="submit"]').click();
    cy.get('button').contains('Sign Out').should('exist');
  })
  it('fails signin', () => {
    cy.visit('http://localhost:3000')
    cy.get('input#input-email-for-credentials-provider').type('test@test.pl');
    cy.get('input#input-password-for-credentials-provider').type('fakePassword');
    cy.get('button[type="submit"]').click();
    cy.get('p').contains('Sign in failed. Check the details you provided are correct.').should('exist');
  })
})