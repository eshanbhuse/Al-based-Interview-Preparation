
require("dotenv").config()
const express = require("express")
const path = require("path")
const cors = require("cors")
const connectDB = require("./config/db")
const app = express()
const authRoutes = require("./routes/authRoutes")
const sessionRoutes = require("./routes/sessionRoutes")
const questionRoutes = require("./routes/questionRoutes")
const { protect } = require("./middlewares/authMiddleware")
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController")
const cors = require('cors');

app.use(
     cors({
         origin: process.env.CLIENT_URL ||"*",
         methods:["GET","POST","PUT","DELETE"],
         allowedHeaders:["Content-Type","Authorization"],
     })
 );

connectDB()
app.use(express.json())

app.use("/api/auth", authRoutes )
app.use("/api/sessions", sessionRoutes )
app.use("/api/questions", questionRoutes )
app.use("/api/ai/generate-questions",protect, generateInterviewQuestions )
app.use("/api/ai/generate-explanation",protect, generateConceptExplanation )


app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {}));

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>
    console.log(`Server is running on port ${PORT}`));

