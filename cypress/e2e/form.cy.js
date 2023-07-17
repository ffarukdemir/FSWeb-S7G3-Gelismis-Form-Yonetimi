/**
 * 3A Kuralı
 *    Arrange - düzenlemek
 *    Act - harekete geçmek - interaction
 *    Assert - Doğrulama
 */


describe('Form Testleri', () => {
    beforeEach(() => {
        // Arrange
        cy.visit('http://localhost:3000');
    });
  
    it('İsim inputunda doğru değeri girmeli', () => {
      // Arrange
      const name = 'John Doe';
      const nameInput = cy.get('input#name');

      // Act
      nameInput.type(name);
      
      // Assert
      nameInput.should('have.valuhe', name);
    });
  
    it('Email inputunda doğru değeri girmeli', () => {
      // Arrange
      const email = 'test@example.com';
      const emailInput = cy.get('input#email');
  
      // Act
      emailInput.type(email);

      // Assert
      emailInput.should('have.value', email);
    });
  
    it('Şifre inputunda doğru değeri girmeli', () => {
      const password = '123456';
  
      cy.get('input#password').type(password).should('have.value', password);
    });
  
    it('Kullanım koşulları kutusu işaretlenmeli', () => {
      cy.get('input#termsOfService').check().should('be.checked');
    });
  
    it('Form verilerini göndermeli', () => {
      cy.get('input#name').type('John Doe');
      cy.get('input#email').type('test@example.com');
      cy.get('input#password').type('123456');
      cy.get('input#termsOfService').check();
  
      cy.get('button[type="submit"]').click();
  
      cy.contains('Yanıt:');
    });
  
    it('Form doğrulaması hata mesajını göstermeli', () => {
      cy.get('input#name').focus().blur();
      cy.contains('İsim alanı zorunludur.').should('be.visible');
    });
  });
  