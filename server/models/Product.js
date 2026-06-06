// server/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  farmer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true // Inventory tracking (e.g., in Kgs)
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Vegetables', 'Fruits', 'Grains', 'Dairy', 'Other'], // Matches our frontend categories
    default: 'Vegetables'
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('Product', productSchema);