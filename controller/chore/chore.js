const { Chore, Task, User } = require('../../postgres/connection.js')
const { Op } = require('sequelize');

const assignDailyTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        const userId = req.user.userId;
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        let assignedChores = [];
        let alreadyAssigned = false;

        for (const task of tasks) {
            const existingChore = await Chore.findOne({
                where: {
                    userId: userId,
                    taskId: task.id,
                    createdAt: {
                        [Op.gte]: today 
                    }
                }
            });

            if (!existingChore) {
                const chore = await Chore.create({
                    userId: userId,
                    taskId: task.id,
                    status: 'assigned'
                });
                assignedChores.push(chore);
            } else {
                alreadyAssigned = true;
            }
        }

        if (assignedChores.length > 0) {
            res.status(200).json({ 
                message: 'Daily tasks assigned successfully', 
                chores: assignedChores 
            });
        } else if (alreadyAssigned) {
            res.status(200).json({ 
                message: 'Daily tasks already assigned' 
            });
        } else {
            res.status(200).json({ 
                message: 'No tasks to assign' 
            });
        }

    } catch (error) {
        console.error('Error assigning daily tasks:', error);
        res.status(500).json({ error: 'Error assigning daily tasks' });
    }
};

const getDailyTasks = async (req, res) => {
    try {
        const userId = req.user.userId;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        console.log(today)
        const chores = await Chore.findAll({
            where: {
                userId: userId,
                createdAt: {
                    [Op.gte]: today 
                }
            },
            include: [
                {
                    model: Task,
                    as: 'task',
                    required: true
                }
            ]
        });

        if (chores.length > 0) {
            res.status(200).json({ 
                message: 'Daily tasks retrieved successfully', 
                chores: chores 
            });
        } else {
            res.status(200).json({ 
                message: 'No tasks assigned for today' 
            });
        }

    } catch (error) {
        console.error('Error retrieving daily tasks:', error);
        res.status(500).json({ error: 'Error retrieving daily tasks' });
    }
};

const getDailyAssignedTasks = async (req, res) => {
    try {
        const userId = req.user.userId;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        console.log(today)
        const chores = await Chore.findAll({
            where: {
                userId: userId,
                status: 'assigned',
                createdAt: {
                    [Op.gte]: today 
                }
            },
            include: [
                {
                    model: Task,
                    as: 'task',
                    required: true
                }
            ]
        });

        if (chores.length > 0) {
            res.status(200).json({ 
                message: 'Daily tasks retrieved successfully', 
                chores: chores 
            });
        } else {
            res.status(200).json({ 
                message: 'No tasks assigned for today' 
            });
        }

    } catch (error) {
        console.error('Error retrieving daily tasks:', error);
        res.status(500).json({ error: 'Error retrieving daily tasks' });
    }
};

const UpdateChore = async (req, res) => {
    const userId = req.user.userId; 
    const { id } = req.params;
    const { status } = req.body;
    const users = await User.findOne({ where: {id: userId } });
    try {
      if (users) {
        const chores = await Chore.findOne({ where: { id,userId } });
        if (chores) {
          await chores.update({ status });
          return res.status(200).json({ chores });
        } else {
          return res.status(404).json({ message: "Chore id does not exist" });
        }
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error finding Chore", error: error.message });
    }
  };

  const getDailyCompletedTasks = async (req, res) => {
    try {
        const userId = req.user.userId;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        console.log(today)
        const chores = await Chore.findAll({
            where: {
                userId: userId,
                status: 'completed',
                createdAt: {
                    [Op.gte]: today 
                }
            },
            include: [
                {
                    model: Task,
                    as: 'task',
                    required: true
                }
            ]
        });

        if (chores.length > 0) {
            res.status(200).json({ 
                message: 'Daily completed tasks retrieved successfully', 
                chores: chores 
            });
        } else {
            res.status(200).json({ 
                message: 'No tasks completed for today' 
            });
        }

    } catch (error) {
        console.error('Error retrieving daily completed tasks:', error);
        res.status(500).json({ error: 'Error retrieving completed daily tasks' });
    }
};





module.exports={
    assignDailyTasks,
    getDailyTasks,
    getDailyAssignedTasks,
    UpdateChore,
    getDailyCompletedTasks
}

