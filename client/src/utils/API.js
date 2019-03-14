import axios from "axios";

export default {
  getBevData: () => {
    return axios.get('/api/get/bevs');
  },
  getAvailBevData: () => {
    return axios.get('/api/get/bevs/avail')
  },
  getNoteData: () => {
    return axios.get('/api/get/notes');
  },
  addNoteData: (noteData) => {
    console.log(noteData);
    return axios.post('/api/post/note',noteData);
  },
};