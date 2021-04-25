import { useSelector } from "react-redux";
import { RootState } from "../reducers";

export default () => {
    const { snackBar } = useSelector((state: RootState) => state.app);
};
