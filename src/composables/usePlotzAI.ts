import type { Cell } from '@/types/plotz'

export const usePlotzAI = () => {
	const getAiMove = (cells: Cell[]) => {
		const options = cells
			.map((cell, index) => ({
				cell,
				index
			}))
			.filter(option => option.cell.owner === 'player')

		if (options.length === 0) return null

		return options[Math.floor(Math.random() * options.length)].index
	}

	return {
		getAiMove
	}
}