import React from 'react';
import Link from 'gatsby-link';
import get from 'lodash/get';
import { rhythm, scale, bodyFontFamily, backgroundColor, bodyColor } from '../utils/typography';
import injectSheet from 'react-jss'

const styles = {
  entry: {
    marginBottom: rhythm(1.25),
  },
  entryLink: {
    boxShadow: 'none',
    display: 'block',
    textDecoration: 'none',
    '&:hover > *:first-child': {
      color: backgroundColor,
      backgroundColor: bodyColor,
    },
  },
  entryTitle: {
    transition: 'all .2s ease',
    lineHeight: rhythm(1.5),
    marginBottom: rhythm(1 / 4),
  },
  entryDate: {
    float: 'right',
    fontFamily: bodyFontFamily.join(','),
    fontWeight: 'normal',
    ...scale(-0.5),
  },
};

class Posts extends React.Component {
  constructor() {
    super();
    this.renderEntry = this.renderEntry.bind(this);
  }

  render() {
    const { entries } = this.props;
    const style = {
      listStyle: 'none',
      margin: '0',
    };

    return (
      <ul style={style}>
        { entries.map(this.renderEntry) }
      </ul>
    );
  }

  renderEntry({ node }) {
    const { classes } = this.props;
    const {
      fields: { slug },
      frontmatter: { date },
      excerpt,
    } = node;
    const title = get(node, 'frontmatter.title', slug);

    return (
      <li
        key={slug}
        className={classes.entry}
      >
        <Link
          to={node.fields.slug}
          className={classes.entryLink}
        >
          <h3
            className={classes.entryTitle}
          >
            {title}
            <small
              className={classes.entryDate}
            >
              {node.frontmatter.date}
            </small>
          </h3>
          <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </Link>
      </li>
    );
  }
}

export default injectSheet(styles)(Posts);
