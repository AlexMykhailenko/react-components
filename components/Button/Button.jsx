/**
 * Button component which accepts via props the text to render
 * inside the button, its size and style.
 *
 * On hover, mouse cursor should become pointer, and the onClick()
 * callback passed from parent should be triggered on click.
 *
 * Style:
 * To create outline btn pass 'tc-outline-btn' className
 * To create filled btn pass '{color} tc-blue-btn' className. eg. 'red tc-blue-btn'
 * To create big btn pass 'tc-bg-btn' className along with one of the above two btn type
 */


import React, { PropTypes as PT } from 'react';
import _ from 'lodash';
import './Button.scss';

export default function Button(props) {
  return (
    <button
      className={props.className}
      onClick={() => props.onClick()}
    >
      {props.children}
    </button>
  );
}

Button.defaultProps = {
  className: 'tc-blue-btn',
  onClick: _.noop,
  children: _.noop,
};

Button.propTypes = {
  className: PT.string,
  onClick: PT.func,
  children: PT.any,
};
