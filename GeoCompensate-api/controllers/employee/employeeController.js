class EmployeeController {
    static async addEmployee(req, res) {
        try {
            
            let emp = addEmployee(req.payload); 
            return res.status(200).json({
                type:"success",
                message: "Success result",
                data: emp
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

module.exports = EmployeeController