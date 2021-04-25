import React, { useState, FC, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Card, Title, Subheading, Paragraph } from "react-native-paper";
import dayjs from "dayjs";

import { Application } from "../types";
import { formatStatus } from "../util";

interface IProps {
    application: Application;
}

const ApplicationCard: FC<IProps> = ({
    application: { id, end_time, start_time, status, resource },
}) => {
    return (
        <Card style={styles.card}>
            <Title>Заявка №{id}</Title>
            <Paragraph>
                От {dayjs(start_time).format("HH:mm DD.MM.YY")} до{" "}
                {dayjs(end_time).format("HH:mm DD.MM.YY")}
            </Paragraph>
            <Paragraph>Статус: {formatStatus(status)}</Paragraph>
        </Card>
    );
};

export default ApplicationCard;

const styles = StyleSheet.create({
    card: { margin: 4, padding: 8 },
});
