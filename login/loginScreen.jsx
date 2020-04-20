import React from "react";
import { View, TextInput, Image, Button, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as yup from "yup";

const LoginScreen = props => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .email("Email invalide")
          .required("Email requis"),
        password: yup
          .string()
          .min(8)
          .required("Mot de passe requis")
      })}
    >
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit
      }) => (
        <SafeAreaView style={styles.container}>
          <View style={styles.title_block}>
            <Text>{"Some random title".toUpperCase()}</Text>
          </View>
          <View style={styles.input_block}>
            <TextInput
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
              placeholder="Email"
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
            <TextInput
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={() => setFieldTouched("password")}
              placeholder="Mot de passe"
              secureTextEntry={true}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
          </View>
          <View style={styles.validation_block}>
            <Button
              title="Valider"
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  title_block: {
    flex: 1,
    justifyContent: "center"
  },
  input_block: {
    flex: 2,
    justifyContent: "center"
  },
  validation_block: {
    flex: 1,
    width: 100,
    justifyContent: "center"
  },
  error: {
    fontSize: 10,
    color: "red"
  }
});

export default LoginScreen;
