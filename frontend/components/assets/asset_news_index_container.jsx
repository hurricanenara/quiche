import React from "react";
import AssetNewsIndex from "./asset_news_index";
import { connect } from "react-redux";
import { fetchAssetNews } from "../../actions/news_actions";

const msp = (state) => {
  let news = state.entities.news ? state.entities.news : {};
  return {
    assetNews: Object.values(news),
  };
};

const mdp = (dispatch) => {
  return {
    fetchAssetNews: (companyName) => dispatch(fetchAssetNews(companyName)),
  };
};

export default connect(msp, mdp)(AssetNewsIndex);
