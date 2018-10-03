import React, { Component } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Button as ElementsButton } from 'react-native-elements';
import { ColorTheme, Fonts } from '../../styles/AppTheme';
import Colors from '../../styles/Colors';

const BUTTON_RADIUS = 4;

const styles = StyleSheet.create({
  buttonStyle: {
    // Insert button style if necessary here
  },
  containerViewStyle: {
    borderRadius: BUTTON_RADIUS,
    marginLeft: 0,
    marginRight: 0,
  },
  textStyle: StyleSheet.flatten(Fonts.button),
});

export class Button extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    // Format title if text-transform property was added
    // Note: Consider refactoring to general utility function
    const title = ((transformation) => {
      if (this.props.title === null) {
        return null;
      }
      switch (transformation) {
        case 'uppercase':
          return this.props.title.toUpperCase();

        case 'lowercase':
          return this.props.title.toLowerCase();

        case 'capitalize':
          // Capitalize first letter of every word in text, example borrowed from stack-overflow
          return this.props.title.replace(/\b\w/g, l => l.toUpperCase());

        case 'none':
          return this.props.title;

        default:
          // No specific setting, set default based on platform
          return Platform.OS === 'android' ? (this.props.title).toUpperCase() : this.props.title;
      }
    })(this.props.textTransform);

    // Assign default colors if not selected
    const backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : ColorTheme.primary;
    const color = this.props.color ? this.props.color : Colors.black;

    // Assign other default values if not selected
    // Note: Stylesheet objects need to merged as array
    const buttonStyle = [styles.buttonStyle, this.props.buttonStyle];
    const containerViewStyle = [styles.containerViewStyle, this.props.containerViewStyle];
    const textStyle = [styles.textStyle, this.props.textStyle]
    const borderRadius = this.props.borderRadius ? this.props.borderRadius : BUTTON_RADIUS;

    return (
      <ElementsButton
        {...this.props}
        title={title}
        backgroundColor={backgroundColor}
        color={color}
        borderRadius={borderRadius}
        buttonStyle={buttonStyle}
        containerViewStyle={containerViewStyle}
        textStyle={textStyle}
      />
    );
  }

}

export const ButtonStyle = styles;

//TODO: Add to AppRegistry ???