const db = require("../models");

// Define methods for GETTING various data from the Users, Wines, etc collections
module.exports = {

    deleteBevById: function (req,res) {
        db.Beverages.deleteOne({
            _id: req.params.id
        })
        .then(resp => 
            res.json(resp.deletedCount)
        )
        .catch(err => 
            res.status(422).json(err)
        );
    }
};