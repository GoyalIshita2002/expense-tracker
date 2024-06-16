const { Income,User,Goal } = require('../../postgres/connection.js')

const OverAllIncomeUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ where: { id } });
        if (user) {
            const incomes = await Income.findAll({ where: { userId: id } });
            const goals = await Goal.findAll({ where: { userId: id } });
            const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
            const totalGoalDeposit = goals.reduce((sum, goal) => sum + goal.goalDeposit, 0);
            const overallMoney = totalIncome + totalGoalDeposit;
            return res.status(200).json({ overallMoney });
        } else {
            return res.status(404).json({ message: "No user exists" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports={
    OverAllIncomeUser 
}