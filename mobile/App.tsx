import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

import { persistor, store } from "./src/store";
import Router from "./router";

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <Paper />
            </PersistGate>
        </Provider>
    );
}

const Paper: FC = () => {
    return (
        <PaperProvider theme={DefaultTheme}>
            <NavigationContainer>
                <Router />
            </NavigationContainer>
        </PaperProvider>
    );
};
