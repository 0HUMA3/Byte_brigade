//Requiring all important package .
const express = require('express');
const http = require("http");
const { Server } = require("socket.io");
const session = require('express-session');
const { complaint, register, resolve, patelmenu, tilakmenu, malviyamenu, tandonmenu, svbhmenu, newhostelmenu, djghmenu, knghmenu } = require("./mongodb");
const bodyParser = require('body-parser');

const app = express();

//Creating HTTP server .
const server = http.createServer(app);

//Inserting Socket package into server .
const io = new Server(server);

let socketConnected = new Set();

io.on("connection", (socket) => {
    socketConnected.add(socket.id);
    io.emit("online", socketConnected.size);
    socket.on("disconnect", () => {
        socketConnected.delete(socket.id);
        io.emit("online", socketConnected.size);
    });
    socket.on('message', (data) => {
        socket.broadcast.emit('chat-msg', data);
    });

    socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data);
    })
})

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./public"));
app.use(session({
    secret: "hello",
    resave: false,
    saveUninitialized: false
}));

const AdminProtected = (req, res, next) => {
    if (req.session.isAuth && req.session.user.role=='Mess-Admin') {
        next();
    } else {
        res.redirect('/');
    }
};

const UserProtected = (req ,res, next) => {
    if (req.session.isAuth && req.session.user.role === 'Student') {
        next();
    } else {
        res.redirect('/');
    }
};



// Creating route for login page .
app.get('/', function (req, res) {
    res.render("login");
});

// Creating route for signup page .
app.get('/signup', function (req, res) {
    res.render("signup");
});





// Creating route for chat page .
app.get("/chat",UserProtected, (req, res) => {
    res.render("chat", { name: req.session.user.name });
});

// Creating route for admin chat page .
app.get("/admin_chat",AdminProtected, (req, res) => {
    res.render("admin_chat", { name: req.session.user.name });
});


// Creating route for complaint page .
app.get('/complaint',UserProtected, function (req, res) {
    res.render("complaint", req.session.user);
});

//Creating Home route .
app.get('/home',UserProtected, function (req, res) {

    res.render('home', req.session.user);

});

// Creating route for admin dashboard page .
app.get('/admin_dashboard',AdminProtected, (req, res) => {

    res.render('admin_dashboard', req.session.user);


});

// Creating route for inprocess page .
app.get('/inprocess',UserProtected, async (req, res) => {
    try {
        const data = await complaint.find({});;
        res.render('inprocess', { name: req.session.user.name, record: data });
    } catch (err) {
        throw err;
    }
});

// Creating route for admin inprocess page .
app.get('/admin_inprocess',AdminProtected, async (req, res) => {
    try {
        const data = await complaint.find({});;
        res.render('admin_inprocess', { name: req.session.user.name, record: data });
    } catch (err) {
        throw err;
    }
});

// Creating route for resolve page .
app.get('/resolve',UserProtected, async (req, res) => {
    try {
        const data = await resolve.find({});
        res.render('resolve', { name: req.session.user.name, records: data });
    } catch (err) {
        throw err;
    }
});

// Creating route for admin resolve page .
app.get('/admin_resolve',AdminProtected, async (req, res) => {
    try {
        const data = await resolve.find({});
        res.render('admin_resolve', { name: req.session.user.name, records: data });
    } catch (err) {
        throw err;
    }
});

// Creating route for admin menu page .
app.get('/admin_menu',AdminProtected, function (req, res) {
    res.render('admin_menu', { name: req.session.user.name });
});

