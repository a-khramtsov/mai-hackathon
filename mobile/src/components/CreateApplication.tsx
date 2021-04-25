import React, { FC, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph, Button, TextInput } from "react-native-paper";
import dayjs from "dayjs";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { TimePickerModal } from "react-native-paper-dates";

interface IProps {
    start?: Date;
    end?: Date;
    setStart: (start: Date) => void;
    setEnd: (end: Date) => void;
    onSubmit: () => void;
    parkingSpace: number;
    setParkingSpace: (space: number) => void;
    loading: boolean;
    disabled: boolean;
}

const CreateApplication: FC<IProps> = ({
    start,
    end,
    setStart,
    setEnd,
    onSubmit,
    parkingSpace,
    setParkingSpace,
    loading,
    disabled,
}) => {
    const [mode, setMode] = useState<"start" | "end">("start");
    const [visible, setVisible] = useState(false);
    const { parkingPlaces } = useSelector((state: RootState) => state.app);

    const onPress = useCallback((mode: "start" | "end") => {
        setMode(mode);
        setVisible(true);
    }, []);

    const onConfirm = ({
        hours,
        minutes,
    }: {
        hours: number;
        minutes: number;
    }) => {
        if (mode === "start") {
            setStart(
                dayjs()
                    .hour(hours > dayjs().hour() ? hours : hours + 24)
                    .minute(minutes)
                    .toDate(),
            );
        } else {
            let date = dayjs().hour(hours).minute(minutes);
            if (date.isBefore(dayjs(start))) {
                date = date.add(1, "day");
            }
            setEnd(date.toDate());
        }
        setVisible(false);
    };

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
            <TimePickerModal
                visible={visible}
                onDismiss={() => setVisible(false)}
                onConfirm={onConfirm}
                cancelLabel="Отмена" // optional, default: 'Cancel'
                confirmLabel="ОК" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale={"ru"} // optional, default is automically detected by your system
            />
            <Picker
                selectedValue={parkingSpace}
                onValueChange={itemValue => setParkingSpace(itemValue)}>
                {parkingPlaces.map(i => (
                    <Picker.Item label={i.code} value={i.id} key={i.id} />
                ))}
            </Picker>
            <Button onPress={onSubmit} loading={loading} disabled={disabled}>
                Создать заявку
            </Button>
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
});
