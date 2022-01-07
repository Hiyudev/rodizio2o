import { Dispatch, SetStateAction } from "react";
import { IAddress } from "../shared";
import useLocalStorage from "./useLocalStorage";

const useAddress = (): [IAddress, Dispatch<SetStateAction<IAddress>>] => {
	const initialValue: IAddress = {
		cep: "",
		num: "",
		street: "",
	};
	const [address, setAddress] = useLocalStorage<IAddress>(
		"@address",
		initialValue
	);

	return [address, setAddress];
};

export default useAddress;
