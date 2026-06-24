import { computed, ref, watch, type Ref } from 'vue'

import { usePlotzAI } from '@/composables/usePlotzAI'
import { usePlotzMap } from '@/composables/usePlotzMap'

import type { GameResult, Score, Turn } from '@/types/plotz'

type MoveScoreResult = {
	extraTurn: boolean
	score: number
}

export const usePlotzGame = (gameActionDelay: number, paused: Ref<boolean>) => {
	const {
		cells,
		cols,
		columnOwners,
		rows,
		target,
		total,
		applyMove,
		getColumnCount,
		getTileCount,
		initMap
	} = usePlotzMap()

	const { getAiMove } = usePlotzAI()

	const aiMoveScore = ref(0)
	const currentTurn = ref<Turn>('player')
	const hasMoved = ref({
		ai: false,
		player: false
	})
	const isDraw = ref(false)
	const playerMoveScore = ref(0)
	const turnTime = ref(30)
	const winner = ref<Turn | null>(null)

	let aiTimeout: ReturnType<typeof setTimeout> | null = null
	let timer: ReturnType<typeof setInterval> | null = null

	const aiColumns = computed(() => getColumnCount('ai'))
	const aiTiles = computed(() => getTileCount('ai'))
	const playerColumns = computed(() => getColumnCount('player'))
	const playerTiles = computed(() => getTileCount('player'))

	const rankingScore = computed(() => {
		return getScore(playerTiles.value, playerColumns.value)
	})

	const score = computed<Score>(() => ({
		ai: hasMoved.value.ai ? getScore(aiTiles.value, aiColumns.value) : 0,
		aiColumns: aiColumns.value,
		player: hasMoved.value.player ? getScore(playerTiles.value, playerColumns.value) : 0,
		playerColumns: playerColumns.value,
		target
	}))

	const getScore = (tiles: number, columns: number) => {
		return tiles + (columns * 50)
	}

	const getMoveScoreResult = (scoreValue: number, changed: number, columnCaptured: boolean): MoveScoreResult => {
		if (columnCaptured) {
			return {
				extraTurn: false,
				score: 0
			}
		}

		const nextScore = scoreValue + changed

		if (nextScore >= 100) {
			return {
				extraTurn: true,
				score: 0
			}
		}

		return {
			extraTurn: false,
			score: nextScore
		}
	}

	const getGameResult = (): GameResult => {
		if (playerColumns.value >= target) return 'player'
		if (aiColumns.value >= target) return 'ai'

		return null
	}

	const stopAiTimeout = () => {
		if (aiTimeout === null) return

		clearTimeout(aiTimeout)
		aiTimeout = null
	}

	const stopTimer = () => {
		if (timer === null) return

		clearInterval(timer)
		timer = null
	}

	const stopAll = () => {
		stopAiTimeout()
		stopTimer()
	}

	const startTimer = () => {
		if (paused.value) return
		if (timer !== null) return
		if (currentTurn.value !== 'player') return
		if (winner.value !== null) return
		if (isDraw.value) return

		timer = setInterval(() => {
			if (paused.value) return

			turnTime.value--

			if (turnTime.value > 0) return

			stopTimer()

			currentTurn.value = 'ai'
			turnTime.value = 30

			scheduleAiMove()
		}, 1000)
	}

	const resetTurnTimer = () => {
		stopTimer()

		turnTime.value = 30

		startTimer()
	}

	const finishGame = (result: GameResult) => {
		if (result === null) return false

		if (result === 'draw') {
			isDraw.value = true
			winner.value = null
		} else {
			winner.value = result
		}

		stopAll()

		return true
	}

	const evaluateEnd = () => {
		return finishGame(getGameResult())
	}

	const scheduleAiMove = () => {
		if (paused.value) return
		if (winner.value !== null) return
		if (isDraw.value) return

		stopAiTimeout()

		aiTimeout = setTimeout(() => {
			aiMove()
		}, gameActionDelay)
	}

	const aiMove = () => {
		if (paused.value) return
		if (currentTurn.value !== 'ai') return
		if (winner.value !== null) return
		if (isDraw.value) return

		stopAiTimeout()

		const index = getAiMove(cells.value)

		if (index === null) return

		const moveResult = applyMove(index, 'ai')
		const moveScoreResult = getMoveScoreResult(aiMoveScore.value, moveResult.changed, moveResult.columnCaptured)

		hasMoved.value.ai = true
		aiMoveScore.value = moveScoreResult.score

		if (evaluateEnd()) return

		if (moveScoreResult.extraTurn) {
			scheduleAiMove()
			return
		}

		currentTurn.value = 'player'

		resetTurnTimer()
	}

	const playerMove = (index: number) => {
		if (paused.value) return
		if (currentTurn.value !== 'player') return
		if (winner.value !== null) return
		if (isDraw.value) return
		if (cells.value[index].owner !== 'ai') return

		stopTimer()

		const moveResult = applyMove(index, 'player')
		const moveScoreResult = getMoveScoreResult(playerMoveScore.value, moveResult.changed, moveResult.columnCaptured)

		hasMoved.value.player = true
		playerMoveScore.value = moveScoreResult.score
		turnTime.value = 30

		if (evaluateEnd()) return

		if (moveScoreResult.extraTurn) {
			startTimer()
			return
		}

		currentTurn.value = 'ai'

		scheduleAiMove()
	}

	const handlePlayerClick = (index: number) => {
		playerMove(index)
	}

	watch(paused, value => {
		if (value) {
			stopAll()
			return
		}

		if (winner.value !== null) return
		if (isDraw.value) return

		if (currentTurn.value === 'ai') {
			scheduleAiMove()
			return
		}

		startTimer()
	})

	initMap()
	startTimer()

	return {
		aiColumns,
		aiMoveScore,
		aiTiles,
		cells,
		cols,
		columnOwners,
		currentTurn,
		handlePlayerClick,
		isDraw,
		playerColumns,
		playerMoveScore,
		playerTiles,
		rankingScore,
		rows,
		score,
		stopAll,
		total,
		turnTime,
		winner
	}
}