const { validateUser } = require ('./users-helpers.js')

//Q: How did I test this?
// Ran the Api
// Sent an Empty Object
// We Saw the result Fail
// Sent an Obj with a Username less than 2 characters
// Verified it Failed
// Sent an obj with a Valid username, no password

describe("users helpers", ()=>{
    describe("validateUser()", ()=>{
        it("should fail when missing username and password", ()=>{
            //Arrange: Setup the World for the Test
            const invalidUser = { };
            const expected = false;

            //Act: Execute the System Under Test (SUD) => validateUser method
            const actual = validateUser(invalidUser);

            //Assert: We check the Result
            expect(actual.isSuccessful).toBe(expected) //Expect Methods / Matchers
        })
    })
})