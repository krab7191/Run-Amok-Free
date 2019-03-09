// @author Karsten Rabe

// Seed our dev DB with some beverage data

const mongoose = require("mongoose");
const db = require("../models");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/runAmok", { useNewUrlParser: true });
const d = new Date();

const bevSeeds = [
    {
        name: "Peach Mead",
        description: "Our first attempt at a peach mead. Very Tart and fruity.",
        isAvailable: false,
        dateCreated: d
    },
    {
        name: "Standard Honey Mead",
        description: "Typical honey mead, made with local honey.",
        isAvailable: true,
        dateCreated: d
    },
    {
        name: "Andy's Ginger Mead",
        description: "13 pounds of fresh ginger per batch",
        isAvailable: true,
        dateCreated: d
    }
]

console.log(`Seeding beverage data...`);
db.Beverages.insertMany(bevSeeds).then(resp => {
    console.log(resp);
    console.log(`Bevs seeded!`);
    process.exit(0);
}).catch(err => { console.log(err); process.exit(0); })