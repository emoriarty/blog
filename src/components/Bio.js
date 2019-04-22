import React from 'react'

import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div
        className="bio"
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src="https://avatars1.githubusercontent.com/u/510375"
          alt={`Enrique Arias`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '25%',
          }}
        />
        {children}
      </div>
    )
  }
}

export default Bio
