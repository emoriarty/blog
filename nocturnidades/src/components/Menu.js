import React from 'react';
import Link from 'gatsby-link';
import { rhythm, scale, ternaryColor, quaternaryColor, headerFontFamily } from '../utils/typography'
import injectSheet from 'react-jss';

const styles = {
  nav: {
    ...scale(-.25),
    marginBottom: rhythm(3/4),
    height: rhythm(1.37),
  },
  navHome: {
    textDecoration: 'none',
    display: 'inline-block',
    width: rhythm(4.8),
    marginRight: rhythm(.5),
    '& + ul': {
      width: `calc(100% - ${rhythm(5.3)})`,
    }
  },
  navHomeTitle: {
    fontFamily: headerFontFamily.join(','),
    padding: `${rhythm(1/8)} ${rhythm(3/8)}`,
    border: '1px solid',
    transition: 'width .2s ease-in .1s',
    overflow: 'hidden',
    display: 'inline-block',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    width: rhythm(1.25),
    '&:hover': {
      width: rhythm(4.75),
      transition: 'width .2s ease-out',
      '& span': {
        transition: 'opacity .2s ease-out .1s',
        opacity: 1,
      }
    },
  },
  navHomeInnerTitle: {
    transition: 'opacity .2s ease-in',
    opacity: 0,
  },
  navList: {
    height: rhythm(1.37),
		listStyle: 'none',
		margin: 0,
    display: 'inline-block',
    width: '100%',
    textAlign: 'right',
    verticalAlign: 'super',
	},
  navItem: {
		display: 'inline',
		marginLeft: rhythm(1),
	},
  navLink: {
		textDecoration: 'none',
		color: ternaryColor,
	},
  '@media (min-width: 480px)': {
  },
};

const Menu = ({ classes, home }) => {

  return (
    <nav className={classes.nav}>
      {
        document.location.pathname !== '/' &&
          <Link to='/' className={classes.navHome}>
            <span className={classes.navHomeTitle}>
              N
              <span className={classes.navHomeInnerTitle}>octurnidades</span>
            </span>
          </Link>
      }
      <ul className={classes.navList}>
        <li className={classes.navItem}>
					<Link to='about' className={classes.navLink}>About</Link>
				</li>
      </ul>
    </nav>
  );
}

export default injectSheet(styles)(Menu);
