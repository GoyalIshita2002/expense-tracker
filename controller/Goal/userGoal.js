const { Goal,User } = require('../../postgres/connection.js')


const CreateGoal = async (req, res) => {
    const { name,requiredAmount,goalDeposit,expectedTime,userId } = req.body;
    try {
      const Goals = await Goal.create({ name,requiredAmount,goalDeposit,expectedTime,userId });
      return res.status(201).json({ Goal: Goals });
    } catch (error) {
      return res.status(500).json({ message: "Error creating Goal", error: error.message });
    }
  };

  const ShowGoal = async (req, res) => {
    const { userId } = req.params;  
    try {
      const users = await User.findOne({ where: {id: userId } });
      if (users) {
        const goals = await Goal.findAll({where:{userId}});
        return res.status(200).json({ Goals: goals });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error finding goals", error: error.message });
    }
  };
  
  const ShowSpecificGoal = async (req, res) => {
    const { id, userId } = req.params;
    try {
      const user = await User.findOne({ where: {id: userId } });
      if (user) {
        const goal = await Goal.findOne({ where: { id, userId } });
        if (goal) {
          return res.status(200).json({ Goal: goal });
        } else {
          return res.status(404).json({ message: "Goal not found for this user" });
        }
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error finding goal", error: error.message });
    }
  };

  const UpdateGoal = async (req, res) => {
    const { id,userId} = req.params;
    const { name,requiredAmount,goalDeposit,expectedTime } = req.body;
    const user = User.findOne({where:{id: userId}});
    try {
      if(user){
        const Goals = await Goal.findOne({ where: {id ,userId} });
        if (Goals) {
          await Goals.update({ name,requiredAmount,goalDeposit,expectedTime });
          return res.status(200).json({ Goals });
        } else {
          return res.status(404).json({ message: "Goals id does not exist" });
        }
      }
      else{
        return res.status(404).json({ message: "For this user goal do not exist" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error finding Goal", error: error.message });
    }
  };

  const DeleteGoal = async (req, res) => {
    const { id,userId } = req.params;
    const user = User.findOne({where:{id: userId}});
    try {
      if(user){
        const goal = await Goal.findOne({ where: { id,userId } });
        if (goal) {
          await goal.destroy(); 
          return res.status(200).json({ message: "Goal deleted successfully" });
        } else {
          return res.status(404).json({ message: "Goal id does not exist" });
        }
      }
      else{
        return res.status(404).json({ message: "For this user, goal do not exist" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error deleting goal", error: error.message });
    }
  };
  
  

  module.exports = {
    UpdateGoal ,
    ShowSpecificGoal,
    ShowGoal,
    CreateGoal,
    DeleteGoal
  }