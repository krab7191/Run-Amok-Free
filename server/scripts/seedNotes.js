const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/runAmok", {
  useNewUrlParser: true
});

let userIds = [];
let bevNames = [];

const noteBodies = [
  {
    body: "I think this one is too tart. It won't appeal to many people"
  },
  {
    body:
      "This one is way too sweet. We should use more chicken stock in the next batch"
  },
  {
    body: "Perfect this one will be an instant hit."
  }
];

getUserIds = () => {
  db.Users.find({})
    .select("_id")
    .then(resp => {
      userIds = resp;
      console.log("Got user ids");
      getBeverageNames();
    })
    .catch(err => {
      console.log(err);
    });
};

getBeverageNames = () => {
  db.Beverages.find({})
    .select("name")
    .then(resp => {
      bevNames = resp;
      console.log("Got bev Names");
      seedNotes();
    })
    .catch(err => {
      console.log(err);
    });
};

seedNotes = () => {
  let nts = [];
  noteBodies.forEach((n, i) => {
    let note = {
      body: n.body,
      user: userIds[i]._id,
      beverages: bevNames[i].name
    };
    nts.push(note);
  });
  db.Notes.insertMany(nts)
    .then(resp => {
      console.log("Notes created");
      process.exit(0);
    })
    .catch(err => {
      console.log(err);
      process.exit(0);
    });
};

getUserIds();
