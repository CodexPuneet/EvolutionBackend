const express = require('express')
const {postModel}= require('../model/post.model')
const {checkpost} = require('../middleware/post.middleware')


const postRouter = express.Router()




postRouter.get('/', async(req, res) =>{
    try {
        const post= await postModel.find()
        res.send(post)
    } catch (error) {
        console.log(error);
        console.log({"error":"Somthing went worong"});
    }
})

postRouter.post('/create',checkpost, async(req, res) =>{
    const payload=req.body;
    try {
        const postData= new postModel(payload)
        await postData.save();
        res.send("Post has been posted successfully")
    } catch (error) {
        console.log(error);
        console.log({"error":"Somthing went worong"});
    }
})

postRouter.patch('/update/:id', async(req, res) =>{
    const payload=req.body;
    const ID = req.params.id;
    const post=await postModel.findOne({"_id":ID})
    const userID=req.body.userID

    try {
        if(userID===post.userID)
        {
           await postModel.findByIdAndUpdate({_id: ID},payload);
           res.send("Post has been updated successfully")
        }else{
            res.send("This is not your post ")
        }
   
        
    } catch (error) {
        console.log(error);
        console.log({"error":"Somthing went worong"});
    }
})
postRouter.delete('/delete/:id', async(req, res) =>{
    const ID = req.params.id;
    const post=await postModel.findOne({"_id":ID})
    const userID=req.body.userID

    try {
        if(userID===post.userID)
        {
           await postModel.findByIdAndDelete({_id: ID});
           res.send("Post has been deleted successfully")
        }else{
            res.send("This is not your post ")
        }
   
        
    } catch (error) {
        console.log(error);
        console.log({"error":"Somthing went worong"});
    }
})

module.export={
    postRouter
}