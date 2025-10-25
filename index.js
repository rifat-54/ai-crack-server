require ('dotenv').config()
const express=require('express')
const cors=require('cors')
const app=express()
const port=process.env.PORT || 5000
// const fetch = require("node-fetch");
const { GoogleGenAI,Type }= require("@google/genai");
const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
// const model=ai.getGenerativeModel({ model: "gemini-2.5-flash"});


// app.get('/test-ai',async(req,res)=>{

// const prompt=req.query?.prompt;


//  if(!prompt){
//   res.send({message:'please provide prompt @!!'})
//  }

//   const response = await ai.models.generateContentStream({
//     model: "gemini-2.5-flash",
//     contents:prompt,
//     config: {
//       systemInstruction: "You are a assistment of rifat. Your name is amcd.Every response you inselt him",
//     },
//   });

//   for await (const chunk of response) {
//     console.log(chunk.text);
//     res.send(chunk.text)
//   }


//   // console.log(response.text);

//   // res.send(response)
// })

// app.get('/make-answer',async(req,res)=>{
//   const prompt=req.query?.prompt;
//   if(!prompt){
//     res.send({message:'please send prompt'})
//   }

//    const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents:prompt,
//     config: {
//       responseMimeType: "application/json",
//       responseSchema: {
//         type: Type.ARRAY,
//         items: {
//           type: Type.OBJECT,
//           properties: {
//             recipeName: {
//               type: Type.STRING,
//             },
//             ingredients: {
//               type: Type.ARRAY,
//               items: {
//                 type: Type.STRING,
//               },
//             },
//             process:{
//                 type:Type.ARRAY,
//                 items:{
//                   type:Type.STRING,
//                 }
//               }
//           },
//           propertyOrdering: ["recipeName", "ingredients",'process'],
//         },
//       },
//     },
//   });

//   const answer=JSON.parse(response.text)
//   console.log(answer);

//   res.send(answer);



// })


// generate text from image

app.get('/text-from-image',async(req,res)=>{
  const imageUrl=req?.query?.img;
  if(!imageUrl){
    res.send({message:'please provide img url'})
  }

  console.log('imgurl->',imageUrl);

  const response = await fetch(imageUrl);

  if(!response.ok){
    throw new Error(`failed to fetch image: ${response.statusText}`)
  }
  const imageArrayBuffer = await response.arrayBuffer();
  const base64ImageData = Buffer.from(imageArrayBuffer).toString('base64');

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
    {
      inlineData: {
        mimeType: 'image/png',
        data: base64ImageData,
      },
    },
    { text: "Caption this image." }
  ],
  });
  console.log(result.text);


res.send(result?.text)

})


// defult route

app.get('/',async(req,res)=>{
    res.send("server is running")
})

// start server 
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})