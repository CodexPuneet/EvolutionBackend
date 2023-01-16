const express = require('express')
const {connection} = require('./config/db')
const {userRouter}= require('./routes/user.routes')
const {postRouter}=require('./routes/post.routes');
const {authenticate}= require('./middleware/authenticate.middleware')


const app= express();
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Social Media")
})

app.use('/users', userRouter);
app.use(authenticate)
app.post('/post', postRouter)

app.listen(3100, async()=>{
    try {
        await connection;
        console.log("Connection Established");
    } catch (error) {
        console.log(error);
        console.log("Error while connecting to Database");        
    }
    console.log(`Running on port ${process.env.port}`)
})