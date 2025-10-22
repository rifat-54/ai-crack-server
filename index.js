require ('dotenv').config()
const express=require('express')
const cors=require('cors')
const app=express()
const port=process.env.PORT || 5000
const { GoogleGenAI,Type }= require("@google/genai");
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);


app.get('/test-ai',async(req,res)=>{

const prompt=req.query?.prompt;


 if(!prompt){
  res.send({message:'please provide prompt @!!'})
 }

  const response = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents:prompt,
    config: {
      systemInstruction: "You are a assistment of rifat. Your name is amcd.Every response you inselt him",
    },
  });

  for await (const chunk of response) {
    console.log(chunk.text);
    res.send(chunk.text)
  }


  // console.log(response.text);

  // res.send(response)
})

app.get('/make-answer',async(req,res)=>{
  const prompt=req.query?.prompt;
  if(!prompt){
    res.send({message:'please send prompt'})
  }

   const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            recipeName: {
              type: Type.STRING,
            },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
            process:{
                type:Type.ARRAY,
                items:{
                  type:Type.STRING,
                }
              }
          },
          propertyOrdering: ["recipeName", "ingredients",'process'],
        },
      },
    },
  });

  const answer=JSON.parse(response.text)
  console.log(answer);

  res.send(answer);



})


// generate text from image

app.get('/text-from-image',async(req,res)=>{
  const imgurl=req.query.img;
  if(!imgurl){
    res.send({message:'please provide img url'})
  }

 
  // fatch image and convert  base64

  const response=await fetch(imgurl);
  const buffer=await response.arrayBuffer();
  const base64Image=Buffer.from(buffer).toString("base64")

   const image={
    inlineData:{
      data:base64Image,
      mimeType:'image/jpeg'
    }
   }
   const prompt='Extract all text from this image'
   const result=await 
})


// defult route

app.get('/',async(req,res)=>{
    res.send("server is running")
})

// start server 
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})