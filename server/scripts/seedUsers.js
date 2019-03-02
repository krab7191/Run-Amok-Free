const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/genericTasting", { useNewUrlParser: true });

const userSeeds = [
    {
        firstName: "Karsten",
        lastName: "Rabe",
        email: "karstenrabe91@gmail.com",
        username: "krab7191",
        isAdmin: true,
        password: "$2b$10$6b4OvKXlYIziKuk8ofK7Ne27VmJ2ct1RuMVADnQlwXarhbKIdbTLS",
        notes: []
    },
    {
        firstName: "Jon",
        lastName: "Jackson",
        email: "ocskier@gmail.com",
        username: "ocskier",
        isAdmin: true,
        password: "$2b$10$6b4OvKXlYIziKuk8ofK7Ne27VmJ2ct1RuMVADnQlwXarhbKIdbTLS",
        notes: []
    },
    {
        firstName: "Calvin",
        lastName: "Leung",
        email: "calvinleung0@gmail.com",
        username: "cleung",
        isAdmin: true,
        password: "$2b$10$6b4OvKXlYIziKuk8ofK7Ne27VmJ2ct1RuMVADnQlwXarhbKIdbTLS",
        notes: []
    }
];

db.Users.insertMany(userSeeds).then(resp => {
    console.log(resp);
    process.exit(0);
}).catch(err => { console.log(err); process.exit(0); });