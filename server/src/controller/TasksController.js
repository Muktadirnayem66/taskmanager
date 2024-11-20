import { TasksModel } from "../models/TasksModel.js";


export const createTask = async (req, res)=>{
    try {
        let reqbody = req.body
        const email = req.headers['email'];
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "user not authenticated",
            });
        }

        const postBody = {
            ...reqbody,
            email
        }
      
        const task = await TasksModel.create(postBody)
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            task
        });
        
    } catch (err) {
        console.error("Error during user login: ", err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
}


export const deleteTask = async (req, res)=>{
    try {
        const {id} = req.params
        const result = await TasksModel.deleteOne({_id:id})
        if(result.deletedCount === 0){
            return res.status(400).json({success:false,  message: "task not found"})
        }
        res.status(201).json({
            success: true,
            message: "task deleted successfully"
           
        });
        
    } catch (err) {
        console.error("Error during user login: ", err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
}


export const updateTaskStatus = async(req, res)=>{
    try {
        const { id } = req.params;
        const { status } = req.params;
        
        let query = { _id: id };
        let reqBody = { status: status };
        
        
        const result = await TasksModel.findByIdAndUpdate(query, reqBody, { new: true });
        
        if (result) {
            res.status(200).json({ status: "success", data: result });
        } else {
            res.status(404).json({ status: "error", message: "Task not found" });
        }
        
    } catch (err) {
        console.error("Error during task update: ", err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
}


export const listTaskByStatus = async (req, res)=>{

    try {
        let status = req.params.status
        let email = req.headers['email']

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "user not authenticated",
            });
        }

        const result = await TasksModel.aggregate([
            {$match:{status:status, email:email}},
            {$project:{
                _id:1, title:1, description:1, status:1,
                createdDate:{
                    $dateToString:{
                        date:"$createdDate",
                        format:"%d-%m-%Y"
                    }
                }
            }}
        ])

        res.status(200).json({
            success: true,
            message: "Tasks retrieved successfully",
            data: result,
        });
        
    } catch (err) {
        console.error("Error during task update: ", err);
        res.status(500).json({ status: "error", message: "Internal server error" }); 
    }

}

export const taskStatusCount = async(req, res)=>{

    try {
        const email = req.headers['email']
        const result = await TasksModel.aggregate([
            {$match:{email:email}},
            {$group:{_id:"$status", sum:{$count:{}}}}
        ])
        res.status(200).json({
            success: true,
            message: "Tasks count successfully",
            data: result,
        });

        
    } catch (err) {
        console.error("Error during task update: ", err);
        res.status(500).json({ status: "error", message: "Internal server error" }); 
    }

}