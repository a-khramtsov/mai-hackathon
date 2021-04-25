import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../router";

const useTypedRoute = <T extends keyof RootStackParamList>() => {
    type Route = RouteProp<RootStackParamList, T>;
    return useRoute<Route>();
};

export default useTypedRoute;
