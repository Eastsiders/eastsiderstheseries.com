import React, { Component } from "react"
import { Link /*, withPrefix*/ } from "gatsby"
import { Container, Menu, Responsive, Visibility } from "semantic-ui-react"
import Logo from "./logo"

const menuStyle = {
  border: "none",
  borderRadius: 0,
  boxShadow: "none",
  marginBottom: "1em",
  backgroundColor: "transparent",
  transition: "box-shadow 0.5s ease, padding 0.5s ease",
}

const fixedMenuStyle = {
  backgroundColor: "#156592",
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
}

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuFixed: false,
    }
  }

  stickTopMenu = () => this.setState({ menuFixed: true })
  unStickTopMenu = () => this.setState({ menuFixed: false })
  handleOnUpdate = (e, { width }) => this.setState({ width })

  render() {
    const { menuFixed, width } = this.state
    const menuWidths = width >= Responsive.onlyTablet.maxWidth ? null : 1
    /*const isHomepage =
      typeof window !== "undefined" &&
      window.location.pathname === withPrefix("/")*/

    return (
      <Visibility
        onBottomPassed={this.stickTopMenu}
        onBottomVisible={this.unStickTopMenu}
        offset={[0, -50]}
        once={false}
      >
        <Responsive
          as={Menu}
          borderless
          inverted
          //inverted={menuFixed || !isHomepage ? false : true}
          fixed={"top"}
          style={menuFixed ? fixedMenuStyle : menuStyle}
          fireOnMount
          onUpdate={this.handleOnUpdate}
          widths={menuWidths}
          id="menubar"
        >
          <Container>
            <Menu.Item header as={Link} to="/">
              <Logo oneColor={menuFixed} />
            </Menu.Item>

            <Responsive
              as={Menu.Menu}
              position="right"
              {...Responsive.onlyComputer}
            >
              <Menu.Item as={Link} activeClassName="active" to="/watch">
                WATCH
              </Menu.Item>
              <Menu.Item as={Link} activeClassName="active" to="/merch">
                MERCH
              </Menu.Item>
              <Menu.Item as={Link} activeClassName="active" to="/more">
                MORE
              </Menu.Item>
            </Responsive>
          </Container>
        </Responsive>
      </Visibility>
    )
  }
}
