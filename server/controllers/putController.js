const db = require('../models');

// Define methods for UPDATING various data from the Users, Wines, etc collections
module.exports = {
  changeBeverage(req, res) {
    console.log(`Beverage change request incoming...`);
    const { body } = req;
    const { _id } = body;
    // Remove the un-editable keys
    delete body.edited;
    delete body.dateCreated;
    delete body.dateUpdated;
    delete body._id;
    db.Beverages.findOneAndUpdate({ _id }, { $set: body }, { new: true })
      .then(resp => {
        const bev = { ...resp._doc };
        delete bev.notes;
        delete bev.__v;
        bev.message = 'Beverage updated successfully.';
        console.log(bev);
        // Return the updated Object to the frontend
        res.json(bev);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  },
};
