import mongoose from "mongoose";

mongoose.set('strictQuery', false); // agar kuch galat send kiya to na fatne ke liye 

const connectionToDB = async () => {
    try {
        const { connection } = await mongoose.connect(
            process.env.MONGO_URI || `mongodb://127.0.0.1:27017/studiobook`
        );
    
        if(connection) {
            console.log(`Connected to MogoDB: ${connection.host} `);
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
  
}

export default connectionToDB;