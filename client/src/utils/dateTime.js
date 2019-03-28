export default {
  // Convert mongoose datestamp to human friendly date
  makeDateReadable: jsDate => {
    const d = new Date(jsDate);
    const month = d.toLocaleString("en-us", { month: "long" });
    const day = d.toLocaleString("en-us", { day: "numeric" });
    const year = d.toLocaleString("en-us", { year: "numeric" });
    return `${month} ${day}, ${year}`;
  }
};
