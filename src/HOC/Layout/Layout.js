import React, { Component } from "react";
import { css } from "emotion";
import SideDrawer from "../../Components/SideDrawer/SideDrawer";
import { connect } from "react-redux";

const layoutStyle = css`
    display: flex;
  `,
  loadingStyle = css`
    position: absolute;
    background-color: #252588;
    width: 100%;
    height: 100%;
    text-align: center;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    & h1 {
      color: white;
    }
  `,
  loadingStyleHidden = css`
    display: none;
  `,
  containerStyle = css`
    width: 100%;
    padding: 2em;
    position: relative;
  `;

class Layout extends Component {
  render() {
    return (
      <div className={layoutStyle}>
        <SideDrawer isLoggedIn={this.props.isLoggedIn} />
        <div className={containerStyle}>
          <div
            className={
              this.props.showLoadingScreen ? loadingStyle : loadingStyleHidden
            }>
            <h1>Loading ... </h1>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showLoadingScreen: state.authReducer.loading,
    isLoggedIn: state.authReducer.idToken !== null
  };
};
export default connect(
  mapStateToProps,
  null
)(Layout);
