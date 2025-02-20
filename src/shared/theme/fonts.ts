import PropTypes from 'prop-types';

const INTER: any = {
  EXTRA_LIGHT: 'Inter18pt-ExtraLight',
  LIGHT: 'Inter18pt-Light',
  REGULAR: 'Inter18pt-Regular',
  MEDIUM: 'Inter18pt-Medium',
  SEMI_BOLD: 'Inter18pt-SemiBold',
  BOLD: 'Inter18pt-Bold',
  EXTRA_BOLD: 'Inter18pt-ExtraBold',
};
INTER.propTypes = PropTypes.shape({
  EXTRA_LIGHT: PropTypes.string.isRequired,
  LIGHT: PropTypes.string.isRequired,
  REGULAR: PropTypes.string.isRequired,
  MEDIUM: PropTypes.string.isRequired,
  SEMI_BOLD: PropTypes.string.isRequired,
  BOLD: PropTypes.string.isRequired,
  EXTRA_BOLD: PropTypes.string.isRequired,
});
export {INTER};
