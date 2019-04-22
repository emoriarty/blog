import React from 'react';
import Link from 'gatsby-link';
import Menu from '../components/Menu';
import { rhythm, scale } from '../utils/typography';
import injectSheet from 'react-jss';

export const styles = {
  header: {
    marginBottom: rhythm(2),
  },
  title: {
    ...scale(1.2),
    marginTop: 0,
    marginBottom: rhythm(1),
  },
  '@media (min-width: 480px)': {
    header: {
      textAlign: 'center',
    },
  },
};

const Header = ({ classes, title }) => (
  <header className={classes.header}>
    <h1 className={classes.title}>
      <Link to='/'>
        { title }
      </Link>
    </h1>
  </header>
);

export default injectSheet(styles)(Header);
