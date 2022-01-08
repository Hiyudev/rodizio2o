import { Modes } from "../shared";
import useLocalStorage from "./useLocalStorage";

function useMode() {
	return useLocalStorage<Modes>("@mode", Modes.CEPNUM);
}

export default useMode;
