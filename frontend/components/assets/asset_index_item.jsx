import React from "react";
import { Link } from "react-router-dom";

const AssetIndexItem = (props) => {
  const { asset } = props;

  return (
    <Link to={`/dashboard/${asset.ticker}`}>
      {asset.ticker} - {asset.asset_name}
    </Link>
  );
};

export default AssetIndexItem;
