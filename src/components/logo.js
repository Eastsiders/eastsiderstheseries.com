import React from "react"
import PropTypes from "prop-types"

const baseStyle = {
  fontFamily: "'ITC Stone Sans Std Bold 24796'",
  color: "#fff",
  textTransform: "uppercase",
}

const Logo = ({ oneColor, style }) => (
  <span style={{ ...baseStyle, ...style }}>
    <span style={oneColor ? {} : { color: "#156592" }}>East</span>siders
  </span>
)

Logo.propTypes = {
  oneColor: PropTypes.bool,
}

Logo.defaultProps = {
  oneColor: false,
}

export default Logo
