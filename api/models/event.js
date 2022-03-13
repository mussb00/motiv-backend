// here we make functions that can be used in the controllers
// makes code more readable
// define the callback functions in the routes here, then just call them in the routes
// e.g.
const greeting = (req, res) => {
    res.send('hello all')
}

module.exports = greeting