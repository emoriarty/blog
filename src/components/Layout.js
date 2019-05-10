import React from 'react'
import { Link } from 'gatsby'
import LanguageSwitcher from './LanguageSwitcher'

import { rhythm } from '../utils/typography'

import '../assets/style.css'

class Layout extends React.Component {
  render() {
    const { location, config, children, translations } = this.props
    let header

    if (`${__PATH_PREFIX__}${config.fields.slug}` === location.pathname) {
      header = (
        <h1
          style={{
            marginBottom: rhythm(.25),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              backgroundImage: 'none',
              boxShadow: 'none',
              color: 'inherit',
              textDecoration: 'none',
            }}
            to={config.fields.slug}
          >
            {config.frontmatter.title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
              backgroundImage: 'none',
            }}
            to={'/'}
          >
            {config.frontmatter.title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {header}
        <LanguageSwitcher
          language={config.frontmatter.language}
          translations={translations}
        />
        {children}
      </div>
    )
  }
}

export default Layout
