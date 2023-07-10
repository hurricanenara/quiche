import * as AssetAPIUtil from "../util/asset_api_util";

export const RECEIVE_ALL_ASSETS = "RECEIVE_ALL_ASSETS";
export const RECEIVE_ASSETS = "RECEIVE_ASSETS"; //GET QUOTES FOR MULTIPLE TICKERS
export const RECEIVE_ASSET = "RECEIVE_ASSET";
export const RECEIVE_ASSET_STATS = "RECEIVE_ASSET_STATS";
export const RECEIVE_ASSET_INTRADAY = "RECEIVE_ASSET_INTRADAY";
export const RECEIVE_1WEEK = "RECEIVE_1WEEK";
export const RECEIVE_MULTIPLE_INTRADAY = "RECEIVE_MULTIPLE_INTRADAY";
export const RECEIVE_PRICE = "RECEIVE_PRICE";
export const RECEIVE_HISTORICAL_PRICES = "RECEIVE_HISTORICAL_PRICES";
export const RECEIVE_COMPANY_INFO = "RECEIVE_COMPANY_INFO";
export const RECEIVE_NEWS = "RECEIVE_NEWS";
export const RECEIVE_RATING = "RECEIVE_RATING";
export const CLEAR_PRICE = "CLEAR_PRICE";
export const CLEAR_ASSET = "CLEAR_ASSET";
export const CLEAR_RATING = "CLEAR_RATING";
export const CLEAR_HISTORICAL_PRICES = "CLEAR_HISTORICAL_PRICES";
export const RECEIVE_HISTORICAL_BATCH_PRICES =
  "RECEIVE_HISTORICAL_BATCH_PRICES";

export const receiveAllAssets = (assets) => {
  return {
    type: RECEIVE_ALL_ASSETS,
    assets,
  };
};

export const receiveAssets = (assets) => {
  return {
    type: RECEIVE_ASSETS,
    assets,
  };
};

export const receiveAsset = (asset) => {
  return {
    type: RECEIVE_ASSET,
    asset,
  };
};

export const receiveAssetStats = (assetStats) => {
  return {
    type: RECEIVE_ASSET_STATS,
    assetStats,
  };
};

export const receiveAssetIntraday = (assetIntraday, ticker) => {
  return {
    type: RECEIVE_ASSET_INTRADAY,
    assetIntraday,
    ticker,
  };
};

export const receive1Week = (asset1Week, ticker) => {
  return {
    type: RECEIVE_1WEEK,
    asset1Week,
    ticker,
  };
};

export const receiveMultipleIntraday = (multIntraday, tickers) => {
  return {
    type: RECEIVE_MULTIPLE_INTRADAY,
    multIntraday,
    tickers,
  };
};

export const receiveNews = (news, ticker) => {
  return {
    type: RECEIVE_ASSET_INTRADAY,
    news,
    ticker,
  };
};

export const receiveRating = (rating, ticker) => {
  return {
    type: RECEIVE_RATING,
    rating,
    ticker,
  };
};

export const receivePrice = (assetPrice) => {
  return {
    type: RECEIVE_PRICE,
    assetPrice,
  };
};

export const receiveHistoricalPrices = (historicalPrices, range) => {
  return {
    type: RECEIVE_HISTORICAL_PRICES,
    historicalPrices,
    range,
  };
};
export const receiveHistoricalBatchPrices = (
  historicalBatchPrices,
  range,
  tickersArr
) => {
  return {
    type: RECEIVE_HISTORICAL_BATCH_PRICES,
    historicalBatchPrices,
    range,
    tickersArr,
  };
};

export const receiveCompanyInfo = (company) => {
  return {
    type: RECEIVE_COMPANY_INFO,
    company,
  };
};

export const clearPrice = () => {
  return {
    type: CLEAR_PRICE,
  };
};

export const clearRating = () => {
  return {
    type: CLEAR_RATING,
  };
};

export const clearHistoricalPrices = () => {
  return {
    type: CLEAR_HISTORICAL_PRICES,
  };
};

export const clearAsset = () => {
  return {
    type: CLEAR_ASSET,
  };
};

export const fetchAssets = () => (dispatch) => {
  return AssetAPIUtil.fetchAssets().then((assets) => {
    return dispatch(receiveAllAssets(assets));
  });
};

let cachedAssetQuote = {};
//later add logic to check if close prop of response is the same as cached, and add if/else
export const fetchAsset = (ticker) => (dispatch) => {
  if (cachedAssetQuote[ticker]) {
    return dispatch(receiveAsset(cachedAssetQuote[ticker]));
  } else {
    return AssetAPIUtil.fetchAsset(ticker).then((asset) => {
      cachedAssetQuote[ticker] = asset;
      return dispatch(receiveAsset(asset));
    });
  }
};

let cachedCompanyInfo = {};
export const fetchCompanyInfo = (ticker) => (dispatch) => {
  if (cachedCompanyInfo[ticker]) {
    return dispatch(receiveCompanyInfo(cachedCompanyInfo[ticker]));
  } else {
    return AssetAPIUtil.fetchCompanyInfo(ticker).then((company) => {
      cachedCompanyInfo[ticker] = company;
      return dispatch(receiveCompanyInfo(company));
    });
  }
};

export const fetchIntraday = (ticker) => (dispatch) => {
  return AssetAPIUtil.fetchIntraday(ticker).then((assetIntraday) => {
    return dispatch(receiveAssetIntraday(assetIntraday, ticker));
  });
};

export const fetch1Week = (ticker) => (dispatch) => {
  return AssetAPIUtil.fetch1Week(ticker).then((asset1Week) => {
    return dispatch(receive1Week(asset1Week, ticker));
  });
};

export const fetchHistoricalPrices = (ticker, range) => (dispatch) => {
  return AssetAPIUtil.fetchHistoricalPrices(ticker, range).then(
    (historicalPrices) => {
      return dispatch(receiveHistoricalPrices(historicalPrices, range));
    }
  );
};

export const fetchHistoricalBatch = (tickersArr, range) => (dispatch) => {
  return AssetAPIUtil.fetchHistoricalBatch(tickersArr, range).then(
    (historicalBatchPrices) => {
      return dispatch(
        receiveHistoricalBatchPrices(historicalBatchPrices, range, tickersArr)
      );
    }
  );
};

export const fetchMultipleIntraday = (tickers) => (dispatch) => {
  return AssetAPIUtil.fetchMultipleIntraday(tickers).then((multIntraday) => {
    return dispatch(receiveMultipleIntraday(multIntraday, tickers));
  });
};

let cachedRating = {};
export const fetchRating = (ticker) => (dispatch) => {
  if (cachedRating[ticker]) {
    return dispatch(receiveRating(cachedRating[ticker], ticker));
  } else {
    return AssetAPIUtil.fetchRating(ticker).then((rating) => {
      cachedRating[ticker] = rating;
      return dispatch(receiveRating(rating, ticker));
    });
  }
};
