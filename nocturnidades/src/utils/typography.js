import Typography from 'typography';
import kirkhamTheme from 'typography-theme-kirkham';

const backgroundColor = '#fff';
const secondaryColor = '#212121';
const ternaryColor = '#757575';
const quaternaryColor = '#BDBDBD';

kirkhamTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  'a': {
    color: kirkhamTheme.bodyColor,
  },
  'h1 a, h2 a, h3 a, h4 a, h5 a, h6 a': {
    textDecoration: 'none',
  },
  'body': {
    backgroundColor,
  },
});

const typography = new Typography(kirkhamTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

console.log(typography);

export default {
	...typography,
  ...typography.options,
	backgroundColor,
	secondaryColor,
	ternaryColor,
	quaternaryColor,
};
