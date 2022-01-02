import axios from 'axios';

interface suggestionType {
	text: string;
	magicKey: string;
	isCollection: boolean;
}

interface locationType {
	x: number;
	y: number;
	spatialReference: { wkid: number };
}

export const getAddress = async (cep: string, num: string) => {
	const url = `https://viacep.com.br/ws/${cep}/json/`;

	const params = {
		f: 'json',
	};

	const res = await axios.get(url, { params });
	const data = res.data;

	const cepformated = data['cep'];
	const district = data['bairro'];
	const address = data['logradouro'];

	return `${address} ${num}, ${district}, Curítiba, Paraná, ${cepformated}`;
};

export const getSuggestions = async (
	searchString: string,
): Promise<suggestionType[]> => {
	const base_url =
		'https://utility.arcgis.com/usrsvcs/servers/b89ba3a68c664268b9bdea76948b4f11/rest/services/World/GeocodeServer/suggest';

	const params = {
		f: 'json',
		text: searchString,
		maxSuggestions: 60,
		countryCode: 'BRA',
	};

	const res = await axios.get(base_url, { params });
	let data = res.data.suggestions;
	data = data.filter((sug: suggestionType) => sug.text.includes('Paraná'));

	return data;
};

export const findAddress = async (singleLine: string) => {
	const base_url =
		'https://utility.arcgis.com/usrsvcs/servers/b89ba3a68c664268b9bdea76948b4f11/rest/services/World/GeocodeServer/findAddressCandidates';

	const params = {
		f: 'json',
		outSR: JSON.stringify({
			wkid: 102100,
		}),
		outFields: '*',
		countryCod: 'BRA',
		maxLocations: 6,
		SingleLine: singleLine,
	};

	const res = await axios.get(base_url, { params });

	return res.data;
};

export const getCodope = async (location: locationType) => {
	const base_url =
		'https://services1.arcgis.com/46Oage49MS2a3O6A/arcgis/rest/services/Mapa_Rodizio_Abastecimento_RMC_View/FeatureServer/1/query';

	const params = {
		f: 'json',
		returnGeometry: false,
		geometryType: 'esriGeometryPoint',
		outFields: '*',
		geometry: JSON.stringify(location),
	};

	const res = await axios.get(base_url, { params });

	const codope = res.data.features[0].attributes.codope;

	return codope;
};

export const getByCodope = async (codope: string) => {
	const base_url =
		'https://services1.arcgis.com/46Oage49MS2a3O6A/arcgis/rest/services/Mapa_Rodizio_Abastecimento_RMC_View/FeatureServer/2/query';

	const params = {
		f: 'json',
		returnGeometry: false,
		outFields: '*',
		where: `(CODOPE = '${codope}')`,
	};

	const res = await axios.get(base_url, { params });
	return res.data;
};
