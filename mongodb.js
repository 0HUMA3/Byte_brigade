const mongoose = require("mongoose");
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect database");
})

const loginSchema= mongoose.Schema({
    email : {
        type:String,
        required:true,
        unique:true
    },
    password :{
        type:String,
        required:true
    },
    role :{
        type:String,
        required:true
    },
    fullname: {
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    confirmpass:{
        type:String,
        required:true
    },
    hostel:{
        type:String,
        required:true
    },
    security:String
});
const complaintSchema=mongoose.Schema({
    title:String,
    description:String,
    image:String,
    like:Number,
    dislike:Number
});
const resolveSchema=mongoose.Schema({
    title:String,
    description:String
});

const menuSchema=mongoose.Schema({
    monday:{
        monbreak:String,
        monlunch:String,
        monsnack:String,
        mondinner:String
    },
    tuesday:{
        tuebreak:String,
        tuelunch:String,
        tuesnack:String,
        tuedinner:String
    },
    wednesday:{
        wedbreak:String,
        wedlunch:String,
        wedsnack:String,
        weddinner:String
    },
    thursday:{
        thurbreak:String,
        thurlunch:String,
        thursnack:String,
        thurdinner:String
    },
    friday:{
        fribreak:String,
        frilunch:String,
        frisnack:String,
        fridinner:String
    },
    saturday:{
        satbreak:String,
        satlunch:String,
        satsnack:String,
        satdinner:String
    },
    sunday:{
        sunbreak:String,
        sunlunch:String,
        sunsnack:String,
        sundinner:String
    }
});

const resolve=mongoose.model("collection3",resolveSchema);

const complaint=mongoose.model("collection2",complaintSchema);

const register=mongoose.model("Collection1",loginSchema);

const patelmenu=mongoose.model("collection4",menuSchema);

const tilakmenu=mongoose.model("collection5",menuSchema);

const malviyamenu=mongoose.model("collection6",menuSchema);

const tandonmenu=mongoose.model("collection7",menuSchema);

const svbhmenu=mongoose.model("collection8",menuSchema);

const newhostelmenu=mongoose.model("collection9",menuSchema);

const djghmenu=mongoose.model("collection10",menuSchema);

const knghmenu=mongoose.model("collection11",menuSchema);

module.exports={complaint,register,resolve,patelmenu,tilakmenu,malviyamenu,tandonmenu,svbhmenu,newhostelmenu,djghmenu,knghmenu};
