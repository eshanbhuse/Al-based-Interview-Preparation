
require("dotenv").config()
const express = require("express")
const path = require("path")
const connectDB = require("./config/db")
const app = express()
const authRoutes = require("./routes/authRoutes")
const sessionRoutes = require("./routes/sessionRoutes")
const questionRoutes = require("./routes/questionRoutes")
const { protect } = require("./middlewares/authMiddleware")
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController")
const cors = require('cors');

const allowedOrigins = [
    'https://al-based-interview-preparation-frontend-71c1.onrender.com'             
];

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like Postman or server-to-server)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); // Allowed
        } else {
            callback(new Error('Not allowed by CORS')); // Blocked
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json())
connectDB()

app.use("/api/auth", authRoutes )
app.use("/api/sessions", sessionRoutes )
app.use("/api/questions", questionRoutes )
app.use("/api/ai/generate-questions",protect, generateInterviewQuestions )
app.use("/api/ai/generate-explanation",protect, generateConceptExplanation )


app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {}));

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>
    console.log(`Server is running on port ${PORT}`));

module.exports = app;