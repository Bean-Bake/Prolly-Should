import React from 'react'

const Stopwatch = (props) => {
  return (
    <div>
        <col>
        {("0" + Math.floor(props.time / (60000 * 60 * 24)) % 24).slice(-2)}:
        </col>
        <col>
        {("0" + Math.floor(props.time / (60000 * 60)) % 60).slice(-2)}:
        </col>
        <col>
        {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}
        </col>
    </div>
  )
}

export default Stopwatch