import GetToken from "../../views/common/GetToken";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { API, areas } from "src/const";
import { useStoreActions, useStoreState } from "easy-peasy";

function GetListInputDeclareRoad() {
  const token = GetToken();
  const { setAPI_listInput_DelareRoad } = useStoreActions((actions) => actions);
  const getListInputDeclareRoad = async () => {
    try {
      const res = await trackPromise(
        fetch(API + "/api/getAll_listInput_declareRoad", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
        areas.tableOwe
      );

      let { data } = await res.json();
      if (data.error) return alert(data.error);
      setAPI_listInput_DelareRoad(data);
    } catch (error) {
      alert(error);
    }
  };

  return getListInputDeclareRoad;
}

export default GetListInputDeclareRoad;
