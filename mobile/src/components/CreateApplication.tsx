import React, { FC, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph, Button, TextInput } from "react-native-paper";
import dayjs from "dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

interface IProps {
    start?: Date;
    end?: Date;
    setStart: (start: Date) => void;
    setEnd: (end: Date) => void;
    onSubmit: () => void;
    parkingSpace: string;
    setParkingSpace: (space: string) => void;
}

const CreateApplication: FC<IProps> = ({
    start,
    end,
    setStart,
    setEnd,
    onSubmit,
    parkingSpace,
    setParkingSpace,
}) => {
    const [mode, setMode] = useState<"start" | "end">("start");
    const [visible, setVisible] = useState(false);
    const { parkingPlaces } = useSelector((state: RootState) => state.app);

    const onPress = useCallback((mode: "start" | "end") => {
        setMode(mode);
        setVisible(true);
    }, []);

    const onConfirm = useCallback(
        (date: Date) => {
            if (mode === "start") {
                setStart(date);
            } else {
                setEnd(date);
            }
            setVisible(false);
        },
        [mode, setEnd, setStart],
    );

    return (
        <Card style={styles.card}>
            {start ? (
                <View style={styles.row}>
                    <Paragraph>
                        Начало: {dayjs(start).format("HH:mm DD.MM.YY")}
                    </Paragraph>
                    <Button onPress={() => onPress("start")}>Изменить</Button>
                </View>
            ) : (
                <Button onPress={() => onPress("start")}>
                    Выбрать время начала
                </Button>
            )}
            {end ? (
                <View style={styles.row}>
                    <Paragraph>
                        Конец: {dayjs(end).format("HH:mm DD.MM.YY")}
                    </Paragraph>
                    <Button onPress={() => onPress("end")}>Изменить</Button>
                </View>
            ) : (
                <Button onPress={() => onPress("end")}>
                    Выбрать время конца
                </Button>
            )}
            <DateTimePickerModal
                mode="datetime"
                onCancel={() => setVisible(false)}
                isVisible={visible}
                onConfirm={onConfirm}
                minimumDate={new Date()}
                date={mode === "start" ? start : end}
            />
            <Picker
                selectedValue={parkingSpace}
                onValueChange={itemValue => setParkingSpace(itemValue)}>
                {parkingPlaces.map(i => (
                    <Picker.Item label={i.code} value={i.id} key={i.id} />
                ))}
            </Picker>

            {/* <TextInput
                style={styles.input}
                keyboardType="number-pad"
                value={parkingSpace}
                onChangeText={setParkingSpace}
                label="Место"
                mode="outlined"
            /> */}
            <Button onPress={onSubmit}>Создать заявку</Button>
        </Card>
    );
};

export default CreateApplication;

const styles = StyleSheet.create({
    card: { padding: 8, margin: 4 },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    input: { width: "40%", alignSelf: "center", height: 40 },
});
