import { ref } from 'vue'

import type { Cell, MoveResult, Owner } from '@/types/plotz'

export const usePlotzMap = () => {
	const cells = ref<Cell[]>([])
	const columnOwners = ref<Owner[]>([])

	const cols = 19
	const rows = 11
	const target = Math.floor(cols / 2) + 1
	const total = cols * rows

	const getRandomOwner = (): Exclude<Owner, null> => {
		return Math.random() > 0.5 ? 'player' : 'ai'
	}

	const indexToCoordinate = (index: number) => ({
		column: index % cols,
		row: Math.floor(index / cols)
	})

	const coordinateToIndex = (column: number, row: number) => {
		return row * cols + column
	}

	const updateColumns = () => {
		for (let column = 0; column < cols; column++) {
			let firstOwner: Owner = null
			let isFull = true

			for (let row = 0; row < rows; row++) {
				const index = coordinateToIndex(column, row)
				const owner = cells.value[index].owner

				if (owner === null) {
					isFull = false
					break
				}

				if (firstOwner === null) {
					firstOwner = owner
				} else if (firstOwner !== owner) {
					isFull = false
					break
				}
			}

			columnOwners.value[column] = isFull ? firstOwner : null
		}
	}

	const initMap = () => {
		cells.value = Array.from({ length: total }, () => ({
			owner: getRandomOwner()
		}))

		columnOwners.value = Array.from({ length: cols }, () => null)

		updateColumns()
	}

	const collectLine = (
		startIndex: number,
		columnDirection: number,
		rowDirection: number,
		targetOwner: Owner
	) => {
		const result: number[] = []
		let { column, row } = indexToCoordinate(startIndex)

		while (true) {
			column += columnDirection
			row += rowDirection

			if (column < 0 || column >= cols || row < 0 || row >= rows) break

			const index = coordinateToIndex(column, row)

			if (cells.value[index].owner !== targetOwner) break

			result.push(index)
		}

		return result
	}

	const getColumnCount = (owner: Owner) => {
		return columnOwners.value.filter(columnOwner => columnOwner === owner).length
	}

	const getTileCount = (owner: Owner) => {
		return cells.value.filter(cell => cell.owner === owner).length
	}

	const applyMove = (index: number, actor: Exclude<Owner, null>): MoveResult => {
		const opponent: Exclude<Owner, null> = actor === 'player' ? 'ai' : 'player'

		const cellsToChange = [
			index,
			...collectLine(index, -1, 0, opponent),
			...collectLine(index, 1, 0, opponent),
			...collectLine(index, 0, -1, opponent),
			...collectLine(index, 0, 1, opponent)
		]

		cellsToChange.forEach(cellIndex => {
			cells.value[cellIndex].owner = actor
		})

		const previousColumnOwners = [...columnOwners.value]

		updateColumns()

		const columnCaptured = columnOwners.value.some((columnOwner, index) => {
			return columnOwner !== null && previousColumnOwners[index] !== columnOwner
		})

		return {
			changed: cellsToChange.length,
			columnCaptured
		}
	}

	return {
		cells,
		cols,
		columnOwners,
		rows,
		target,
		total,
		applyMove,
		coordinateToIndex,
		getColumnCount,
		getTileCount,
		indexToCoordinate,
		initMap,
		updateColumns
	}
}