const { Notification,User } = require('../../postgres/connection.js')

const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };
  
  const getNextOccurrence = (createdAt, repeatinterval) => {
    switch (repeatinterval) {
      case 'daily':
        return addDays(createdAt, 1);
      case 'weekly':
        return addDays(createdAt, 7);
      case 'monthly':
        return new Date(createdAt.getFullYear(), createdAt.getMonth() + 1, createdAt.getDate());
      case 'yearly':
        return new Date(createdAt.getFullYear() + 1, createdAt.getMonth(), createdAt.getDate());
      default:
        return createdAt;
    }
  };

const CreateNotification = async (req,res) =>{
    const { name, repeatinterval,description } = req.body;
    const userId = req.user.userId;
    try{
        const notification = await Notification.create({ name,user_id:userId,repeatinterval,description});
        return res.status(201).json(notification);
    }catch(error){
      return res.status(500).json({ message: "Error fetching Notification", error: error.message });
    }
}

const GetAllNotification = async (req, res) => {
    const userId = req.user.userId;
    try {
      const user = await User.findOne({ where: { id: userId } });
      if (user) {
        const notifications = await Notification.findAll({ where: { user_id: userId } });
        const notificationsWithNextOccurrence = notifications.map(notification => ({
          ...notification.dataValues,
          nextOccurrence: getNextOccurrence(notification.createdAt, notification.repeatinterval),
        }));
        return res.status(200).json(notificationsWithNextOccurrence);
      } else {
        return res.status(400).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error fetching Notifications", error: error.message });
    }
  };


  const GetSpecificNotification = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;
  
    try {
      const user = await User.findOne({ where: { id: userId } });
      if (user) {
        const notification = await Notification.findOne({ where: { user_id: userId, id } });
        if (notification) {
          const notificationWithNextOccurrence = {
            ...notification.dataValues,
            nextOccurrence: getNextOccurrence(notification.createdAt, notification.repeatinterval),
          };
          return res.status(200).json(notificationWithNextOccurrence);
        } else {
          return res.status(404).json({ message: "Notification not found" });
        }
      } else {
        return res.status(400).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error fetching Notification", error: error.message });
    }
  };
  

const UpdateNotification = async (req,res) =>{
    const {name, repeatinterval,description } = req.body;
    const userId = req.user.userId;
    const user = User.findOne({where:{id: userId}});
    try{
        if(user){ 
            const [updated] = await Notification.update({ name, user_id:userId, repeatinterval, description },
                {
                  where: { id: req.params.id }
                }
              );
              if (updated) {
                const updatedNotification = await Notification.findByPk(req.params.id);
                res.status(200).json(updatedNotification);
              } else {
                res.status(404).json({ error: 'Notification not found' });
              }
        }
        else{
            return res.status(400).json({ message: "User already exists" });
        }
    }catch(error){
      return res.status(500).json({ message: "Error fetching Notification", error: error.message });
    }
}

const DeleteNotification = async (req, res) => {
    const userId = req.user.userId;
    const { id } = req.params; 
    try {
      const user = await User.findOne({ where: { id: userId } }); 
      if (user) {
        const notification = await Notification.findOne({ where: { user_id: userId, id } });
        if (notification) {
          await notification.destroy(); 
          return res.status(200).json({ message: "Notification deleted successfully" });
        } else {
          return res.status(404).json({ message: "Notification not found" });
        }
      } else {
        return res.status(400).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error fetching Notification", error: error.message });
    }
  };
  

module.exports={
    DeleteNotification,
    UpdateNotification,
    GetSpecificNotification,
    GetAllNotification,
    CreateNotification
}