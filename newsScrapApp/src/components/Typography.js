import React from "react";
import { Text as RNText } from "react-native";
import PropTypes from "prop-types";

export const Typography = (props) => {
  return (
      <RNText style={{ color: props.color, fontSize: props.fontSize, numberOfLines: props.numberOfLines }}>
          {props.children}
    </RNText>
  );
};

Typography.propTypes = {
  color: PropTypes.string,
  fontSize: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};


