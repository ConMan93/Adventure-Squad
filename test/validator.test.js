const validator = require('./validator');

describe( 'User validation: ', () => {

    test( 'username validator should return true if the given username is less than 4 characters long', () => {
        expect( validator.usernameValidator('use') ).toEqual( true );
    });

    test( 'username validator should return false if the given username is greater than or equal to 4 characters long', () => {
        expect( validator.usernameValidator('username') ).toEqual( false );
    });

    test( 'email validator should return true if the given email does not include an @ symbol or a period', () => {
        expect( validator.emailValidator('email') ).toEqual( true );
    });

    test( 'email validator should return false if the given email includes an @ symbol and a period', () => {
        expect( validator.emailValidator('email@email.com') ).toEqual( false );
    });

    test( 'password validator should return true if the given password is less than 5 characters long', () => {
        expect( validator.passwordValidator('pass') ).toEqual( true );
    });

    test( 'password validator should return false if the given password is greater than or equal to 5 characters long', () => {
        expect( validator.passwordValidator('password') ).toEqual( false );
    });

    test ( 'confirm password validator should return true if confirmPassword and password do not match', () => {
        expect( validator.confirmPasswordValidator('pass', 'password') ).toEqual( true );
    });

    test( 'confirm password validator should return false if confirmPassword and password match', () => {
        expect( validator.confirmPasswordValidator('password', 'password') ).toEqual( false )
    })

})