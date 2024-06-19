const { Video } = require('../../postgres/connection.js')

const CreateVideo = async (req,res) =>{
    const { Badgename } = req.body;
    const userId = req.user.userId;
    try{
        const video = await Video.create({ userId:userId,Badgename: Badgename});
        return res.status(201).json(video);
    }catch(error){
      return res.status(500).json({ message: "Error fetching Video", error: error.message });
    }
}

const GetVideo = async (req,res) =>{
    const userId = req.user.userId;
    try{
        const video = await Video.findAll({ userId:userId});
        return res.status(201).json(video);
    }catch(error){
      return res.status(500).json({ message: "Error fetching Video", error: error.message });
    }
}

module.exports={
    CreateVideo ,GetVideo
}