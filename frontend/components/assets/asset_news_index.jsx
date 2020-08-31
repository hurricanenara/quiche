import React from "react";

class AssetNewsIndex extends React.Component {
  // componentDidMount() {
  //   debugger;
  //   const { companyName } = this.props;
  //   // const formatCompanyName = !companyName ? "" : companyName.split(",")[0];
  //   const formatCompanyName = !this.props.companyName ? "" : this.props.companyName.split(",")[0];
  //   this.props.fetchAssetNews(formatCompanyName);
  // }

  render() {
    const { assetNews, companyName, news } = this.props;
    const topThree = !this.props.news ? [] : this.props.news.slice(0, 3);
    debugger
    if (!news) {
      debugger
      return (
        <div className="asset-news-stand">
          This is news stand rendering nothing...
        </div>
      );
    } else {
      debugger
      return (
        <div className="asset-news-stand">
          This is news {!companyName ? "null" : companyName}
          {
            this.props.news.slice(0, 3).map((newsItem, i) => {
            return (
            <div key={i} className={`news-item-${i}`} >
              {`${newsItem.source.name}
              ${new Intl.DateTimeFormat('en', { month: 'short' }).format(new Date(newsItem.publishedAt))}
              ${new Intl.DateTimeFormat('en', { day: '2-digit' }).format(new Date(newsItem.publishedAt))}`}
              <br></br>
              {newsItem.title.split("-")[0]}
              <br></br>
              {`(${newsItem.source.name}) -- ${newsItem.content.slice(0, 50)}...`}
              <img className="asset-show-image" src={newsItem.urlToImage} alt=""/>
            </div>
            )
            })
          }
        </div>
      );
    }
    }
}

export default AssetNewsIndex;

// news API: e6c80b74b664420d8dd71e77555fa65b
