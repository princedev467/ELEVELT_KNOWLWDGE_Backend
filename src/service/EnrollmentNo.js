const enrollModel = require("../model/enrollment.model");

const generateEnrollmentNo = async () => {

    const now = new Date();

    // Last 2 digits of year
    const year = now.getFullYear().toString().slice(-2);

    // Count enrollments in current year
    const yearStart = new Date(now.getFullYear(), 0, 1);

    const yearEnd = new Date(now.getFullYear() + 1, 0, 1);

    const count = await enrollModel.countDocuments({
        createdAt: {
            $gte: yearStart,
            $lt: yearEnd
        }
    });

    // Order number
    const orderNo = String(count + 1).padStart(3, "0");

    // Final enrollment number
    return `EK${year}${orderNo}`;
};

module.exports = generateEnrollmentNo;