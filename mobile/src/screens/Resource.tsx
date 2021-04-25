/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RouteProp, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import React, { FC, useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Appbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { ResourceStackParamList } from "../../router";
import { createApplication } from "../api";
import BigResourceCard from "../components/BigResourceCard";
import CreateApplication from "../components/CreateApplication";
import useTypedNavigation from "../hooks/useTypedNavigation";
import { RootState } from "../reducers";
import { setSnackBar } from "../reducers/app";

const Resource: FC = () => {
    const { resource } = useRoute<
        RouteProp<ResourceStackParamList, "Resource">
    >().params;
    const navigation = useTypedNavigation<"Home">();
    const [start, setStart] = useState<Date>();
    const [end, setEnd] = useState<Date>();
    const [parkingSpace, setParkingSpace] = useState("");
    const user = useSelector((state: RootState) => state.user.id);
    const dispatch = useDispatch();

    const onSubmit = useCallback(() => {
        createApplication({
            start_time: dayjs(start).format("YYYY-MM-DDTHH:mm"),
            end_time: dayjs(end).format("YYYY-MM-DDTHH:mm"),
            user,
            resource: resource.id,
            parking_place: +parkingSpace,
        })
            .then(r => {
                console.log(r);
                dispatch(setSnackBar("Заявка успешно создана"));
                navigation.navigate("Home", { screen: "ApplicationHistory" });
            })
            .catch(e =>
                console.log(
                    "ERROR ON CREATING APPLICATION",
                    JSON.stringify(e.response, null, 2),
                ),
            );
    }, [dispatch, end, navigation, parkingSpace, resource.id, start, user]);

    return (
        <>
            <Appbar.Header statusBarHeight={0}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={resource.title} />
            </Appbar.Header>
            <ScrollView>
                <BigResourceCard resource={resource} />
                <CreateApplication
                    {...{
                        start,
                        setEnd,
                        setParkingSpace,
                        setStart,
                        end,
                        parkingSpace,
                        onSubmit,
                    }}
                />
            </ScrollView>
        </>
    );
};

export default Resource;

const styles = StyleSheet.create({});
