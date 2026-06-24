<template>
	<div class="az-dashboard">
		<div class="az-dashboard__start">
			Columns: {{ score.playerColumns }} | Score: {{ score.player }}
		</div>

		<div class="az-dashboard__center">
			<GameDashboardTurn :current-turn="currentTurn" />

			<div
				v-if="showOverlay"
				class="az-dashboard__center-overlay"
			>
                AI columns: {{ score.aiColumns }} |  Score: {{ score.ai }}
			</div>
		</div>

		<div class="az-dashboard__end">
			<GameDashboardTimer label="Time left" :time="time" />
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
    showOverlay: boolean
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
	}

	&__center {
		justify-self: center;

		&-overlay {
			position: absolute;
            top: 24px;
            inset-inline: 0;
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