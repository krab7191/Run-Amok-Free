import axios from "axios";

export default {
  getBevData: function () {
    return axios.get("/api/get/test");
  },
  addNoteData: function (noteData) {
    return axios.post("/api/post/note",noteData);
  },
};