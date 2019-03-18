import axios from "axios";

export default {
  getAllBeverages: () => {
    return axios.get('/api/get/allBeverages');
  },
  getAvailBevData: () => {
    return axios.get('/api/get/bevs/avail')
  },
  getNoteData: () => {
    return axios.get('/api/get/notes');
  },
  addNoteData: (noteData) => {
    console.log(noteData);
    return axios.post('/api/post/note', noteData);
  },
  changeBeverage: bevObj => {
    console.log(`Sending beverage changes...`);
    return axios.put('/api/put/beverageChanges', bevObj);
  }
};