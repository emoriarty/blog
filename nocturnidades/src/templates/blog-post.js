import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import get from 'lodash/get';
import { rhythm, scale } from '../utils/typography';
import PostHeader from '../components/PostHeader';

export default props => {
  const post = props.data.markdownRemark
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const { previous, next } = props.pathContext

  return (
    <div
      style={{
      }}
    >
      <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
      <PostHeader
        title={post.frontmatter.title}
        date={post.frontmatter.date}
      />
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          listStyle: 'none',
          padding: 0,
        }}
      >
        <li>
          {
            previous &&
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          }
        </li>
        <li>
          {
            next &&
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          }
        </li>
      </ul>
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
