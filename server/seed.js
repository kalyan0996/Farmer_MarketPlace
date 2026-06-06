// server/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');

// Load environment variables from .env file
dotenv.config();

// Use the local URI fallback if process.env.MONGO_URI isn't picked up
const DB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/farmers_market';

const dummyProducts = [
  // Vegetables Category
  { name: 'Organic Tomatoes', description: 'Fresh, juicy vine-ripened local red tomatoes.', price: 40, quantity: 150, category: 'Vegetables' },
  { name: 'Fresh Spinach', description: 'Crisp, nutrient-dense green spinach bunches.', price: 30, quantity: 80, category: 'Vegetables' },
  { name: 'Local Potatoes', description: 'Fresh earth baking potatoes harvested directly from soil fields.', price: 25, quantity: 500, category: 'Vegetables' },
  { name: 'Cauliflower', description: 'Flawless farm-fresh organic white cauliflower heads.', price: 45, quantity: 120, category: 'Vegetables' },
  { name: 'Green Chillies', description: 'Spicy, pungent fresh green chillies with rich flavor.', price: 60, quantity: 70, category: 'Vegetables' },
  
  // Fruits Category
  { name: 'Alfonso Mangoes', description: 'Sweet, juicy premium naturally ripened seasonal mangoes.', price: 160, quantity: 60, category: 'Fruits' },
  { name: 'Red Apples', description: 'Crisp and highly delicious organic red hill orchard apples.', price: 120, quantity: 100, category: 'Fruits' },
  { name: 'Cavendish Bananas', description: 'Perfect yellow high-energy premium farm banana dozens.', price: 50, quantity: 200, category: 'Fruits' },
  { name: 'Fresh Strawberries', description: 'Plump and sweet hand-picked crimson backyard strawberries.', price: 220, quantity: 40, category: 'Fruits' },
  
  // Grains Category
  { name: 'Whole Wheat Atta', description: '100% stone-ground unrefined whole grain wheat flour.', price: 42, quantity: 600, category: 'Grains' },
  { name: 'Basmati Rice', description: 'Aromatic, long-grain premium aged raw basmati rice.', price: 95, quantity: 1000, category: 'Grains' },
  { name: 'Organic Moong Dal', description: 'High-protein unpolished native split yellow lentils.', price: 110, quantity: 250, category: 'Grains' },
  
  // Dairy Category
  { name: 'Fresh Paneer', description: 'Incredibly soft cottage cheese blocks processed from pure farm milk.', price: 320, quantity: 50, category: 'Dairy' },
  { name: 'Pure Cow Ghee', description: 'Rich, clarified butter made from native dairy cattle cream.', price: 680, quantity: 35, category: 'Dairy' },
  { name: 'Farm Fresh Eggs', description: 'Organic healthy brown eggs safely sorted by the dozen.', price: 85, quantity: 90, category: 'Dairy' }
];
const seedDB = async () => {
  try {
    console.log(`Connecting to database at: ${DB_URI}...`);
    await mongoose.connect(DB_URI);
    console.log("Connected to database successfully!");

    // 1. Clear out any preexisting records to prevent duplicates
    await Product.deleteMany({});
    console.log("Cleared old product listings.");
    
    // 2. Locate or create a placeholder farmer account to reference
    let farmer = await User.findOne({ role: 'farmer' });
    if (!farmer) {
      farmer = await User.create({
        name: "Satish Kumar",
        email: "farmer_satish@market.com",
        password: "password123", // Automatically gets hashed via User schema pre-save hook
        role: "farmer"
      });
      console.log("Created a fallback farmer profile: Satish Kumar");
    }

    // 3. Link each product listing to our farmer's distinct ObjectId
    const sampleListings = dummyProducts.map(item => ({ 
      ...item, 
      farmer: farmer._id 
    }));
    
    // 4. Batch insert into the collection
    await Product.insertMany(sampleListings);
    console.log("🌱 Database successfully seeded with categorized farm products!");
    
    // Gracefully shutdown script connection
    process.exit(0);
  } catch (err) {
    console.error("❌ Critical seeding error occurred:", err);
    process.exit(1);
  }
};

seedDB();