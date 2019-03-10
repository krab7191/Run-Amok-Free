import axios from "axios";

export default {
  getBevData: function () {
    return axios.get('/api/get/bevs');
  },
  getNoteData: function () {
    return axios.get('/api/get/notes');
  },
  addNoteData: function (noteData) {
    console.log(noteData);
    return axios.post('/api/post/note',noteData);
  },
};