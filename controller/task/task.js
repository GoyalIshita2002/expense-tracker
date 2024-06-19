const { Task } = require('../../postgres/connection.js')


const CreateTask = async (req, res) => {
    const { title,description,points } = req.body;
    try {
      const Tasks = await Task.create({  title,description,points });
      return res.status(201).json({ Task: Tasks });
    } catch (error) {
      return res.status(500).json({ message: "Error creating Task", error: error.message });
    }
  };

  const ShowTask = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        return res.status(200).json({ Tasks: tasks });
     
    } catch (error) {
      return res.status(500).json({ message: "Error finding tasks", error: error.message });
    }
  };
  

  const DeleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({ where: { id} });
      if(task){ 
          await task.destroy(); 
          return res.status(200).json({ message: "Task deleted successfully" }); 
      }
      else{
        return res.status(404).json({ message: "Task do not exist" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error deleting task", error: error.message });
    }
  };
  
  

  module.exports = {
    DeleteTask,
    ShowTask,
    CreateTask
  }