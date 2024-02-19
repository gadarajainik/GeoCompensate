const { Employee } = require("../../models");


exports.checkCredentials = (data) => {
    let result;
    try {
        let matchQuery = {
            employeeId: data.employeeId,
            password: data.password
        };
        result = Employee.findOne(matchQuery).lean();
    } catch (error) {
        return Promise.reject(error);
    }
    return result;
}

exports.addEmployee = (data) => {
    let result;
    try {
        result = new Employee(data);
    } catch (error) {
        return Promise.reject(error);
    }
    return result;
}
