import React from 'react';
import get from 'lodash/get';
import { rhythm } from '../utils/typography';
import Menu from '../components/Menu';
import Footer from '../components/Footer';

export default class Template extends React.Component {
  render() {
    const { children, data } = this.props
    const siteTitle = get(data, 'site.siteMetadata.title');

    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: rhythm(3 / 4),
        }}
      >
        <Menu />
        { children() }
        <Footer />
      </div>
    )
  }
}

export const pageQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
