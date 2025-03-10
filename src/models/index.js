const mongo = require('mongoose')

mongo.connect('mongodb+srv://jblhbk629:IIBGIS1PGIejX39j@cookroko.yo8ns.mongodb.net/?retryWrites=true&w=majority&appName=cookroko')
.then(()=> console.log('mongoDB connected'))
.catch((err)=> console.log(err.message));

let schema = mongo.Schema({
 name: String,
 password: String,
 bought: [{
  type: mongo.Schema.Types.ObjectId,
  ref: 'Products'
 }]
})

module.exports = mongo.model('Users', schema)