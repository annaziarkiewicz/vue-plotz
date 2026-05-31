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
	const isDraw = ref(false)
	const playerMoveScore = ref(0)
	const time = ref(0)
	const winner = ref<Turn | null>(null)

	let aiTimeout: ReturnType<typeof setTimeout> | null = null
	let timer: ReturnType<typeof setInterval> | null = null

	const aiColumns = computed(() => getColumnCount('ai'))
	const aiTiles = computed(() => getTileCount('ai'))
	const playerColumns = computed(() => getColumnCount('player'))
	const playerTiles = computed(() => getTileCount('player'))

	const rankingScore = computed(() => {
		return getRankingScore(playerColumns.value, time.value)
	})

	const score = computed<Score>(() => ({
		ai: getColumnPercent(aiColumns.value),
		aiColumns: aiColumns.value,
		player: getColumnPercent(playerColumns.value),
		playerColumns: playerColumns.value,
		target
	}))

	const getColumnPercent = (columns: number) => {
		return Math.floor((columns / cols) * 100)
	}

	const getRankingScore = (columns: number, seconds: number) => {
		const minutes = seconds / 60

		if (minutes <= 0) return 0

		return Math.floor((columns / minutes) * 100)
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
		if (winner.value !== null) return
		if (isDraw.value) return

		timer = setInterval(() => {
			if (paused.value) return

			time.value++
		}, 1000)
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

		aiMoveScore.value = moveScoreResult.score

		if (evaluateEnd()) return

		if (moveScoreResult.extraTurn) {
			scheduleAiMove()
			return
		}

		currentTurn.value = 'player'
	}

	const playerMove = (index: number) => {
		if (paused.value) return
		if (currentTurn.value !== 'player') return
		if (winner.value !== null) return
		if (isDraw.value) return
		if (cells.value[index].owner !== 'ai') return

		const moveResult = applyMove(index, 'player')
		const moveScoreResult = getMoveScoreResult(playerMoveScore.value, moveResult.changed, moveResult.columnCaptured)

		playerMoveScore.value = moveScoreResult.score

		if (evaluateEnd()) return
		if (moveScoreResult.extraTurn) return

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

		startTimer()

		if (currentTurn.value === 'ai') {
			scheduleAiMove()
		}
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
		time,
		total,
		winner
	}
}