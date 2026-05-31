<template>
	<div class="az-board">
		<GameTile
			v-for="(cell, index) in game.cells.value"
			:key="index"
			:column-owner="game.columnOwners.value[index % game.cols]"
			:is-clickable="isTileClickable(cell.owner)"
			:tile-owner="cell.owner"
			@click="handleClick(index)"
		/>

		<slot />
	</div>
</template>

<script lang="ts" setup>
import { onUnmounted, ref, toRef, watch } from 'vue'

import GameTile from '@/components/GameTile.vue'

import { usePlotzGame } from '@/composables/usePlotzGame'

import type { Owner, Turn } from '@/types/plotz'

const props = defineProps<{
	actionDelay: number
	paused: boolean
}>()

const emit = defineEmits<{
	(e: 'draw'): void
	(e: 'lost'): void
	(e: 'update:aiColumns', value: number): void
	(e: 'update:aiScore', value: number): void
	(e: 'update:playerColumns', value: number): void
	(e: 'update:rankingScore', value: number): void
	(e: 'update:score', value: number): void
	(e: 'update:time', value: number): void
	(e: 'update:turn', value: Turn): void
	(e: 'won'): void
}>()

const game = usePlotzGame(props.actionDelay, toRef(props, 'paused'))
const resultEmitted = ref(false)

const isTileClickable = (owner: Owner) => {
	return !props.paused && game.currentTurn.value === 'player' && owner === 'ai'
}

const handleClick = (index: number) => {
	if (props.paused) return
	if (game.currentTurn.value !== 'player') return
	if (game.cells.value[index].owner !== 'ai') return

	game.handlePlayerClick(index)
}

const emitGameResult = () => {
	if (resultEmitted.value) return

	if (game.winner.value === 'player') {
		resultEmitted.value = true
		emit('won')
		return
	}

	if (game.winner.value === 'ai') {
		resultEmitted.value = true
		emit('lost')
		return
	}

	if (game.isDraw.value) {
		resultEmitted.value = true
		emit('draw')
	}
}

watch(game.score, () => {
	emit('update:aiColumns', game.score.value.aiColumns)
	emit('update:aiScore', game.score.value.ai)
	emit('update:playerColumns', game.score.value.playerColumns)
	emit('update:score', game.score.value.player)
}, { immediate: true })

watch(game.rankingScore, () => {
	emit('update:rankingScore', game.rankingScore.value)
}, { immediate: true })

watch(game.currentTurn, () => {
	emit('update:turn', game.currentTurn.value)
}, { immediate: true })

watch(game.time, () => {
	emit('update:time', game.time.value)
}, { immediate: true })

watch(game.winner, () => {
	emitGameResult()
})

watch(game.isDraw, () => {
	emitGameResult()
})

onUnmounted(() => {
	game.stopAll()
})
</script>

<style lang="scss" scoped>
.az-board {
	position: relative;
	width: 960px;
	height: 576px;
	display: grid;
	grid-template-columns: repeat(19, 48px);
	grid-template-rows: repeat(11, 48px);
	background-color: $color-milk-300;
	border: 24px solid $color-milk-200;
	outline: none;
}
</style>