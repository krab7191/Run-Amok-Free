export default {
    // type one of 'success', 'error', 'info', duration in MS
  notify: (text, type, duration, toast) => {
    toast[type || "success"](text, { autoClose: duration || 2500 });
  }
}