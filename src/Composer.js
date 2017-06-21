import React from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';

export default class Composer extends React.Component {
  onChange(e) {
    const contentSize = e.nativeEvent.contentSize;
    if (!this.contentSize) {
      this.contentSize = contentSize;
      this.props.onInputSizeChanged(this.contentSize);
    } else if (this.contentSize.width !== contentSize.width || this.contentSize.height !== contentSize.height) {
      this.contentSize = contentSize;
      this.props.onInputSizeChanged(this.contentSize);
    }
  }

  onChangeText(text) {
    this.props.onTextChanged(text);
  }

  render() {
    return (
      <TextInput
        placeholder={this.props.placeholder}
        placeholderTextColor={this.props.placeholderTextColor}
        multiline={this.props.multiline}

        onChange={(e) => this.onChange(e)}
        onChangeText={text => this.onChangeText(text)}

        style={[styles.textInput, this.props.textInputStyle, {height: this.props.composerHeight}]}

        value={this.props.text}
        accessibilityLabel={this.props.text || this.props.placeholder}
        enablesReturnKeyAutomatically={true}
        underlineColorAndroid="transparent"
        {...this.props.textInputProps}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color:'#13222a',
    lineHeight: 16,
    marginTop: Platform.select({
      ios: 6,
      android: 7,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 8,
    }),
    height: 32,
  	borderRadius: 20,
    paddingLeft:12,
  	backgroundColor: "#ffffff",
  	borderStyle: "solid",
  	borderWidth: 1,
    marginRight:16,
    minHeight: 32,
  	borderColor: "#c7d8de"
  },
});

Composer.defaultProps = {
  onChange: () => {
  },
  composerHeight: Platform.select({
    ios: 33,
    android: 32,
  }), // TODO SHARE with GiftedChat.js and tests
  text: '',
  placeholder: 'Type a message...',
  placeholderTextColor: '#90a5ae',
  textInputProps: null,
  multiline: true,
  textInputStyle: {},
  onTextChanged: () => {
  },
  onInputSizeChanged: () => {
  },
};

Composer.propTypes = {
  onChange: React.PropTypes.func,
  composerHeight: React.PropTypes.number,
  text: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  placeholderTextColor: React.PropTypes.string,
  textInputProps: React.PropTypes.object,
  onTextChanged: React.PropTypes.func,
  onInputSizeChanged: React.PropTypes.func,
  multiline: React.PropTypes.bool,
  textInputStyle: TextInput.propTypes.style,
};
