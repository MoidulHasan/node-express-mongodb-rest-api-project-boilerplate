const User = require("./user.model")



const userController = {}


userController.create = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();

        res.status(httpStatus.CREATED);
        res.json(savedUser.transform());
    }
    catch (error) {
        next(User.checkDuplicateEmail(error));
    }
}


userController.getAll = async (req, res, next) => {
    try {
        const users = await User.list(req.query);
        const transformedUsers = users.map(user => user.transform());
        res.json(transformedUsers)
    } catch (error) {
        next(error)
    }
}


module.exports = userController;
