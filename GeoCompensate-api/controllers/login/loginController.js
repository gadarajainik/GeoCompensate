const { checkCredentials } = require("../../services/employee/employeeService");


class LoginController {
    static async login(req, res) {
        try {
            const payload = req.body;
            let emp = await checkCredentials(payload);
            delete emp.password;
            return res.status(200).json({
                type: "success",
                message: "Success result",
                data: emp,
            });
        } catch (error) {
            return res.status(500).json({
                type: "error",
                message: error.message || "Unhandled Error",
                error,
            });
        }
    }
}
module.exports = LoginController;