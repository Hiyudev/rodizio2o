
		const start = new Date(datas[0].INICIO);
		const end = new Date(datas[0].NORMALIZACAO);
		const isCurrent = TimeIn(start, end, now);

		const fullAddress: string = suggestions[0].text.split(',')[0];

		const nextRestriction = !isCurrent ? datas.shift() : undefined;
		const nextRestrictions: IRodizio[] = [];

		const currentRestriction = datas[0];

		const lastRestrictions = datas.slice(1, 6);

		const predictRestriction = analyseRodizio(lastRestrictions);

		if (nextRestriction) {
			nextRestrictions.push(nextRestriction);
		}

		console.log(observation);

		for (let i = 1; nextRestrictions.length <= 3; i++) {
			const { INICIO, RETOMADA, NORMALIZACAO } =
				nextRestrictions[0] ?? datas[0];

			const nextInicio = TimeAdd(new Date(INICIO), { days: predictRestriction * i }).getTime()
			const nextRetomada = TimeAdd(new Date(RETOMADA), { days: predictRestriction * i }).getTime()
			const nextNormalizacao = TimeAdd(new Date(NORMALIZACAO), {
				days: predictRestriction * i,
			}).getTime()


			nextRestrictions.push({
				INICIO: nextInicio,
				RETOMADA: nextRetomada,
				NORMALIZACAO: nextNormalizacao,
			});
		}

		return {
			current: currentRestriction,
			next: nextRestrictions,
			location: fullAddress,
			observation: observation[0],
		};
