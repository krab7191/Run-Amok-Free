module.exports = {
  determineDatePassed: function(date) {
    const now = new Date();
    if (date < now) {
      return false;
    } else {
      return true;
    }
  }
};
