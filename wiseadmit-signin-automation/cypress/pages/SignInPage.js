class SignInPage {
    visit() {
        cy.visit("https://www.wiseadmit.io/applynow");
    }

    get emailInput() {
        return cy.get("input[name='email']");
    }

    get passwordInput() {
        return cy.get("input[name='password']", { timeout: 10000 });
    }

    get loginBtn() {
        
        return cy.contains('button', 'Log in');
    }

    get errorMessage() {
        
        return cy.get('.error-message, [role="alert"], .MuiAlert-root, .error, .Mui-error', { timeout: 5000 });
    }

    login(email, password) {
        
        this.emailInput.clear().type(email);
        
       
        cy.get('body').then($body => {
            
            if ($body.find("input[name='password']:visible").length === 0) {
                cy.contains('button', 'Log in').click();
                this.passwordInput.should('be.visible');
            }
        });

        this.passwordInput.clear().type(password);
        this.loginBtn.should('not.be.disabled').click();
    }
}

module.exports = new SignInPage();