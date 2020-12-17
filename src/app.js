const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here
const isNullOrundefined=(value)=> value===null || value===undefined;
app.get("/mario",async (req,res)=>{
    res.send(await marioModel.find());
});
app.get("/mario/:id",async (req,res)=>{
    const id=req.params.id;
    try{
        res.send(await marioModel.findById(id));
    }catch(err){
        res.status(400).send({message: error.message});
    }
});
app.post("/mario",async (req,res)=>{
    const newMario=req.body;
    if(isNullOrundefined(newMario.name) || isNullOrundefined(newMario.weight))
    {
        res.status(400).send({message: 'either name or weight is missing'});
    }
    else
    {
        const newMarioData=new marioModel(newMario);
        await newMarioData.save();
        res.status(201).send(newMarioData);
    }
});
app.patch("/mario/:id",async (req,res)=>{
    const id=req.params.id;
    const newMario=req.body;
    try{
        const existingData=await marioModel.findById(id);
        if(isNullOrundefined(newMario.name) && isNullOrundefined(newMario.weight)){
            res.status(400).send({message: error.message});
        }
        else
        {
            if(!isNullOrundefined(newMario.name))
            {
                existingData.name=newMario.name;
            }
            if(!isNullOrundefined(newMario.weight))
            {
                existingData.weight=newMario.weight;
            }
            await existingData.save();
            res.send(existingData);
        }
    }catch(err){
        res.status(400).send({message: error.message});
    }
});

app.delete("/mario/:id",async (req,res)=>{
    const id=req.params.id;
    try{
        await marioModel.findById(id);
        await marioModel.deleteOne({_id:id});
        res.status(200).send({message: 'character deleted'});
    }catch(err){
        res.status(400).send({message: error.message});
    }

});


module.exports = app;