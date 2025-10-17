require ('dotenv').config()
const express=require('express')
const cors=require('cors')
const app=express()
const port=process.env.PORT || 5000
const { GoogleGenAI }= require("@google/genai");
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);
// const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

app.get('/test-ai',async(req,res)=>{
//  const prompt="explain how ai work"
//  const result=await model.generateContent(prompt)
//  console.log(result);

const prompt=req.query?.prompt;


  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:prompt,
  });
  console.log(response.text);

  res.send(response)
})



// defult route

app.get('/',async(req,res)=>{
    res.send("server is running")
})

// start server 
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})