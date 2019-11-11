import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Statistic } from "semantic-ui-react"
import styled from "styled-components"

const Wrapper = styled.div`
  color: #fff !important;
  display: grid;
  grid-gap: 2rem;
  grid-auto-columns: min-content;
  grid-auto-flow: column;

  .ui.statistic {
    margin: 0 !important;
  }
`

const Countdown = ({ date }) => {
  const [countDown, setCountDown] = useState({
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const myDate = calculateCountdown(date)
      myDate ? setCountDown(myDate) : clearInterval(interval)
    }, 1000)

    return () => clearInterval(interval)
  })

  const calculateCountdown = endDate => {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000

    // clear countdown when date is reached
    if (diff <= 0) return false

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    }

    // calculate time difference between now and expected date
    if (diff >= 365.25 * 86400) {
      // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400))
      diff -= timeLeft.years * 365.25 * 86400
    }
    if (diff >= 86400) {
      // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400)
      diff -= timeLeft.days * 86400
    }
    if (diff >= 3600) {
      // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600)
      diff -= timeLeft.hours * 3600
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60)
      diff -= timeLeft.min * 60
    }
    timeLeft.sec = diff

    return timeLeft
  }

  const addLeadingZeros = value => {
    value = String(value)
    while (value.length < 2) {
      value = "0" + value
    }
    return value
  }

  return (
    <Wrapper>
      <Statistic
        inverted
        label={countDown.days === 1 ? "Day" : "Days"}
        value={addLeadingZeros(countDown.days)}
        size="tiny"
      />
      <Statistic
        inverted
        label={countDown.hours === 1 ? "Hour" : "Hours"}
        value={addLeadingZeros(countDown.hours)}
        size="tiny"
      />
      <Statistic
        inverted
        label={countDown.min === 1 ? "Minute" : "Minutes"}
        value={addLeadingZeros(countDown.min)}
        size="tiny"
      />
      <Statistic
        inverted
        label={countDown.sec === 1 ? "Second" : "Seconds"}
        value={addLeadingZeros(countDown.sec)}
        size="tiny"
      />
    </Wrapper>
  )
}

Countdown.propTypes = {
  date: PropTypes.string.isRequired,
}

Countdown.defaultProps = {
  date: new Date(),
}

export default Countdown
