const mongoose = require("mongoose");

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL,{})
//         console.log("MongoDB connected successfully");
//     } catch (err) {
//         console.error("MongoDB connection failed:",err);
//         process.exit(1);
//     }
// };


let isConnected = false; // Track the connection status

// async function connectDB() {
//     try{
//         await mongoose.connect(process.env.MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         isConnected = true;
//         console.log("MongoDB connected successfully");

//     }
//     catch(err){
//         console.error("MongoDB connection failed:", err);
//     }
// }

async function connectDB() {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL);
    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    throw err;
  }
}

module.exports = connectDB;