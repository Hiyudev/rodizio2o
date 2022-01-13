import WaveLayout from "../WaveLayout";
import s from "./api.module.css";

const ApiSection = ({ url }) => {
	return (
		<WaveLayout>
			<div className={s.card}>
				<h1>URLs para consultar</h1>
				<div>
					<div>
						<h2>Endpoint</h2>

						<pre>
							<code>
								{url}/api/rodizio?cep=<b>[cep]</b>&num=<b>[numero]</b>
							</code>
						</pre>
						<pre>
							<code>
								{url}/api/rodizio/<b>[cep]</b>/<b>[numero]</b>
							</code>
						</pre>
					</div>
					<div>
						<b>Exemplo</b>
						<pre>
							<code>
								{url}/api/rodizio?cep=<b>80430-042</b>&num=<b>1720</b>
							</code>
						</pre>
						<pre>
							<code>
								{url}/api/rodizio/80430-042/<b>1720</b>
							</code>
						</pre>
					</div>

					<div>
						<h2>Resposta</h2>

						<pre>
							<code>
								{"{"}
								<br />
								{"	current: {"}
								<br />
								{"		INICIO: ..."}
								<br />
								{"		RETOMADA: ..."}
								<br />
								{"		NORMALIZACAO: ..."}
								<br />
								{"	},"}
								<br />
								{"	next: [{...}, ...],"}
								<br />
								{'    observation: "...",'}
								<br />
								{'    location: "..."'}
								<br />
								{"}"}
							</code>
						</pre>

						<div>
							<b>Propriedades</b>

							<li>
								<span>
									<b>current</b>: Rodizio atual que ocorre no endereço colocado,
									caso não tenha nenhum rodízio acontecendo no momento, ele
									retornará <code>null</code>
								</span>

								<br />
								<b>Exemplo:</b>

								<pre>
									<code>
										{"{"}
										<br />
										{"	INICIO: 1627161981 ( Unix Epoch )"}
										<br />
										{"	RETOMADA: 1713561981 ( Unix Epoch )"}
										<br />
										{"    NORMALIZACAO: 1843161981 ( Unix Epoch )"}
										<br />
										{"}"}
									</code>
								</pre>
							</li>
							<li>
								<span>
									<b>next</b>: Próximos 4 rodízios que ocorrerão, calculados
									através dos últimos rodízios 6 rodízios.
								</span>

								<br />
								<b>Exemplo:</b>

								<pre>
									<code>
										{"[{"}
										<br />
										{"	INICIO: 1627161981 ( Unix Epoch )"}
										<br />
										{"	RETOMADA: 1713561981 ( Unix Epoch )"}
										<br />
										{"    NORMALIZACAO: 1843161981 ( Unix Epoch )"}
										<br />
										{"}, ... ]"}
									</code>
								</pre>
							</li>
							<li>
								<span>
									<b>observation</b>: Se há alguma observação do sistema da
									Sanepar nesta região
								</span>

								<br />
								<b>Exemplo:</b>

								<pre>
									<code>{"Rodízio suspenso"}</code>
								</pre>
							</li>
							<li>
								<span>
									<b>location</b>: Endereço do dado tirado
								</span>

								<br />
								<b>Exemplo:</b>

								<pre>
									<code>{"Alameda Presidente Taunay"}</code>
								</pre>
							</li>
						</div>
					</div>
				</div>
			</div>
		</WaveLayout>
	);
};

export default ApiSection;
