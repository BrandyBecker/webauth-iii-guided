module.exports = {
    validateUser
}

function validateUser(user){

    let errors = [];

    if(user.username || user.username.length < 2 ){
    errors.push('please include a username with atleast 2 characters')
    }
    

    if(user.username || user.username.length < 4){
    errors.push('please include a password with atleast 4 characters')
    }
    

    return {
        isSuccessful: errors.length > 0 ? false: true,
        errors
    }
}