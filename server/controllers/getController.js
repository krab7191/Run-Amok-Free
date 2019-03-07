const db = require("../models");

const testDataSet = [{
    _id: "eifhw29ehf29dhf",
    isAvailable: true,
    timesTasted: 12,
    keywords: ['fresh', 'sparky', 'rejuvinating'],
    ratings: [3.9, 5.0],
    name: "Pollywog brown liquor",
    description: "One of the most popular drinks among gay hipsters in 2018",
    price: "5.50",
    size: '16',
    unit: 'oz',
    color: '#fefefe'
}];

// Functions for getting public data
module.exports = {
    test: (req, res) => {
        console.log(`${req.originalUrl}`);
        res.json({ drinks: testDataSet });
    }
};  