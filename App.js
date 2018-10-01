import React from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";

const initialState = {
  email: "",
  password: "",
  errors: {},
  touched: {}
};
export default class App extends React.Component {
  state = { ...initialState };
  handleSubmit = () => {
    Alert.alert(JSON.stringify(this.state));
  };
  handleEmailChange = text => {
    this.setState({ email: text });
  };
  handlePasswordChange = text => {
    this.setState({ password: text });
  };

  componentDidMount() {
    this.validate();
  }

  validate = () => {
    let errors = {};
    if (this.state.email.length < 10) {
      errors.email = "Your email should be at least 10 characters";
    }
    if (this.state.password.length < 8) {
      errors.password = "Your password should be at least 8 characters";
    }
    let touched = {};
    touched.email = this.state.email !== initialState.email;
    touched.password = this.state.password !== initialState.password;
    this.setState({ errors, touched });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          Login
        </Text>
        <Text>Email</Text>
        <TextInput
          value={this.state.email}
          onChangeText={this.handleEmailChange}
          onBlur={this.validate}
          style={{
            width: "100%",
            height: 40,
            borderColor:
              this.state.touched.email && this.state.errors.email
                ? "red"
                : "gray",
            borderWidth: 1
          }}
        />
        {this.state.touched.email && <Text>{this.state.errors.email}</Text>}
        <Text>Password</Text>
        <TextInput
          secureTextEntry
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          onBlur={this.validate}
          style={{
            width: "100%",
            height: 40,
            borderColor:
              this.state.touched.password && this.state.errors.password
                ? "red"
                : "gray",
            borderWidth: 1
          }}
        />
        {this.state.touched.password && (
          <Text>{this.state.errors.password}</Text>
        )}

        <Button
          title="Submit"
          disabled={Object.keys(this.state.errors).length > 0}
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});
