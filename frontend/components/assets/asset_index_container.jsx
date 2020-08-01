import React from 'react';
import AssetIndex from './asset_index'
import { connect } from 'react-redux';
import { fetchAssets } from '../../actions/asset_actions';

const msp = state => {
    debugger
    return {
        assets: state.entities.assets,
    }
}

const mdp = dispatch => {
    return {
        fetchAssets: () => dispatch(fetchAssets()),
    }

}

export default connect(msp, mdp)(AssetIndex);