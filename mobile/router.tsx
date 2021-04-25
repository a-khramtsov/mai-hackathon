import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigatorScreenParams } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import LogIn from "./src/screens/LogIn";
import Resources from "./src/screens/Resources";
import Resource from "./src/screens/Resource";
import ApplicationHistory from "./src/screens/Main";

import { RootState } from "./src/reducers";
import useSetToken from "./src/hooks/useSetToken";
import { Resource as IResource } from "./src/types";
import { Snackbar } from "react-native-paper";
import { setSnackBar } from "./src/reducers/app";

export type RootStackParamList = {
    LogIn: undefined;
    Home: NavigatorScreenParams<HomeTabsParamList>;
};

export type HomeTabsParamList = {
    ResourcesList: NavigatorScreenParams<ResourceStackParamList>;
    ApplicationHistory: NavigatorScreenParams<ApplicationStackParamList>;
};

export type ResourceStackParamList = {
    ResourcesList: undefined;
    Resource: { resource: IResource };
};

export type ApplicationStackParamList = {
    ApplicationHistory: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const BottomTabs = createMaterialBottomTabNavigator<HomeTabsParamList>();
const ResourceStack = createStackNavigator<ResourceStackParamList>();
const ApplicationStack = createStackNavigator<ApplicationStackParamList>();

const ResourcesStack: FC = () => (
    <ResourceStack.Navigator
        initialRouteName="ResourcesList"
        screenOptions={{
            headerShown: false,
        }}>
        <ResourceStack.Screen name="ResourcesList" component={Resources} />
        <ResourceStack.Screen name="Resource" component={Resource} />
    </ResourceStack.Navigator>
);

const ApplicationsStack: FC = () => (
    <ApplicationStack.Navigator
        initialRouteName="ApplicationHistory"
        screenOptions={{
            headerShown: false,
        }}>
        <ApplicationStack.Screen
            name="ApplicationHistory"
            component={ApplicationHistory}
        />
    </ApplicationStack.Navigator>
);

const Home: FC = () => {
    return (
        <BottomTabs.Navigator
            initialRouteName="ResourcesList"
            barStyle={styles.barStyle}>
            <BottomTabs.Screen
                name="ResourcesList"
                component={ResourcesStack}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icons
                            name="hammer-screwdriver"
                            color={color}
                            size={26}
                        />
                    ),
                    title: "Ресурсы",
                }}
            />
            <BottomTabs.Screen
                name="ApplicationHistory"
                component={ApplicationsStack}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icons name="file" color={color} size={26} />
                    ),
                    title: "История заявлений",
                }}
            />
        </BottomTabs.Navigator>
    );
};

const Router: FC = () => {
    const isLoggedIn = useSelector((state: RootState) => !!state.user.access);
    useSetToken();
    const initialRouteName = isLoggedIn ? "Home" : "LogIn";
    const { snackBar } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();

    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName={initialRouteName}
                headerMode="none">
                <Stack.Screen name="LogIn" component={LogIn} />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
            <Snackbar
                visible={!!snackBar}
                duration={3000}
                onDismiss={() => dispatch(setSnackBar(""))}>
                {snackBar}
            </Snackbar>
        </>
    );
};

export default Router;

const styles = StyleSheet.create({
    barStyle: {
        elevation: 100,
    },
});
