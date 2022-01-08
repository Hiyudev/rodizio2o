import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { IAddress } from "../../shared";
import useDebounce from "../../hooks/useDebounce";
import useAddress from "../../hooks/useAddress";

interface IToolAddressBar {
	error: string;
	setError: Dispatch<SetStateAction<string>>;
}

function ToolAddressBar({ error, setError }: IToolAddressBar) {
	const initialAddress: IAddress = {
		cep: "",
		num: "",
		street: "",
	};
	const [address, setAddress] = useAddress();
	const [loaded, setLoaded] = useState(false);

	const [usingStreet, setUsingStreet] = useState(false);
	const toggleStreet = () => setUsingStreet(!usingStreet);

	const [inputValues, setInputValues] = useState<IAddress>(initialAddress);
	const changeInputValue = (key, value) => {
		setInputValues({ ...address, [key]: value });
	};
	const debounceInputValues = useDebounce(inputValues, 800);

	useEffect(() => {
		setInputValues(address);
		setLoaded(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const invalidCep = debounceInputValues?.cep?.length !== 8;
		const invalidStreet = debounceInputValues?.street?.length <= 5;
		if (invalidCep || invalidStreet) {
			let message = invalidCep
				? "CEP colocado é inválido"
				: "Rua colocada é inválido";

			setError(error.length > 0 ? error : message);
		} else {
			setError("");
			setAddress(debounceInputValues);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debounceInputValues]);

	return (
		<div className="flex flex-col space-y-4">
			<div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
				{usingStreet ? (
					<div className="flex flex-grow flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 md:items-center">
						<label htmlFor="street">Endereço de sua residência</label>
						<input
							disabled={!loaded}
							className="bg-gray-700 p-2 px-5 rounded-full flex-grow"
							name="street"
							defaultValue={inputValues.street}
							onChange={(e) => changeInputValue("street", e.target.value)}
						/>
					</div>
				) : (
					<Fragment>
						<div className="flex flex-grow flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 md:items-center">
							<label htmlFor="cep">CEP</label>
							<input
								disabled={!loaded}
								className="bg-gray-700 p-2 px-5 rounded-full flex-grow"
								name="cep"
								defaultValue={inputValues.cep}
								onChange={(e) => changeInputValue("cep", e.target.value)}
							/>
						</div>
						<div className="flex flex-grow flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 md:items-center">
							<label htmlFor="numero">Número de sua residência</label>
							<input
								disabled={!loaded}
								className="bg-gray-700 p-2 px-5 rounded-full flex-grow"
								name="numero"
								defaultValue={inputValues.num}
								onChange={(e) => changeInputValue("num", e.target.value)}
							/>
						</div>
					</Fragment>
				)}
			</div>
			<button
				className="p-2 rounded-full bg-blue-600 dark:bg-blue-400 hover:bg-blue-500 transition-colors"
				onClick={toggleStreet}
			>
				Trocar
			</button>
		</div>
	);
}

export default ToolAddressBar;
