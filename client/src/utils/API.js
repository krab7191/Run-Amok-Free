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
  changeBeverage: bevObj => {
    console.log(`Sending beverage changes...`);
    return axios.put("/api/put/beverageChanges", bevObj);
  },
  updateUserPermissions: userObj => {
    console.log("Sending user permissions changes");
    return axios.put("/api/put/user", userObj);
  },
  checkUsername: username => {
    return axios.post("/api/post/unameCheck", { username });
  }
};
