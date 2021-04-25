import React, { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import StarEmpty from "../../svg/star-empty.svg";
import StarSelected from "../../svg/star-selected.svg";

interface IProps {
    selected: boolean;
    onSelect: () => void;
}

const Star: FC<IProps> = ({ selected, onSelect }) => {
    const size = 30;
    return (
        <TouchableOpacity onPress={onSelect}>
            {selected ? (
                <StarSelected width={size} height={size} />
            ) : (
                <StarEmpty width={size} height={size} />
            )}
        </TouchableOpacity>
    );
};

export default Star;

const styles = StyleSheet.create({});
