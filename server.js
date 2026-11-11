require("dotenv").config();
const express = require("express");
const dns = require('node:dns'); 
const mongoose = require("mongoose");
const medicienRouter = require("./routes/Routes.js");


const app = express();
dns.setServers(['1.1.1.1', '8.8.8.8']);

app.use(express.json());
const PORT = process.env.PORT || 6060;

app.get("/api/doctors", (req, res) => {
    res.json({
    "success": true,
    "totalDoctors": 2,
    "doctors": [
        {
            "id": 1,
            "name": "Dr. Sharma",
            "specialization": "General Physician"
        },
        {
            "id": 2,
            "name": "Dr. Verma",
            "specialization": "Dentist"
        }
    ]
})
});

app.use("/", medicienRouter);
app.use("/createappointment" , medicienRouter);


const connectDB = async() => {
    if(!process.env.MONGOOSE_URI){
        console.log("database string not present in .env");       
    }

    try {
        await mongoose.connect(process.env.MONGOOSE_URI);
        console.log("Mongodb connected");

        app.listen(PORT , () => {
            console.log(`Server running on http://localhost:${PORT}`)
        });

    } catch (error) {
        console.log(`database not connected ${error}`);        
    }

}

connectDB();

