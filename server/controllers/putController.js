const db = require("../models");

// Define methods for UPDATING various data from the Users, Wines, etc collections
module.exports = {
  changeBeverage(req, res) {
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
        bev.message = "Beverage updated successfully.";
        // Return the updated Object to the frontend
        res.json(bev);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  },
  updateUser(req, res) {
    const { _id, isAdmin } = req.body;
    db.Users.findOneAndUpdate(
      { _id },
      { $set: { isAdmin: isAdmin } },
      { new: true }
    )
      .then(resp => {
        const user = { ...resp._doc };
        delete user.notes;
        delete user.password;
        delete user.__v;
        res.json(user);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  }
};
