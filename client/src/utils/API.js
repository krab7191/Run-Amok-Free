import axios from "axios";

export default {
  getBevData: function () {
    return axios.get("/api/get/test");
  },
};