import React, { useState, FC, useEffect, useMemo, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Card, Title, Subheading, Paragraph, Colors } from "react-native-paper";
import dayjs from "dayjs";

import Rating from "../components/Rating";
import { Application, Status } from "../types";
import { formatStatus } from "../util";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { rateApplication } from "../api";

interface IProps {
    application: Application;
}

const ApplicationCard: FC<IProps> = ({
    application: {
        id,
        end_time,
        start_time,
        status,
        resource,
        parking_place,
        resource_estimation,
        service_estimation,
    },
}) => {
    const { resources } = useSelector((state: RootState) => state.app);
    const currentResource = useMemo(
        () => resources.find(({ id }) => id === resource),
        [resource, resources],
    );
    const [resourceLock, setResourceLock] = useState(resource_estimation || 0);
    const [serviceLock, setServiceLock] = useState(service_estimation || 0);
    const style = useMemo(() => {
        switch (status) {
            case Status.APPROVED_BY_AIRLINE:
                return styles.accepted;
            case Status.CANCELLED:
                return styles.canceled;
            case Status.NEW:
                return styles.new;
            default:
                return styles.pending;
        }
    }, [status]);

    const onResourceRate = useCallback(
        (rating: number) => {
            rateApplication({ id, resource: rating })
                .then(r => {
                    console.log("DONE");
                    setResourceLock(rating);
                })
                .catch(e => console.log(JSON.stringify(e.response)));
        },
        [id],
    );
    const onServiceRate = useCallback(
        (rating: number) => {
            rateApplication({ id, service: rating })
                .then(r => {
                    console.log("DONE");
                    setServiceLock(rating);
                })
                .catch(e => console.log(JSON.stringify(e.response)));
        },
        [id],
    );

    return (
        <Card style={styles.card}>
            <Title>Заявка №{id}</Title>
            <Paragraph>
                От {dayjs(start_time).format("HH:mm DD.MM")} до{" "}
                {dayjs(end_time).format("HH:mm DD.MM")}
            </Paragraph>
            <Paragraph>
                Статус:{" "}
                <Paragraph style={style}>{formatStatus(status)}</Paragraph>
            </Paragraph>
            <Paragraph>Ресурс: {currentResource.title}</Paragraph>
            <Paragraph>Место №{parking_place}</Paragraph>
            <Paragraph>Оценить ресурс: </Paragraph>
            <Rating rating={resourceLock} onPress={onResourceRate} />
            {/* <Rating
                imageSize={30}
                startingValue={resource_estimation || 0}
                readonly={resourceLock}
                onFinishRating={onResourceRate}
            /> */}
            <Paragraph>Оценить сервис: </Paragraph>
            <Rating rating={serviceLock} onPress={onServiceRate} />
            {/* <Rating
                imageSize={30}
                startingValue={service_estimation || 0}
                readonly={serviceLock}
                onFinishRating={onServiceRate}
            /> */}
        </Card>
    );
};

export default ApplicationCard;

const styles = StyleSheet.create({
    card: { margin: 4, padding: 8 },
    pending: { color: Colors.amber500 },
    accepted: { color: Colors.green500 },
    canceled: { color: Colors.red500 },
    new: { color: Colors.blue500 },
});
