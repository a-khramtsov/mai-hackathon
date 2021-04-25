import React, { FC, useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { RefreshControl, StyleSheet, View } from "react-native";
import { Appbar, Headline } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import ApplicationCard from "../components/ApplicationCard";
import { RootState } from "../reducers";
import { setApplications } from "../reducers/app";
import { getApplications } from "../api";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const ApplicationHistory: FC = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { applications } = useSelector((state: RootState) => state.app);
    const isFocused = useIsFocused();
    useEffect(() => {
        loadApplications();
        console.log("LoaDING");
    }, [isFocused]);
    const loadApplications = useCallback(() => {
        getApplications()
            .then(i => {
                dispatch(setApplications(i));
            })
            .catch(e =>
                console.log(
                    "ERROR ON GETTING APPLICATIONS",
                    JSON.stringify(e.response, null, 2),
                ),
            )
            .finally(() => setLoading(false));
    }, [dispatch]);
    return (
        <>
            <Appbar.Header statusBarHeight={0}>
                <Appbar.Content title="История заявок" />
            </Appbar.Header>
            <FlatList
                ListEmptyComponent={
                    <View style={styles.placeholderContainer}>
                        <Headline>Пока нет заявок</Headline>
                    </View>
                }
                data={applications}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={loadApplications}
                    />
                }
                keyExtractor={item => "" + item.id}
                renderItem={({ item }) => (
                    <ApplicationCard application={item} />
                )}
            />
        </>
    );
};

export default ApplicationHistory;

const styles = StyleSheet.create({
    placeholderContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
