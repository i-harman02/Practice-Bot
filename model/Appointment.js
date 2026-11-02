const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({
    patientName : {
        type : String,
        required : [ true , "Patient Name Required"],
        trim: true,
        minlength : [ 2, "minimum 2 words require"],
        maxlength : [80 , "Name cannot exceed 80 characters"] 
    },
    phoneNumber : {
        type : String,
        required : [true , "Whatsapp Number required"],
        trim : true,
        match : [/^\+?[1-9]\d{7,14}$/ , "Use an international phone number, e.g. +919876543210"]
    },
    doctorID : {
        type : Number,
        required : [true , "Doctor ID is required"],
        min : 1,
    },
    doctorName : {
        type : String,
        required : true,
        trim : true
    },
    appointmentDate : {
        type : String,
        required : true,
        validate : {
            validator : function (value) {
                if(!/^\d{4}-\d{2}-\d{2}$/.test(value)){
                    return false ;
                }

                const date =  new Date(`${value}T00:00:00.000Z`);

                return (
                    !Number.isNaN(date.getTime()) &&
                    date.toISOString().slice(0, 10) === value
                )
            },
            message: "Use a real date in YYYY-MM-DD format"
        }
    },
    timeslot : {
        type : String,
        required : [true , "appointment time is required"],
        match : [  /^(?:[01]\d|2[0-3]):[0-5]\d$/ , "Use 24-hour format, for example 14:30" ]
    },
    status : {
        type : String,
        enum : [ "pending", "confirmed" , "cancelled" ],
        default : "pending"
    }
},
{ timestamps : true }
);

module.exports = mongoose.model( "Appointment" , AppointmentSchema );