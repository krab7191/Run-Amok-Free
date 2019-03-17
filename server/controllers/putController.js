const db = require("../models");

// Define methods for UPDATING various data from the Users, Wines, etc collections
module.exports = {
    changeBeverage: function (req, res) {
        console.log(`Beverage change request incoming...`);
        res.json({ message: "Ok, received" });
    }

};

