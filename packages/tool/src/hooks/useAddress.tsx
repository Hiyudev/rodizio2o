interface IAddress {
	cep: string;
	num: string;
	street: string;
}
import useLocalStorage from "./useLocalStorage";

const useAddress = (): [IAddress, (key: string, value: string) => void] => {
	const initialValue: IAddress = {
		cep: "",
		num: "",
		street: "",
	};
	const [address, setAddress] = useLocalStorage<IAddress>(
		"@address",
		initialValue
	);

	const changeAddress = (key: string, value: string) => {
		setAddress({ ...address, [key]: value });
	};

	return [address, changeAddress];
};

export default useAddress;
