const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/genericTasting", { useNewUrlParser: true });

const teamSeeds = [
    {
        teamName: "Amalgam",
        members: []
    },
    {
        teamName: "Starrlight",
        members: []
    }
];

db.Teams.insertMany(teamSeeds).then(resp => {
    console.log(resp);
    process.exit(0);
}).catch(err => { console.log(err); process.exit(0); });