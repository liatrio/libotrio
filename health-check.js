const axios = require("axios");

(async () => {
  try {
    const response = await axios.get("http://localhost:3000/healthz");
    console.log("OK", response.data);
    process.exit(0);
  } catch (err) {
    console.log("ERROR", err);
    process.exit(1);
  }
})();
