import React, { Component } from "react";
import { css } from "emotion";
import SideDrawer from "../../Components/SideDrawer/SideDrawer";
const layoutStyle = css`
  display: flex;
`;
class Layout extends Component {
  render() {
    return (
      <div className={layoutStyle}>
        <SideDrawer />
        <div style={{ width: "100%", padding: "2em" }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;
