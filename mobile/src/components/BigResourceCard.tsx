import React, { FC } from "react";
import { Image, StyleSheet } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { Resource } from "../types";

interface IProps {
    resource: Resource;
}

const BigResourceCard: FC<IProps> = ({
    resource: { title, id, photo, description },
}) => {
    return (
        <Card style={styles.card}>
            <Title>{title} </Title>
            <Paragraph>
                {"#"}
                {id}
            </Paragraph>
            <Image
                style={styles.image}
                source={{ uri: photo }}
                resizeMode="contain"
            />
            <Paragraph>{description}</Paragraph>
        </Card>
    );
};

export default BigResourceCard;

const styles = StyleSheet.create({
    image: {
        height: 300,
        borderRadius: 8,
    },
    card: { padding: 8, margin: 4 },
});
