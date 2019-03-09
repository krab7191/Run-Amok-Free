const db = require("../models");


const testDataSet = [
    {
        _id: "eifhw29ehf29dhf",
        dateCreated: '2019-03-08T18:12:19.892Z',
        dateModified: '2019-03-08T18:14:03.310Z',
        isAvailable: true,
        name: "PEACH",
        description: "This is our first peach recipe with cinnamon",
        notes: [
            "Sweet!",
            "This is gross!"
        ]
    },
    {
        _id: ";odjfwp99u32cdj",
        dateCreated: '2019-03-08T18:19:48.186Z',
        dateModified: '2019-03-08T18:19:48.186Z',
        isAvailable: false,
        name: "Apple spiced",
        description: "Our try at a thanksgiving mead",
        notes: [
        ]
    }
];

// Functions for getting public data
module.exports = {
    test: (req, res) => {
        console.log(`${req.originalUrl}`);
        res.json({ drinks: testDataSet });
    }
};  