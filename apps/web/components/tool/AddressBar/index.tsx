import { Fragment, useEffect, useMemo, useState } from "react";
import useWindowSize from "../../../hooks/useWindowSize";
import Reflesh from "../../icons/Reflesh";
import Search from "../../icons/Search";

import s from "./addressbar.module.css";

enum options {
	CEPNUM,
	ADDRESS,
}

const AddresBar = () => {
	const { width } = useWindowSize();
	const [isMobile, setMobile] = useState(false);
	const [option, setOption] = useState(options.CEPNUM);

	const [cep, setCep] = useState("");
	const [num, setNum] = useState("");
	const [address, setAddress] = useState("");

	const displayOption = useMemo(() => {
		switch (option) {
			case options.ADDRESS:
				return "Endereço";
			case options.CEPNUM:
				return "CEP & Número";
		}
	}, [option]);

	useEffect(() => {
		setMobile(width < 640);
	}, [width]);

	const handleSwitch = () => {
		if (option === options.CEPNUM) {
			setOption(options.ADDRESS);
		} else {
			setOption(options.CEPNUM);
		}
	};

	const inputForm = useMemo(() => {
		switch (option) {
			case options.ADDRESS:
				return (
					<input
						name="street-address"
						placeholder="Endereço de sua residência"
						id="endereco"
						type="text"
						defaultValue={address}
						onChange={(e) => setAddress(e.target.value)}
						className={s.inputaddress}
					/>
				);
			case options.CEPNUM:
				return (
					<Fragment>
						<input
							name="cep"
							placeholder="CEP"
							type="number"
							aria-autocomplete="list"
							defaultValue={cep}
							onChange={(e) => setCep(e.target.value)}
							className={s.inputfirst}
						/>
						<input
							name="numero"
							placeholder="Número da residência"
							aria-autocomplete="list"
							type="number"
							defaultValue={num}
							onChange={(e) => setNum(e.target.value)}
							className={s.inputsecond}
						/>
					</Fragment>
				);
		}
	}, [address, cep, num, option]);

	return (
		<div className={s.addressbar}>
			<button className={s.addressbutton} onClick={handleSwitch}>
				<Reflesh />
				<span>{displayOption}</span>
			</button>

			{inputForm}

			<button className={s.iconbutton}>
				<Search />
				{isMobile && <span>Procurar</span>}
			</button>
		</div>
	);
};

export default AddresBar;
