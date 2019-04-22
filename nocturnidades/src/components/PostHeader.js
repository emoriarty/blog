import React from 'react';
import Link from 'gatsby-link';
import Menu from '../components/Menu';
import { rhythm, scale } from '../utils/typography';
import { styles as headerStyles } from './Header';
import injectSheet from 'react-jss';

export const styles = {
  ...headerStyles,
  header: {
    ...headerStyles.header,
    marginBottom: rhythm(1),
  },
  title: {
    ...headerStyles.title,
    marginBottom: rhythm(1/3),
  },
  date: {
    ...scale(-1/5),
    display: 'block',
  },
};

const PostHeader = ({ classes, title, date }) => (
  <header className={classes.header}>
    <h1 className={classes.title}>
      {title}
    </h1>
    <p className={classes.date}>
      {date}
    </p>
  </header>
);

export default injectSheet(styles)(PostHeader);
