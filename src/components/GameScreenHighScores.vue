<template>
	<section class="az-high-scores">
		<div class="az-high-scores__heading">High Scores</div>
		<div class="az-high-scores__close" @click="emit('close')">✕</div>

		<ul>
			<li v-for="index in maxItems" :key="index">
				<div class="az-high-scores__number">
					{{ String(index).padStart(2, '0') }}
				</div>

				<div class="az-high-scores__name">
					{{ scores[index - 1]?.name || 'NO NAME' }}
				</div>

				<div class="az-high-scores__points">
					{{ scores[index - 1]?.score ?? 0 }}
				</div>
			</li>
		</ul>
	</section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { usePlotzScores } from '@/composables/usePlotzScores'

const emit = defineEmits<{
	(e: 'close'): void
}>()

const { getScores, maxItems } = usePlotzScores()

const scores = computed(() => getScores())
</script>

<style lang="scss" scoped>
.az-high-scores {
	position: absolute;
	inset: 0;
	overflow-y: scroll;
	width: 100%;
	height: 100%;
	padding: 24px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	gap: 24px;
	background: $color-milk-200;

	&__heading {
		font-size: 48px;
		font-weight: 700;
		line-height: 1em;
		color: $color-rose-200;
		text-transform: uppercase;
	}

	&__close {
		position: absolute;
		top: 30px;
		right: 30px;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		cursor: pointer;
		background: $color-rose-200;
		color: $color-milk-200;

		&:hover {
			background: $color-rose-300;
		}
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	li {
		width: 480px;
		padding: 8px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		border-radius: 12px;
		border: 1px solid #D9D9D4;

		&:nth-child(1) {
			[class$='number'] {
				background: $color-mint-300;
			}
		}

		&:nth-child(2) {
			[class$='number'] {
				background: $color-rose-200;
			}
		}

		&:nth-child(3) {
			[class$='number'] {
				background: $color-navy-200;
			}
		}

		&:nth-child(-n+3) {
			[class$='name'],
			[class$='points'] {
				color: $color-milk-500;
			}
		}
	}

	&__number {
		width: 32px;
		height: 32px;
		display: flex;
		justify-content: center;
		align-items: center;
        flex-shrink: 0;
		background: $color-milk-300;
		border-radius: 8px;
		font-size: 15px;
		font-weight: 500;
		color: $color-milk-200;
	}

	&__name {
        overflow: hidden;
        min-width: 0;
		flex-grow: 1;
		font-size: 18px;
		color: $color-milk-300;
        text-transform: uppercase;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&__points {
		font-size: 18px;
		font-weight: 500;
		color: $color-milk-300;
	}
}
</style>