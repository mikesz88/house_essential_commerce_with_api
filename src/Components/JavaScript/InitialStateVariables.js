const displayScreens = {
    home: true,
    login: false, 
    signUp: false,
    cart: false, 
    shipping: false,
    payment: false,
    confirmed: false,
    footer: false,
}

const savedUsers = {
    jason: {
        firstName: 'jason',
        lastName: 'brewer',
        password: 'Bestcoder0!',
        email: 'jason@devslopes.com'
    }
}
    
export const commerceVariables = {
    displayScreens,
    savedUsers,
    currentUser: false,
    cart: {},
    shipping: {},
    payment: {}
}