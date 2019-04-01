import axios from "axios";

export default {
  getAllBeverages: () => {
    return axios.get("/api/get/allBeverages");
  },
  getAvailBevData: () => {
    return axios.get("/api/get/bevs/avail");
  },
  getNoteData: userid => {
    return axios.get("/api/get/notes/" + userid);
  },
  addNoteData: noteData => {
    return axios.post("/api/post/note", noteData);
  },
  saveNewBeverage: bevObj => {
    return axios.post("/api/post/beverage", bevObj);
  },
  changeBeverage: bevObj => {
    return axios.put("/api/put/beverageChanges", bevObj);
  },
  deleteBeverage: (bevId) => {
    console.log(`Deleting beverage...`);
    return axios.delete("/api/delete/beverage/"+ bevId);
  },
  updateUserPermissions: userObj => {
    console.log("Sending user permissions changes");
    return axios.put("/api/put/user", userObj);
  },
  checkUsername: username => {
    return axios.post("/api/post/unameCheck", { username });
  },
  getValidTokens: () => {
    return axios.get("/api/get/tokens");
  }
};
