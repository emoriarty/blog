import React, { Fragment } from 'react'
import { Link, StaticQuery, graphql } from "gatsby"
import { rhythm } from '../utils/typography'

class LanguageSwitcher extends React.Component {
  render() {
    const { language, translations } = this.props
    return (
      <StaticQuery
        query={graphql`
          query LanguageSwitcherQuery {
            allMarkdownRemark(filter: { frontmatter: { type: {eq: "language"}}}) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    language
                    language_label
                  }
                }
              }
            }
          }
        `}
        render={data => (
          <p style={{
            fontSize: '.9em',
            marginBottom: rhythm(1.5),
          }}>
            {data.allMarkdownRemark.edges.map(({ node }) => {
              if (node.frontmatter.language === language) {
                return null
              } else {
                let translationLink = node.fields.slug
                if (translations) {
                  const translationIndex = translations.findIndex(v => v === node.frontmatter.language)
                  if (translationIndex !== -1) {
                    translationLink = translations[translationIndex+1]
                  }
                }
                return (
                  <Fragment
                    key={translationLink}
                  >
                    Also available in&nbsp;
                    <Link
                      style={{
                      boxShadow: 'none',
                      textDecoration: 'none',
                    }} to={translationLink}>
                      {node.frontmatter.language_label}
                    </Link>
                  </Fragment>
                )
              }
            })}
          </p>
        )}
      />
    )
  }
}

export default LanguageSwitcher
