const { Reward } = require('../../postgres/connection.js')


const CreateReward = async (req, res) => {
    const { badge,points } = req.body;
    try {
      const Rewards = await Reward.create({  badge,points });
      return res.status(201).json({ Reward: Rewards });
    } catch (error) {
      return res.status(500).json({ message: "Error creating Reward", error: error.message });
    }
  };

  const ShowReward = async (req, res) => {
    try {
        const Rewards = await Reward.findAll();
        return res.status(200).json({ Rewards: Rewards });
     
    } catch (error) {
      return res.status(500).json({ message: "Error finding Reward", error: error.message });
    }
  };
  

  const DeleteReward = async (req, res) => {
    const { id } = req.params;
    try {
        const reward = await Reward.findOne({ where: { id} });
      if(reward){ 
          await reward.destroy(); 
          return res.status(200).json({ message: "Reward deleted successfully" }); 
      }
      else{
        return res.status(404).json({ message: "Reward do not exist" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error deleting reward", error: error.message });
    }
  };
  
  

  module.exports = {
    DeleteReward,
    ShowReward,
    CreateReward
  }