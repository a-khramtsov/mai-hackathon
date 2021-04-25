import React, { FC, useCallback, useState } from "react";
import { RefreshControl, StyleSheet, View, FlatList } from "react-native";
import { Appbar, Headline } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getResources } from "../api";
import ResourceCard from "../components/ResourceCard";
import { RootState } from "../reducers";
import { setResources } from "../reducers/app";

const Resources: FC = () => {
    const { resources } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const loadResources = useCallback(() => {
        console.log("GETTING STAFF");
        setLoading(true);
        getResources()
            .then(i => {
                dispatch(setResources(i));
            })
            .catch(e =>
                console.log(
                    "ERROR ON GETTING RESOURCES",
                    JSON.stringify(e.response, null, 2),
                ),
            )
            .finally(() => setLoading(false));
    }, [dispatch]);
    return (
        <>
            <Appbar.Header statusBarHeight={0}>
                <Appbar.Content title="Ресурсы" />
            </Appbar.Header>
            <FlatList
                ListEmptyComponent={
                    <View style={styles.placeholderContainer}>
                        <Headline>Пока нет ресурсов</Headline>
                    </View>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={loadResources}
                    />
                }
                data={resources}
                keyExtractor={item => "" + item.id}
                renderItem={({ item }) => <ResourceCard resource={item} />}
            />
        </>
    );
};

export default Resources;

const styles = StyleSheet.create({
    placeholderContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
