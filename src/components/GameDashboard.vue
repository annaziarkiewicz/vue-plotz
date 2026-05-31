<template>
	<div class="az-dashboard">
		<div class="az-dashboard__start">
			Score: {{ score.player }}%
			<span>({{ score.playerColumns }} columns)</span>
		</div>

		<div class="az-dashboard__center">
			<GameDashboardTurn :current-turn="currentTurn" />

			<div
				v-if="currentTurn === 'ai'"
				class="az-dashboard__center-overlay"
			>
				AI score: {{ score.ai }}%
				<span>({{ score.aiColumns }} columns)</span>
			</div>
		</div>

		<div class="az-dashboard__end">
			<GameDashboardTimer
				align="center"
				:time="time"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import GameDashboardTimer from '@/components/GameDashboardTimer.vue'
import GameDashboardTurn from '@/components/GameDashboardTurn.vue'

import type { Score, Turn } from '@/types/plotz'

defineProps<{
	currentTurn: Turn
	score: Score
	time: number
}>()
</script>

<style lang="scss" scoped>
.az-dashboard {
	width: 100%;
	height: 24px;
	padding: 0 8px;
	display: grid;
	grid-template-columns: 240px 1fr 240px;
	align-items: center;
	background: $color-grey-200;
	font-size: 13px;
	color: $color-grey-400;

	&__start {
		justify-self: start;

		span {
			color: $color-milk-500;
		}
	}

	&__center {
		justify-self: center;

		&-overlay {
			position: absolute;
			left: 0;
			right: 0;
			z-index: 1;
			height: 24px;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 4px;
			color: $color-milk-400;
		}
	}

	&__end {
		justify-self: end;
	}
}
</style>