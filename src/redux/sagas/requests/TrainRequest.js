
import axios from "axios";

export function trainRequest(dataObj, url) {

  console.log("trainRequest: " + url);
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
      return resp.data;
  });
};
