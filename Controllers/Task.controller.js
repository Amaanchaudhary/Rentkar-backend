import TaskModal from "../Modals/Task.modal.js"

export const getAllTask = async (req , res) => {
    try{
      const tasks = await TaskModal.find({}).select("-createdAt -updatedAt -__v")
      console.log(tasks)

      if(tasks.length){
        return res.status(200).json({success : true , message : "tasks found" , tasks})
      }

      return res.status(404).json({ sucess: false, message: "Task Not Found!" })

    }catch(error){
        return res.status(500).json({success : false , message : error})
    }
}

export const addTask = async (req , res) => {
    try{
       const {name , desc } = req.body.data

       if(!name || !desc) return res.status(401).json({success : false , message : "All fields are mandatory"})

       const task = new TaskModal({
          name , desc
       })

       await task.save();

       const allTasks = await TaskModal.find({}).select("-createdAt -updatedAt -__v")

       return res.status(201).json({success : true , message : "Task added" , allTasks })

    }catch(error){
        return res.status(500).json({success : false , message : error})
    }
}


export const deleteTask = async (req , res) => {
    try {
        const { id } = req.query
        // console.log(id)
        if (!id) return res.status(404).json({ success: false, message: "task not Found" })
        await TaskModal.findByIdAndDelete(id)

        const updatedTasks = await TaskModal.find({}).select("-createdAt -updatedAt -__v")
        // console.log(updatedTasks)

        return res.status(200).json({ success: true, message: "Task Deleted" , updatedTasks})
    }
    catch (error) {
        return res.status(500).json({success : false , message : error})
    }
}

export const completedTask = async (req, res) => {
    try{
      const {id} = req.query

      if(!id) return res.status(401).json({success : false , message : "Id not found"})

      await TaskModal.findByIdAndUpdate(id , {completed : true})

      const taskCompleted = await TaskModal.find({}).select("-createdAt -updatedAt -__v");

      console.log(taskCompleted)

      return res.status(200).json({success : true , message : "Task Completed" , taskCompleted})

    }catch(error){
        return res.status(500).json({success : false , message : error})
    }
}