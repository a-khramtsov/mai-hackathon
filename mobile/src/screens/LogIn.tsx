import React, { FC, useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import useTypedNavigation from "../hooks/useTypedNavigation";
import { StackActions } from "@react-navigation/routers";
import { getToken, setToken } from "../api";
import { useDispatch } from "react-redux";
import { setTokens } from "../reducers/user";

const validationSchema = Yup.object({
    email: Yup.string()
        .required("Введите email")
        .trim()
        .email("Введите правильный email адрес"),
    password: Yup.string().required("Введите пароль").trim(),
});

const LogIn: FC = () => {
    const navigation = useTypedNavigation<"LogIn">();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const onSubmit = useCallback(
        async (credentials: { email: string; password: string }) => {
            try {
                setLoading(true);
                const tokens = await getToken(credentials);
                dispatch(setTokens(tokens));
                setToken(tokens.access);
                setLoading(false);
                navigation.dispatch(StackActions.replace("Home"));
            } catch (e) {
                setLoading(false);
                console.log(JSON.stringify(e.response, null, 2));
            }
        },
        [navigation, dispatch],
    );
    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    email: "common@yandex.ru",
                    password: "qwerty1234",
                }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                    <View style={styles.container}>
                        <TextInput
                            style={styles.textInput}
                            value={values.email}
                            placeholder="Email"
                            mode="outlined"
                            error={!!errors.email && touched.email}
                            label={errors.email || "Email"}
                            onChangeText={handleChange("email")}
                            autoCompleteType="email"
                        />
                        <TextInput
                            style={styles.textInput}
                            value={values.password}
                            placeholder="Пароль"
                            mode="outlined"
                            error={!!errors.password && touched.password}
                            label={errors.password || "Пароль"}
                            onChangeText={handleChange("password")}
                            autoCompleteType="password"
                            secureTextEntry
                        />
                        <Button
                            mode="outlined"
                            onPress={handleSubmit}
                            loading={loading}>
                            Войти
                        </Button>
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default LogIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        marginBottom: 8,

        width: "70%",
    },
});
