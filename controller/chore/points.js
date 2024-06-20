const { Chore, Task, User } = require('../../postgres/connection.js')

const UserTasksAndPoints = async (req, res) => {
    try {
        const userId = req.user.userId;
        const users = User.findOne({where:{id:userId}})
        if(users){
            const chores = await Chore.findAll({
                where: {
                    userId: userId,
                    status: 'assigned',
                }
            });
    
            const taskIds = chores.map(chore => chore.taskId);
    
            const tasks = await Task.findAll({
                where: {
                    id: taskIds
                },
                attributes: ['id', 'title', 'description', 'points'] 
            });
    
            const totalPoints = tasks.reduce((sum, task) => sum + task.points, 0);
    
            const response = {
                message: chores.length > 0 ? 'Tasks and points retrieved successfully' : 'No tasks assigned for today',
                tasks: tasks.map(task => ({
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    points: task.points
                })),
                totalPoints: totalPoints
            };
    
           return res.status(200).json(response);
        }
        else{
            return res.status(404).json({message: "user do not exist"}); 
        }

    } catch (error) {
        console.error('Error retrieving tasks and points:', error);
        res.status(500).json({ error: 'Error retrieving tasks and points' });
    }
};

module.exports={
    UserTasksAndPoints
}