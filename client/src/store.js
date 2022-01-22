import { createStore, action } from "easy-peasy";
/* import { useStoreState, useStoreActions } from "easy-peasy"; */

const store = createStore({
  changeState: {
    sidebarShow: false,
  },
  itemClick_DelareRoad: undefined,
  recordTable_DelareRoad: {
    dateSelect: new Date(),
    customer: "",
    road: "",
    goods: "",
    note: "",
    carrier: "",
    rates: "",
    car: "",
  },
  table1311: {
    dateRange: [
      new Date(new Date().setDate(new Date().getDate() - 31)),
      new Date(),
    ],
  },
  table3311: {
    dateRange: [
      new Date(new Date().setDate(new Date().getDate() - 31)),
      new Date(),
    ],
  },
  closingDate: undefined,
  API_listInput_DelareRoad: {},
  table_DelareRoad: [],
  setClosingDate: action((state, payload) => {
    state.closingDate = payload;
  }),
  setTable1311: action((state, payload) => {
    state.table1311 = payload;
  }),
  setTable3311: action((state, payload) => {
    state.table3311 = payload;
  }),

  setItemClick_DelareRoad: action((state, payload) => {
    state.itemClick_DelareRoad = payload;
  }),
  setRecordTable_DelareRoad: action((state, payload) => {
    state.recordTable_DelareRoad = payload;
  }),
  setTable_DelareRoad: action((state, payload) => {
    state.table_DelareRoad = payload;
  }),
  setAPI_listInput_DelareRoad: action((state, payload) => {
    state.API_listInput_DelareRoad = payload;
  }),
  setChangeState: action((state, payload) => {
    state.changeState = payload;
  }),
});

export default store;
