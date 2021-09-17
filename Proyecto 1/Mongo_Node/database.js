const mongoose = require('mongoose');

// mongoose.connect('mongodb://softwareA:EstoSeVaADescontrolar!@34.134.68.224:27017/sa-database?authSource=admin',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(db => console.log('Database is Connected'))
// .catch(err => console.log(err));

// mongodb+srv://IoTUser_Arqui:<password>@cluster0.hbumd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect('mongodb+srv://IoTUser_Arqui:fuckingpassword@cluster0.hbumd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log('Database is Connected'))
.catch(err => console.log(err));