import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import chatbotRoutes from "./routes/chatbotRoutes.js";
import summarizeRoutes from "./routes/SummarizeRoutes.js";
import reportRoutes from "./routes/ReportRoutes.js";
import uploadRoute from "./routes/Upload.js";
import multimodalRoute from "./routes/multimodal.js";
import userRoutes from "./routes/userRoute.js"; 


const app = express()
const port = process.env.PORT || 4000
connectDB()

//middlewares
app.use(express.json())
//app.use(cors())
// ✅ Enable CORS for frontend
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  methods: ["GET", "POST"],
}));


//api endpoints
app.use("/api/users", userRoutes);
// Chatbot API
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/patients", summarizeRoutes);
app.use("/api/reports", reportRoutes);
//app.use("/api", uploadRoute);
//app.use("/api", audioRoute);
app.use("/api", multimodalRoute);

app.get('/',(req,res)=>{
    res.send('API Working')
})

app.listen(port,()=>{
    console.log("Server Started",port)
})