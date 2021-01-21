import React from 'react';
import { connect } from 'react-redux';
import AssetShow from './asset_show';
import { logout } from '../../actions/session_actions';
import {
    fetch1Week,
  fetchAsset,
  fetchCompanyInfo,
  fetchIntraday,
  fetchRating,
  clearAsset
} from "../../actions/asset_actions";
import { addAssetToWatchlist, deleteAssetFromWatchlist, fetchAllWatchlistAssets } from '../../actions/watchlist_actions';
import { fetchAssetNews } from "../../actions/news_actions";
import { addTransaction, fetchPortfolioCashBalance } from '../../actions/transaction_actions';
import { fetchHoldings } from '../../actions/holding_action';
import { withRouter } from "react-router";



export const msp = (state, ownProps) => {
    return {
        assets: state.entities.assets,
        currentUser: state.session.user,
        watchlistArr: Object.keys(state.entities.watchlists),
        assetNews: Object.values(state.entities.news),
        portfolio: state.entities.transactions,
        holdings: state.entities.transactions,
        ticker: ownProps.match.params.ticker,
        // watchlist: state.entities.watchlists,
    };
}
// export const msp = (state, ownProps) => {
//     let asset = asset || state.entities.assets[(ownProps.match.params.ticker).toUpperCase()] || state.entities.assets;
//     let news = state.entities.news ? state.entities.news : {};
//     if (!asset) {
//         return {
//             asset: {}
//         }
//     } else {
//         return {
//           asset: asset || state.entities.assets,
//           currentUser: state.session.user,
//           watchlistArr: Object.keys(state.entities.watchlists),
//           otherData: state.entities.assets,
//           assetNews: Object.values(news),
//             portfolio: state.entities.transactions,
//             holdings: state.entities.transactions,
//             // watchlist: state.entities.watchlists,
//         };
//     }
// }

export const mdp = dispatch => {
    return {
        fetchAsset: ticker => dispatch(fetchAsset(ticker)),
        clearAsset: () => dispatch(clearAsset()),
        addAssetToWatchlist: (asset, currentUser) => dispatch(addAssetToWatchlist(asset, currentUser)),
        deleteAssetFromWatchlist: (asset, currentUser) => dispatch(deleteAssetFromWatchlist(asset, currentUser)),
        fetchCompanyInfo: ticker => dispatch(fetchCompanyInfo(ticker)),
        fetchIntraday: ticker => dispatch(fetchIntraday(ticker)),
        fetchAssetNews: (ticker) => dispatch(fetchAssetNews(ticker)),
        logout: () => dispatch(logout()),
        fetchRating: ticker => dispatch(fetchRating(ticker)),
        fetchPortfolioCashBalance: () => dispatch(fetchPortfolioCashBalance()),
        addTransaction: order => dispatch(addTransaction(order)),
        fetchHoldings: () => dispatch(fetchHoldings()),
        fetch1Week: ticker => dispatch(fetch1Week(ticker)),
        fetchAllWatchlistAssets: () => dispatch(fetchAllWatchlistAssets()),
        
    }
}


export default withRouter(connect(msp, mdp)(AssetShow));