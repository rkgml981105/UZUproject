const User = require("../../schemas/user");

module.exports = {
    //nickname duplication-check
    isDuplicated : function () {
        let obj = { nickname: req.body.nickname };

        let userNickname = await User.findOne(obj);
        console.log(userNickname);
        if (userNickname) {
            return true
        }
    }
}
