const axios = require("axios");

module.exports = {
  getUsDataByState: async (state) => {
    //Get current data for most recent date
    const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)
      .toISOString()
      .slice(0, 10);
    const url = `https://data.cdc.gov/resource/unsk-b7fc.json?location=${state}&date=${yesterday}T00:00:00.000`;

    //Use axios library for https request
    const response = await axios(url);
    return response.data;
  },
};
