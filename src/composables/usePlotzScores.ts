type ScoreItem = {
	date: number
	name: string
	score: number
}

export const usePlotzScores = () => {
	const storageKey = 'vue-plotz'
	const maxItems = 8

	const getScores = (): ScoreItem[] => {
		try {
			const raw = localStorage.getItem(storageKey)
			const data: ScoreItem[] = raw ? JSON.parse(raw) : []

			return data.sort((a, b) => {
				if (b.score !== a.score) return b.score - a.score

				return a.date - b.date
			})
		} catch {
			return []
		}
	}

	const saveScores = (list: ScoreItem[]) => {
		localStorage.setItem(storageKey, JSON.stringify(list))
	}

	const isHighScore = (score: number): boolean => {
		const list = getScores()

		if (list.length < maxItems) return true

		const last = list[list.length - 1]

		if (!last) return true

		return score > last.score
	}

	const addScore = (item: { name: string; score: number }) => {
		const list = getScores()

		const next: ScoreItem[] = [
			...list,
			{
				...item,
				date: Date.now()
			}
		]

		const sorted = next
			.sort((a, b) => {
				if (b.score !== a.score) return b.score - a.score

				return a.date - b.date
			})
			.slice(0, maxItems)

		saveScores(sorted)
	}

	return {
		addScore,
		getScores,
		isHighScore,
		maxItems
	}
}