const mongo = require('mongoose')

let schema = mongo.Schema({
 name: String,
 img: String,
 price: Number,
 bg: String,
 quantity: Number,
 buyers:[{
   type: mongo.Schema.Types.ObjectId,
   ref: 'Users'
  }]
})

module.exports = mongo.model('Products', schema);