import React from 'react';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import Header from '../components/Header';
import Posts from '../components/Posts';

export default props => {
  const siteTitle = get(props, 'data.site.siteMetadata.title');
  const posts = get(props, 'data.allMarkdownRemark.edges');

  return [
    <Helmet
      key="head"
      title={siteTitle}
    />,
    <Header
      title={siteTitle}
    />,
    <Posts
      key="posts"
      entries={posts}
    />,
  ];
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`
