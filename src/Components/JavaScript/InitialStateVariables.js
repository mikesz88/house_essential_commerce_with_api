const displayScreens = {
    home: true,
    login: false, 
    signUp: false,
    cart: false, 
    shipping: false,
    payment: false,
    confirmed: false
}

const savedUsers = [
    {
        firstName: 'Jason',
        lastName: 'Brewer',
        password: 'Bestcoder0!',
        email: 'jason@devslopes.com'
    }
]
    
export const commerceVariables = {
    displayScreens,
    savedUsers,
    currentUser: false,
    cart: {},
    shipping: {},
    payment: {}
}