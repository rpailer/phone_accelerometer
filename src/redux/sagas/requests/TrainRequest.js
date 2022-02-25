
import axios from "axios";

export function trainRequest(dataObj, url, token) {

  console.log("trainRequest: " + url);
  //console.log("token: " + token);
  console.log(dataObj);

//   var input = {
//       "input_data": [
//           {
//               "values": [...dataObj.dataArray],
//           }
//       ],
//   };

//  console.log(input);

  return axios.request({
      method: "POST",
      url: url,
      data: dataObj,
      headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": 'Basic ' + Buffer.from("use-token-auth:" + token).toString('Base64'),
      },

  }).then(resp => {
      console.log("response:");
      return resp.data;
  });
};
