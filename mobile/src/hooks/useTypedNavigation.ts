import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../router";

const useTypedNavigation = <T extends keyof RootStackParamList>() => {
    type Navigation = StackNavigationProp<RootStackParamList, T>;
    return useNavigation<Navigation>();
};

export default useTypedNavigation;
