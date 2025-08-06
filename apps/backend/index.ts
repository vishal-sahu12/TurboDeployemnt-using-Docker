import express from "express";
import { User } from "db/db";


const app = express();

app.use(express.json());

app.get("/users",async(req,res) =>{
  try{
    const users = await User.find({}).populate('todos');
    res.json(users);
  } catch(error){
    res.status(500).json({
        error:"Error fetching users",
        details:error
    })
  }

});


app.post("/users", async(req,res) =>{
const {name,age,email} = req.body;

try{
    const newUser = new User({name,age,email,todos:[]});
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
} catch(error){
    res.status(400).json({
        error:"Error creating user",
        details:error
    })
}
})



app.listen(3001,()=>{
    console.log("Server is running on Port 3001");
});