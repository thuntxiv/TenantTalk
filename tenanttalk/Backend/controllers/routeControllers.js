const pageRoute = '../Frontend/src/pages';

const home = async (req, res) => {
    try {
        res.send('Hello World');
    } catch (error) {
        console.error(error);
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    home,
    login
}