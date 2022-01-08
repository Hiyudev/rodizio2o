import {
	Dispatch,
	Fragment,
	SetStateAction,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { IAddress, Modes } from "../../shared";
import useDebounce from "../../hooks/useDebounce";
import useAddress from "../../hooks/useAddress";
import useMode from "../../hooks/useMode";
import useOnClickOutside from "../../hooks/useClickOutside";
import { getSuggestions } from "../../lib/Suggestion";

interface IToolAddressBar {
	systemLoaded: boolean;
	error: string;
	setError: Dispatch<SetStateAction<string>>;
}

function ToolAddressBar({ systemLoaded, error, setError }: IToolAddressBar) {
	// Address section
	const initialAddress: IAddress = {
		cep: "",
		num: "",
		street: "",
	};
	const [address, setAddress] = useAddress();
	const [loaded, setLoaded] = useState(false);

	const [mode, setMode] = useMode();

	const [usingStreet, setUsingStreet] = useState(mode === Modes.STREET);
	const toggleStreet = () => {
		if (usingStreet) {
			setMode(Modes.CEPNUM);
			setUsingStreet(false);
		} else {
			setMode(Modes.STREET);
			setUsingStreet(true);
		}
	};

	const [inputValues, setInputValues] = useState<IAddress>(initialAddress);
	const changeInputValue = (key, value) => {
		setInputValues({ ...address, [key]: value });
	};
	const debounceInputValues = useDebounce(inputValues, 1500);

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

	// Suggestions
	const [show, setShow] = useState(false);
	const [suggestions, setSuggestions] = useState<string[]>();
	const searchRef = useRef(null);
	const desFocus = () => {
		setShow(false);
	};
	useOnClickOutside(searchRef, desFocus);

	useEffect(() => {
		getSuggestions(debounceInputValues.street).then((res) => {
			res = res.filter((v) => v !== debounceInputValues.street);
			setSuggestions(res);
		});
	}, [debounceInputValues.street]);

	return (
		<div className="flex flex-col space-y-4">
			<div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
				{usingStreet ? (
					<div className="flex flex-grow flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 md:items-center relative">
						<label htmlFor="street">Endereço de sua residência</label>
						<div className="w-full" ref={searchRef}>
							<input
								disabled={!loaded || !systemLoaded}
								name="street"
								value={inputValues.street}
								ref={searchRef}
								autoComplete="off"
								className="bg-gray-700 p-2 px-5 rounded-full w-full"
								onChange={(e) => changeInputValue("street", e.target.value)}
								onFocus={(e) => setShow(true)}
							/>
							{show && suggestions?.length > 0 && (
								<ul className="absolute top-0 w-full rounded-3xl !mt-20 p-4 space-y-4 bg-gray-300 dark:bg-gray-700">
									{suggestions ? (
										suggestions.map((v, i) => {
											return (
												<li key={i}>
													<button
														onClick={() => {
															changeInputValue("street", v);
															setShow(false);
														}}
													>
														{v}
													</button>
												</li>
											);
										})
									) : (
										<Fragment>
											<li className="bg-black dark:bg-white rounded-full animate-pulse"></li>
											<li className="bg-black dark:bg-white rounded-full animate-pulse"></li>
											<li className="bg-black dark:bg-white rounded-full animate-pulse"></li>
										</Fragment>
									)}
								</ul>
							)}
						</div>
					</div>
				) : (
					<Fragment>
						<div className="flex flex-grow flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 md:items-center">
							<label htmlFor="cep">CEP</label>
							<input
								disabled={!loaded || !systemLoaded}
								className="bg-gray-700 disabled:bg-gray-800 disabled:text-gray-400 transition-colors p-2 px-5 rounded-full flex-grow"
								name="cep"
								value={inputValues.cep}
								onChange={(e) => changeInputValue("cep", e.target.value)}
							/>
						</div>
						<div className="flex flex-grow flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 md:items-center">
							<label htmlFor="numero">Número de sua residência</label>
							<input
								disabled={!loaded || !systemLoaded}
								className="bg-gray-700 disabled:bg-gray-800 disabled:text-gray-400 transition-colors p-2 px-5 rounded-full flex-grow"
								name="numero"
								value={inputValues.num}
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
