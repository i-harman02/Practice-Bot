const doctors = require("../data/Data.js");
const appointmentTable = require("../model/Appointment.js");

const mediciens = [
    {
        "id": 1,
        "name": "Paracetamol",
        "price": 20,
        "available": true
    },
    {
        "id": 2,
        "name": "Vitamin C",
        "price": 50,
        "available": false
    }
]

const getMediciens = (req, res) => {
    res.json({
        "success" : true,
        "totalmediciens" : mediciens.length,
        mediciens,
    });

}

const makeAppointment = async (req, res) => {   
    try {
        const { patientName , phoneNumber , doctorName , doctorID , appointmentDate , timeslot} = req.body || {} ;

        const doctor = doctors.find(item => item.id === Number(doctorID));

        if(!doctor){
            return res.status(400).json({message : "doctor id not valid "})
        }
        

        const createAppointment = await appointmentTable.create({
            patientName , 
            phoneNumber , 
            doctorName : doctor.name ,
            doctorID : doctor.id , 
            appointmentDate , 
            timeslot , 
        })
        return res.status(201).json({
            message : "Appointment request saved. The clinic must confirm the time.",
            createAppointment,
        });

    } catch (error) {

        return res.status(400).json({meassage : `error come in create appointment ${error}`});
        
    }
}


module.exports = {getMediciens , makeAppointment};