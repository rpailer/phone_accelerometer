
import axios from "axios";

export function scoreRequest(dataObj, url) {

  console.log("scoreRequest: " + url);
  console.log(dataObj);

  var input = {
      "input_data": [
          {
              "values": [...dataObj.dataArray],
          }
      ],
  };
  console.log(input);
  return axios.request({
      method: "POST",
      url: url,
      data: input,
      headers: { "Content-Type": "application/json",
                  "Accept": "application/json" },

  }).then(resp => {
      console.log("response:");
      console.log(resp.data.predictions[0].values[0]);
      return resp.data.predictions[0].values[0];
  });
};
