import React from "react";
import WatchlistIndexContainer from "../watchlist/watchlist_index_container";
import PortfoLineChart from "../charts/portfo_chart";
import NavBar from "../nav_bar/nav_bar";
import numeral from "numeral";
import moment from "moment";
import Spinner from "../ui/Spinner";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showDropdown: false,
      mergedData: "",
      historicalBatch: "",
      historicalPortfo: null,
      intraday: null,
      clickedRange: "",
    };
    this.mergeData = this.mergeData.bind(this);
    this.handleRangeClick = this.handleRangeClick.bind(this);
  }

  handleLogOut(e) {
    e.preventDefault();
    this.props.logout().then(() => {
      this.props.history.push("/login");
    });
  }

  mergeData(range = "1D", portfoDataPoints, stockData, holdings) {
    const ownedStocks = Object.keys(holdings.holdings);
    let stockLength = stockData[ownedStocks[0]]["intraday-prices"].length;
    let portfoLength = portfoDataPoints.data.length;
    if (range === "1D") {
      if (portfoDataPoints.data.length === 0) {
        return null;
      }
      if (portfoLength > stockLength) portfoDataPoints.data.splice(stockLength);
      portfoDataPoints.data.forEach((obj, i) => {
        let j = 0;
        if (stockLength > portfoLength) {
          j = stockLength - portfoLength + i;
        } else {
          j = i;
        }
        let currentSnapshot = portfoDataPoints.data[i].holdings_snapshot; // {ticker: numberOfShares, ticker: numberofShares}
        Object.keys(currentSnapshot).forEach((ticker) => {
          stockData[ticker]["intraday-prices"][j].close = stockData[ticker][
            "intraday-prices"
          ][j].close
            ? stockData[ticker]["intraday-prices"][j].close
            : stockData[ticker]["intraday-prices"][j - 1].close;
          portfoDataPoints.data[i].cash_balance +=
            stockData[ticker]["intraday-prices"][j].close *
            currentSnapshot[ticker];
        });
        // for (let ticker in currentSnapshot) {
        //   currentCash += stockData.multiple[ticker][j].close * currentSnapshot[ticker];
        // }
        // historicalPortfo[i].cash_balance = currentCash;
      });
      return portfoDataPoints.data;
    }
  }

  handleRangeClick(e) {
    const { fetchHistoricalBatch, tickers } = this.props;
    const { historicalBatch } = this.state;
    const tickersArr = Object.keys(tickers);
    if (range === "1W") range = "5DM";
    let range = e.target.textContent;

    if (!historicalBatch[range]) {
      fetchHistoricalBatch(tickersArr, range).then((res) => {
        this.setState({
          historicalBatch: { [range]: res.historicalBatchPrices },
        });
      });
    }
  }

  handlePortfoRangeClick(e) {
    const { fetchPortfoData } = this.props;
    const range = e.target.textContent;

    fetchPortfoData(range).then((res) => {
      this.setState({
        historicalPortfo: res.data.data,
      });
    });
  }

  componentDidMount() {
    const {
      portfolio,
      holdings,
      fetchAssets,
      fetchPortfoData,
      fetchPortfolioCashBalance,
      fetchMultipleIntraday,
      fetchHoldings,
      fetchAssetNews,
      portfoData,
      multIntraday,
    } = this.props;
    // const tickers = Object.keys(this.props.portfolio.holdings);
    Promise.all([
      fetchPortfoData(""),
      fetchHoldings(),
      fetchPortfolioCashBalance(),
      fetchAssetNews("GOOGL"),
    ]).then((res) => {
      if (Object.keys(res[1].holdings.holdings).length > 0) {
        fetchMultipleIntraday(Object.keys(res[1].holdings.holdings)).then(
          (multRes) => {
            let newData = this.mergeData(
              this.clickedRange,
              res[0].data,
              multRes.multIntraday,
              res[1].holdings
            );
            this.setState(
              {
                historicalPortfo: newData,
              },
              () => console.log("Hi! Welcome :-)")
            );
          }
        );
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  }

  render() {
    const {
      currentUser,
      logout,
      portfolio,
      assetNews,
      portfoData,
      multIntraday,
      holdings,
      tickers,
    } = this.props;
    const { mergedData, historicalBatch, historicalPortfo } = this.state;
    const notAllFetched = !currentUser || !portfolio || !assetNews;
    if (!currentUser || !portfolio.balance || !assetNews) {
      return (
        <div>
          <Spinner type='Loader' />
        </div>
      );
    } else {
      let buyingPowerAvailable = portfolio.balance.toFixed(2);
      let portfoValue = historicalPortfo
        ? historicalPortfo[historicalPortfo.length - 1].cash_balance.toFixed(2)
        : buyingPowerAvailable;
      window.localStorage.setItem("portfoVal", portfoValue);

      return (
        <div className='dashboard-outermost'>
          <NavBar
            currentUser={currentUser}
            // mergedData={mergedData}
            buyingPowerAvailable={buyingPowerAvailable}
            history={this.props.history}
            logout={this.props.logout}
            portfoValue={portfoValue}
          />
          <div className='dashboard-container'>
            <main className='main-container'>
              <div className='row'>
                <div className='left col-1'>
                  <section className='graph-section'>
                    <header className='asset-price'></header>
                    <div className='react-chart'>
                      <PortfoLineChart
                        data={this.state.historicalPortfo}
                        // data={this.mergeData("1D", portfoData, multIntraday, holdings)}
                        className='stock-graph'
                      />
                    </div>
                    <nav className='range'>
                      <div className='range-buttons'>
                        <div className='1D'>
                          <span>1D</span>
                        </div>
                        <div className='1W'>
                          <span onClick={(e) => this.handlePortfoRangeClick(e)}>
                            1W
                          </span>
                        </div>
                        <div className='1M'>
                          <span onClick={(e) => this.handlePortfoRangeClick(e)}>
                            1M
                          </span>
                        </div>
                        <div className='3M'>
                          <span onClick={(e) => this.handlePortfoRangeClick(e)}>
                            3M
                          </span>
                        </div>
                        <div className='1Y'>
                          <span onClick={(e) => this.handlePortfoRangeClick(e)}>
                            1Y
                          </span>
                        </div>
                        <div className='5Y'>
                          <span>ALL</span>
                        </div>
                      </div>
                    </nav>
                  </section>
                  <div className='dashboard-buying-p'>
                    <header className='buying-p-heading'>
                      <div>
                        <span>Buying Power</span>
                        <span>
                          {numeral(buyingPowerAvailable).format("$0,0.00")}
                        </span>
                      </div>
                    </header>
                  </div>
                  <section className='asset-news-section'>
                    <header className='asset-news-heading'>
                      <div className='asset-news-div'>
                        <div className='asset-news-div-inner'>
                          <h2 className='asset-news-h2'>
                            <span>News</span>
                          </h2>
                        </div>
                      </div>
                    </header>
                    <div>
                      {assetNews.map((article, i) => {
                        return (
                          <a
                            href={article.url}
                            className='article-link'
                            key={i}>
                            <div key={i} className='article'>
                              <div className='inner-news-content'>
                                <div className='title-side'>
                                  <div className='news-source'>
                                    <span>{article.source}</span>
                                    <span className='time-since'>
                                      {moment(article.datetime).fromNow()}
                                    </span>
                                  </div>
                                  <div className='news-title-and-more'>
                                    <h3 className='title-h3'>
                                      {article.headline}
                                    </h3>
                                    <div>
                                      <span>
                                        {article.summary.slice(0, 59)}...
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className='news-image'>
                                  <img
                                    src={article.image}
                                    alt='image of news'
                                  />
                                </div>
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </section>
                </div>
                <div className='right col-2'>
                  <div className='watchlist-content'>
                    <div className='watchlist-card'>
                      <div className='actual-sidebar'>
                        <WatchlistIndexContainer />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      );
    }
  }
}

export default Dashboard;
