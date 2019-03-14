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
  registerUser: (userData) => {
    return axios.post('/auth/post/user',userData);
  },
  logInUser: (userData) => {
    return axios.get('/auth/get/user/'+userData);
  }
};