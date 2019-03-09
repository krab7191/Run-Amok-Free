
// Helper functions for mongoose validation etc. so no redundant code in models

module.exports = {
    // Email validation
    email: email => {
        const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        return emailRegex.test(email);
    }
}