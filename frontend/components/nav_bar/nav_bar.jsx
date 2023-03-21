import React from "react";
import { Link } from "react-router-dom";
import SearchContainer from "./search_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import numeral from "numeral";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.wrapperRef_nav = React.createRef();
    this.showDropdown = this.showDropdown.bind(this);
    this.state = {
      loading: true,
      showDropdown: false,
    };
  }

  handleLogOut(e) {
    const { logout, history } = this.props;
    e.preventDefault();
    logout().then(() => {
      history.push("/login");
    });
  }

  handleKeyDown(e) {
    const { history } = this.props;
    if (e.keyCode === 13) {
      history.push(`/stocks/${e.currentTarget.value.toUpperCase()}`);
      // if (history.location.pathname === "/") {
      // };
    }
  }

  handleClickOutside(e) {
    if (
      this.wrapperRef_nav &&
      !this.wrapperRef_nav.current.contains(e.target)
    ) {
      this.setState({
        showDropdown: false,
      });
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  showDropdown(e) {
    e.preventDefault();
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  render() {
    const { currentUser, buyingPowerAvailable, portfoValue } = this.props;
    return (
      <div className='header-bar'>
        <div className='header-container'>
          <div className='logo-container'>
            <Link id='logo' to='/us/en'>
              <FontAwesomeIcon icon={faPizzaSlice} className='pizza-slice' />
            </Link>
          </div>
          <SearchContainer history={this.props.history} />
          <div className='header-right'>
            <div className='header-right-box'>
              <div className='github'>
                <FontAwesomeIcon
                  id='github'
                  icon={faGithub}
                  className='brand-icon'
                  onClick={() =>
                    window.open("https://github.com/hurricanenara", "_blank")
                  }
                />
              </div>
              <div className='portfo-link'>
                <Link to={"/"}>
                  <span>Portfolio</span>
                </Link>
              </div>
              <div className='account' ref={this.wrapperRef_nav}>
                <span onClick={this.showDropdown}>Account</span>
                {this.state.showDropdown ? (
                  <div className='dropdown-outer'>
                    <div className='dropdown-container'>
                      <header>
                        {currentUser ? (
                          <h3>
                            <span>{`${currentUser.firstName} ${currentUser.lastName}`}</span>
                          </h3>
                        ) : (
                          <h3>
                            <span>Please log in or sign up to continue.</span>
                          </h3>
                        )}
                        <div className='account-details'>
                          <div className='portfolio-value'>
                            <div className='portfolio-value-container'>
                              <span>
                                <h3>
                                  {numeral(portfoValue).format("$0,0.00")}
                                </h3>
                              </span>
                              <div className='portfolio-value-text'>
                                Portfolio Value
                              </div>
                            </div>
                          </div>
                          <div className='buying-power-value'>
                            <div className='buying-power-value-container'>
                              <span>
                                <h3>
                                  {numeral(buyingPowerAvailable).format(
                                    "$0,0.00"
                                  )}
                                </h3>
                              </span>
                              <div className='buying-value-text'>
                                Buying Power
                              </div>
                            </div>
                          </div>
                        </div>
                      </header>
                      <div
                        className='logout-div-container'
                        onClick={this.handleLogOut}>
                        <div className='logout-div'>
                          <span className='logout-svg'>
                            <svg
                              fill='none'
                              height='24'
                              viewBox='0 0 24 24'
                              width='24'
                              xmlns='http://www.w3.org/2000/svg'>
                              <path
                                clipRule='evenodd'
                                d='M19.4444 4.29L4.55844 4.29885C3.7013 4.29885 3 5.07027 3 6.01313V9.43313H4.55844V5.99599L19.4444 5.98714V18.0129L4.55844 18.0217V14.576H3V18.0131C3 18.956 3.7013 19.7103 4.55844 19.7103L19.4444 19.7014C20.3016 19.7014 21.0029 18.9471 21.0029 18.0043V6.00429C21.0029 5.05286 20.3016 4.29 19.4444 4.29ZM12.0116 15.4331L15.4402 12.0046L12.0116 8.57599V11.1474L3 11.1474V12.8617L12.0116 12.8617V15.4331Z'
                                fill='black'
                                fillRule='evenodd'></path>
                            </svg>
                          </span>
                          <div className='logout-text'>Log Out</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