// Creating route for menu page .
app.get('/menu',UserProtected, async (req, res) => {
    //Creating condition for each hostel so that each hostel get their own mess menu.
    if (req.session.user.hostel === "Patel Hostel") {
        try {
            const data = await patelmenu.find({});
            res.render('menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
    else if (req.session.user.hostel === "Tilak Hostel") {
        try {
            const data = await tilakmenu.find({});
            res.render('menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
    else if (req.session.user.hostel === "Tandon Hostel") {
        try {
            const data = await tandonmenu.find({});
            res.render('menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
    else if (req.session.user.hostel === "Malviya Hostel") {
        try {
            const data = await malviyamenu.find({});
            res.render('menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
    else if (req.session.user.hostel === "SVBH Hostel") {
        try {
            const data = await svbhmenu.find({});
            res.render('menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
    else if (req.session.user.hostel === "New Boys Hostel") {
        try {
            const data = await newhostelmenu.find({});
            res.render('menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
    else if (req.session.user.hostel === "DJGH Hostel") {
        try {
            const data = await djghmenu.find({});
            res.render('menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
    else if (req.session.user.hostel === "KNGH Hostel") {
        try {
            const data = await knghmenu.find({});
            res.render('menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
});

// Creating route for admin mess menu page .
app.get('/admin_mess_menu',AdminProtected, async (req, res) => {
    if (req.session.user.hostel === "Patel Hostel") {
        try {
            const data = await patelmenu.find({});
            res.render('admin_mess_menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
    else if (req.session.user.hostel === "Tilak Hostel") {
        try {
            const data = await tilakmenu.find({});
            res.render('admin_mess_menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
    else if (req.session.user.hostel === "Tandon Hostel") {
        try {
            const data = await tandonmenu.find({});
            res.render('admin_mess_menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
    else if (req.session.user.hostel === "Malviya Hostel") {
        try {
            const data = await malviyamenu.find({});
            res.render('admin_mess_menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
    else if (req.session.user.hostel === "SVBH Hostel") {
        try {
            const data = await svbhmenu.find({});
            res.render('admin_mess_menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
    else if (req.session.user.hostel === "New Boys Hostel") {
        try {
            const data = await newhostelmenu.find({});
            res.render('admin_mess_menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
    else if (req.session.user.hostel === "DJGH Hostel") {
        try {
            const data = await djghmenu.find({});
            res.render('admin_mess_menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
    else if (req.session.user.hostel === "KNGH Hostel") {
        try {
            const data = await knghmenu.find({});
            res.render('admin_mess_menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
});

//Creating post route for login page .
app.post('/', async (req, res) => {
    try {
        const check = await register.findOne({ email: req.body.email }) //Check constant contain login info.
        req.session.isAuth = true;
        req.session.user = { name: check.username, email: check.email, hostel: check.hostel, role: check.role, fullname: check.fullname };
        if (check.password === req.body.password) {
            if (check.hostel === req.body.hostel) {
                if (check.role === req.body.role) {
                    if (check.role === "Mess-Admin") {
                        if (check.security === req.body.security) {
                            res.render("admin_dashboard", req.session.user);
                        }
                        else {
                            res.render('againlogin', { error: 'Security Key' })
                        }

                    }
                    else {
                        res.render("home", req.session.user);
                    }
                }
                else {
                    res.render("againlogin", { error: "Role" });
                }
            }
            else {
                res.render("againlogin", { error: "Hostel" });
            }
        }
        else {
            res.render("againlogin", { error: "Password" });
        }
    }
    catch {
        res.render("againlogin", { error: "Email" });
    }



});

// Creating post route for signup page .
app.post('/signup', async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        fullname: req.body.fullname,
        username: req.body.username,
        phone: req.body.phone,
        confirmpass: req.body.confirmpass,
        hostel: req.body.hostel
    }
    await register.insertMany([data]);  //Data inserted into database .
    req.session.user = { name: req.body.username, email: req.body.email, hostel: req.body.hostel, role: req.body.role, fullname: req.body.fullname }
    req.session.isAuth=true;
    res.render("home", req.session.user);

});

// Creating post route for complaint page .
app.post("/complaint", async (req, res) => {
    const complaintdata = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        like: 0,
        dislike: 0
    }
    await complaint.insertMany([complaintdata]); //Inserting complaint into database .
    try {
        const data = await complaint.find({});
        res.render('inprocess', { name: req.session.user.name, record: data });
    } catch (err) {
        throw err;
    }
});

// Creating post route for admin inprocess page .
app.post('/admin_inprocess', async (req, res) => {
    const findcomplaint = complaint.findOne({ title: req.body.title, description: req.body.description });
    const data = {
        title: req.body.title,
        description: req.body.description
    }
    await resolve.insertMany([data]);
    await complaint.deleteOne({ title: req.body.title, description: req.body.description });
    try {
        const data = await resolve.find({});
        if (req.session.user.role === "Student") {
            res.render('resolve', { name: req.session.user.name, records: data });
        }
        else {
            res.render('admin_resolve', { name: req.session.user.name, records: data });
        }
    } catch (err) {
        throw err;
    }
});

// Creating post route for admin menu edit page .
app.post('/admin_menu', async (req, res) => {
    const menuitem = {
        monday: {
            monbreak: req.body.monbreak,
            monlunch: req.body.monlunch,
            monsnack: req.body.monsnack,
            mondinner: req.body.mondinner
        },
        tuesday: {
            tuebreak: req.body.tuebreak,
            tuelunch: req.body.tuelunch,
            tuesnack: req.body.tuesnack,
            tuedinner: req.body.tuedinner
        },
        wednesday: {
            wedbreak: req.body.wedbreak,
            wedlunch: req.body.wedlunch,
            wedsnack: req.body.wedsnack,
            weddinner: req.body.weddinner
        },
        thursday: {
            thurbreak: req.body.thurbreak,
            thurlunch: req.body.thurlunch,
            thursnack: req.body.thursnack,
            thurdinner: req.body.thurdinner
        },
        friday: {
            fribreak: req.body.fribreak,
            frilunch: req.body.frilunch,
            frisnack: req.body.frisnack,
            fridinner: req.body.fridinner
        },
        saturday: {
            satbreak: req.body.satbreak,
            satlunch: req.body.satlunch,
            satsnack: req.body.satsnack,
            satdinner: req.body.satdinner
        },
        sunday: {
            sunbreak: req.body.sunbreak,
            sunlunch: req.body.sunlunch,
            sunsnack: req.body.sunsnack,
            sundinner: req.body.sundinner
        }
    }
    //Condition for inserting menu data for respective hostel database .
    if (req.session.user.hostel === "Patel Hostel") {
        await patelmenu.updateOne({ _id: '655468cc7bdaa226278cdf2c' }, { $set: menuitem });
        try {
            const data = await patelmenu.find({});
            res.render('admin_mess_menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
    else if (req.session.user.hostel === "Tilak Hostel") {
        await tilakmenu.updateOne({ _id: '6554907fd547788383f092eb' }, { $set: menuitem });
        try {
            const data = await tilakmenu.find({});
            res.render('admin_mess_menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
    else if (req.session.user.hostel === "Tandon Hostel") {
        await tandonmenu.updateOne({ _id: '655492ead547788383f092f6' }, { $set: menuitem });
        try {
            const data = await tandonmenu.find({});
            res.render('admin_mess_menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
    else if (req.session.user.hostel === "Malviya Hostel") {
        await malviyamenu.updateOne({ _id: '655492b3d547788383f092f3' }, { $set: menuitem });
        try {
            const data = await malviyamenu.find({});
            res.render('admin_mess_menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
    else if (req.session.user.hostel === "SVBH Hostel") {
        await svbhmenu.updateOne({ _id: '65549319d547788383f092f9' }, { $set: menuitem });
        try {
            const data = await svbhmenu.find({});
            res.render('admin_mess_menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
    else if (req.session.user.hostel === "New Boys Hostel") {
        await newhostelmenu.updateOne({ _id: '65549344d547788383f092fc' }, { $set: menuitem });
        try {
            const data = await newhostelmenu.find({});
            res.render('admin_mess_menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
    else if (req.session.user.hostel === "DJGH Hostel") {
        await djghmenu.updateOne({ _id: '6554936cd547788383f092ff' }, { $set: menuitem });
        try {
            const data = await djghmenu.find({});
            res.render('admin_mess_menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
    else if (req.session.user.hostel === "KNGH Hostel") {
        await knghmenu.updateOne({ _id: '65549390d547788383f09302' }, { $set: menuitem });
        try {
            const data = await knghmenu.find({});
            res.render('admin_mess_menu', { name: req.session.user.name, ele: data });
        } catch (err) {
            throw err;
        }
    }
});

app.post('/logout',(req,res)=>{
    req.session.isAuth = false;
    res.redirect('/');
})

//Creating server to listen port 3000 .
server.listen(3000, () => {
    console.log("Server is connected");
});