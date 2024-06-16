const {Goal,User} = require('../../postgres/connection.js')

const GoalDepositUser = async (req, res) => {
  const { id } = req.params;
  try {
      const user = await User.findOne({ where: { id } });
      if (user) {
          const goals = await Goal.findAll({ where: { userId: user.id } });
          const goalDeposits = goals.reduce((sum, goal) => sum + goal.goalDeposit, 0);
          return res.status(200).json({ goalDeposits: goalDeposits });
      } else {
          return res.status(404).json({ message: "No user exists" });
      }
  } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports={
  GoalDepositUser
}