<template>
	<section class="az-how-to-play">
		<div class="az-how-to-play__heading">How to play</div>
		<div class="az-how-to-play__close" @click="emit('close')">✕</div>

		<div class="az-how-to-play__content">
			<div class="az-how-to-play__description">
				This is a classic territory battle game where every move can flip the match in your favor.
				Click enemy tiles to capture them together with connected tiles of the same color vertically and horizontally.
				You and the AI take turns, turning small gains into full-column control. Win by being the first to claim 10 columns.
			</div>

			<div class="az-how-to-play__row">
				<div class="az-elements">
					<div class="az-elements__heading">Game elements:</div>

					<div class="az-elements__item">
						<div class="az-elements__item-tile">
							<GameTile
								:column-owner="null"
								:is-clickable="false"
								tile-owner="player"
							/>
						</div>
						<div class="az-elements__item-name">player's tile</div>
					</div>

					<div class="az-elements__item">
						<div class="az-elements__item-tile">
							<GameTile
								:column-owner="null"
								:is-clickable="false"
								tile-owner="ai"
							/>
						</div>
						<div class="az-elements__item-name">AI tile</div>
					</div>
				</div>

				<div class="az-controls">
					<div class="az-controls__heading">Game controls:</div>

					<div class="az-controls__item">
						<div class="az-controls__item-mouse">
							<GameScreenMouse left-button />
						</div>

						<div class="az-controls__item-name">
							click enemy tiles to capture connected tiles
						</div>
					</div>
				</div>

				<div class="az-shortcodes">
					<div class="az-shortcodes__heading">Keyboard shortcodes:</div>

					<div class="az-shortcodes__item">
						<GameScreenKey key-type="letter">M</GameScreenKey>
						<div class="az-shortcodes__item-name">open menu</div>
					</div>

					<div class="az-shortcodes__item">
						<GameScreenKey key-type="letter">P</GameScreenKey>
						<div class="az-shortcodes__item-name">pause / resume</div>
					</div>

					<div class="az-shortcodes__item">
						<GameScreenKey key-type="letter">R</GameScreenKey>
						<div class="az-shortcodes__item-name">restart game</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import GameScreenKey from '@/components/GameScreenKey.vue'
import GameScreenMouse from '@/components/GameScreenMouse.vue'
import GameTile from '@/components/GameTile.vue'

const emit = defineEmits<{
	(e: 'close'): void
}>()
</script>

<style lang="scss" scoped>
.az-how-to-play {
	position: absolute;
	inset: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	width: 100%;
	height: 100%;
	padding: 24px 48px;
	overflow-y: scroll;
	gap: 24px;
	background: $color-milk-200;

	&__heading {
		font-size: 48px;
		font-weight: 700;
		line-height: 1em;
		color: $color-navy-200;
		text-transform: uppercase;
	}

	&__close {
		position: absolute;
		top: 30px;
		right: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		cursor: pointer;
		background: $color-navy-200;
		color: $color-milk-200;

		&:hover {
			background: $color-navy-300;
		}
	}

	&__content {
		display: flex;
		flex-direction: column;
		gap: 48px;
		color: $color-grey-400;
	}

	&__description {
		font-size: 20px;
		line-height: 1.5em;
		text-align: justify;
	}

	&__row {
		display: flex;
		flex-direction: row;
		gap: 48px;

		[class$='heading'] {
			margin-bottom: 8px;
			font-size: 15px;
			font-weight: 500;
			line-height: 1.35em;
			text-transform: uppercase;
		}

		[class$='item'] {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 12px;
		}

		[class$='name'] {
			font-size: 15px;
			line-height: 1.5em;
		}
	}

	.az-controls,
	.az-elements,
	.az-shortcodes {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.az-elements,
	.az-shortcodes {
		width: 200px;
	}

	.az-elements {
		[class$='item-tile'] {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 48px;
			height: 48px;
		}

		.az-tile {
			position: relative;
		}
	}

	.az-controls {
		width: calc(100% - 448px);

		&__item-mouse {
			flex-shrink: 0;
		}
	}
}
</style>