import * as PortfoAPIUtil from "../util/portfo_api_util";

export const RECEIVE_PORTFO_DATA = "RECEIVE_PORTFO_DATA";

export const receivePortfoData = (data, range) => {
  return {
    type: RECEIVE_PORTFO_DATA,
    data,
    range,
  };
};

export const fetchPortfoData = (range) => (dispatch) => {
  const portfoRange = range || "1D";
  return PortfoAPIUtil.fetchPortfoData(portfoRange).then((data) => {
    return dispatch(receivePortfoData(data, portfoRange));
  });
};
