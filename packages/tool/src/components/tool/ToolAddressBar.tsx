import { Fragment, useEffect, useRef, useState } from "react";
import { IAddress, Modes } from "../../shared";
import useDebounce from "../../hooks/useDebounce";
import useAddress from "../../hooks/useAddress";
import useMode from "../../hooks/useMode";
import useOnClickOutside from "../../hooks/useClickOutside";
import { getSuggestions } from "../../lib/Suggestion";
import { useRodizio } from "../../hooks/useRodizio";

interface IToolAddressBar {
	loaded: boolean;
}

function ToolAddressBar({ loaded }: IToolAddressBar) {
	const [address, setAddress] = useAddress();
	const [mode, setMode] = useMode();
	const { syncRodizio } = useRodizio();

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

	const [inputValues, setInputValues] = useState<IAddress>(address);
	const changeInputValue = (key, value) => {
		setInputValues({ ...inputValues, [key]: value });
	};

	const debounceInputValues = useDebounce(inputValues, 1500);

	useEffect(() => {
		setAddress(debounceInputValues);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debounceInputValues]);

	useEffect(() => {
		syncRodizio();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address]);

	// Suggestions
	const [show, setShow] = useState(false);
	const [suggestions, setSuggestions] = useState<string[]>();
	const searchRef = useRef(null);
	const desFocus = () => {
		setShow(false);
	};
	useOnClickOutside(searchRef, desFocus);

	useEffect(() => {
		if (!show) return;
		getSuggestions(address.street).then((res) => {
			res = res.filter((v) => v !== address.street);
			setSuggestions(res);
		});
	}, [show, address.street]);

	return (
		<div className="flex flex-col space-y-4">
			<div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
				{usingStreet ? (
					<div className="flex flex-grow flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 md:items-center relative">
						<label htmlFor="street">Endereço de sua residência</label>
						<div className="w-full" ref={searchRef}>
							<input
								disabled={!loaded}
								name="street"
								value={inputValues.street}
								ref={searchRef}
								autoComplete="off"
								className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 hover:dark:bg-gray-600 transition-colors p-2 px-5 rounded-full w-full "
								onChange={(e) => changeInputValue("street", e.target.value)}
								onFocus={() => setShow(true)}
							/>
							{show && suggestions?.length > 0 && (
								<ul className="absolute top-0 w-full rounded-3xl !mt-20">
									{suggestions ? (
										suggestions.map((v, i) => {
											return (
												<button
													key={i}
													className={
														"bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 hover:dark:bg-gray-600 p-4 transition-colors"
													}
													onClick={() => {
														changeInputValue("street", v);
														setShow(false);
													}}
												>
													{v}
												</button>
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
								disabled={!loaded}
								className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 hover:dark:bg-gray-600 disabled:bg-gray-300 disabled:dark:bg-gray-800 disabled:text-gray-400 transition-colors p-2 px-5 rounded-full flex-grow"
								name="cep"
								value={inputValues.cep}
								onChange={(e) => changeInputValue("cep", e.target.value)}
							/>
						</div>
						<div className="flex flex-grow flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 md:items-center">
							<label htmlFor="numero">Número de sua residência</label>
							<input
								disabled={!loaded}
								className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 hover:dark:bg-gray-600 disabled:bg-gray-300 disabled:dark:bg-gray-800 disabled:text-gray-400 transition-colors p-2 px-5 rounded-full flex-grow"
								name="numero"
								value={inputValues.num}
								onChange={(e) => changeInputValue("num", e.target.value)}
							/>
						</div>
					</Fragment>
				)}
			</div>
			<button
				className="p-2 rounded-full text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-400 transition-colors"
				onClick={toggleStreet}
			>
				Trocar
			</button>
		</div>
	);
}

export default ToolAddressBar;
