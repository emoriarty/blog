import React from 'react';
import { rhythm } from '../utils/typography'

export default () => {
  const imgStyle = {
    borderWidth: 0,
    marginBottom: 0,
  };
  return (
    <footer
      style={{
        marginTop: rhythm(2),
      }}
    >
      <a
        rel="license"
        href="http://creativecommons.org/licenses/by-nc/4.0/"
      >
        <img
          alt="Creative Commons Licence"
          style={imgStyle}
          src="https://i.creativecommons.org/l/by-nc/4.0/80x15.png"
        />
      </a>
    </footer>
  );
}

