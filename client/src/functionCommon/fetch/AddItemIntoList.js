import GetToken from "../../views/common/GetToken";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { API, areas } from "src/const";

function AddItemIntoList() {
  const token = GetToken();

  const addItemIntoList = async (dataBody) => {
    const res = await trackPromise(
      fetch(API + "/api/themVaoListKhaiBaoNhatTrinh", {
        method: "post",
        body: JSON.stringify(dataBody),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      areas.tableOwe
    );

    let { data } = await res.json();
    return { data };
  };

  return addItemIntoList;
}

export default AddItemIntoList;
