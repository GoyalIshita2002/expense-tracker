const { Chore, Task, Reward  } = require('../../postgres/connection.js')
const { Op } = require('sequelize');

const badgeThresholds = [
    { points: 250, badge: 'Master' },
    { points: 200, badge: 'Gold' },
    { points: 150, badge: 'Silver' },
    { points: 100, badge: 'Bronze' },
    { points: 50, badge: 'Fresher' },
    { points: 10, badge: 'Starter' },
    {points: 0,badge: 'Newbie'}
];

const getBadgeThresholds = (req,res) => {
    return res.status(200).json({Badge:badgeThresholds});
};

const getBadgeForPoints = (points) => {
    for (let i = 0; i < badgeThresholds.length; i++) {
        if (points >= badgeThresholds[i].points) {
            return badgeThresholds[i].badge;
        }
    }
    return null;
};

const updateUserRewardStatus = async (req, res) => {
    try {
        const userId = req.user.userId;

        const chores = await Chore.findAll({
            where: {
                userId: userId,
                status: 'completed',
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

        const badge = getBadgeForPoints(totalPoints);

        let reward = await Reward.findOne({ where: { userId: userId } });
        if (reward) {
            reward.points = totalPoints;
            reward.badge = badge;
            await reward.save();
        } else {
            reward = await Reward.create({
                userId: userId,
                points: totalPoints,
                badge: badge
            });
        }

        const response = {
            message: 'User reward status updated successfully',
            totalPoints: totalPoints,
            badge: badge
        };

        res.status(200).json(response);

    } catch (error) {
        console.error('Error updating reward status:', error);
        res.status(500).json({ error: 'Error updating reward status' });
    }
};

module.exports = {
    updateUserRewardStatus,getBadgeThresholds
}