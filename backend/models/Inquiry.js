const mongoose = require("mongoose");
const inquirySchema = new mongoose.Schema(
{
    customerName:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    },

    email:String,

    eventType:{
        type:String,
        required:true
    },

    eventDate:{
        type:Date,
        required:true
    },

    venue:{
        type:String,
        required:true
    },

    design:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Design",
        default:null
    },

    message:String,

    status:{
        type:String,
        enum:[
            "New",
            "Contacted",
            "Booked",
            "Completed",
            "Cancelled"
        ],
        default:"New"
    }

},
{
    timestamps:true
});

module.exports = mongoose.model(
    "Inquiry",
    inquirySchema
);