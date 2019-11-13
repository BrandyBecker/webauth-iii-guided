const { validateUser } = require ('./users-helpers.js')

//Q: How did I test this?
// Ran the Api
// Sent an Empty Object
// We Saw the result Fail
// Sent an Obj with a Username less than 2 characters
// Verified it Failed
// Sent an obj with a Valid username, no password
