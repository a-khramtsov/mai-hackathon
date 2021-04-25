import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import Star from "./Star";

interface IProps {
    rating: number;
    onPress: (rating: number) => void;
}

const Rating: FC<IProps> = ({ rating, onPress }) => {
    return (
        <View style={styles.container}>
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                    onSelect={() => onPress(i)}
                    selected={rating >= i}
                    key={"" + i}
                />
            ))}
        </View>
    );
};

export default Rating;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        width: "60%",
        alignSelf: "center",
    },
});
