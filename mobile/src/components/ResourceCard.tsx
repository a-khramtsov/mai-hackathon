import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Title, Paragraph, Card } from "react-native-paper";

import { Resource } from "../types";

interface IProps {
    resource: Resource;
}

const ResourceCard: FC<IProps> = ({ resource }) => {
    const navigation = useNavigation();
    const { title, description, id, photo } = resource;
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("Resource", { resource })}>
            <Card style={styles.card}>
                <Title>
                    {title}
                    {/* <Paragraph>
                        {"#"}
                        {id}
                    </Paragraph> */}
                </Title>
                <Image
                    style={styles.image}
                    source={{ uri: photo }}
                    resizeMode="contain"
                />
                <Paragraph>{description}</Paragraph>
            </Card>
        </TouchableOpacity>
    );
};

export default ResourceCard;

const styles = StyleSheet.create({
    card: {
        margin: 4,
        padding: 8,
    },
    image: {
        height: 100,
        borderRadius: 8,
    },
});
