<template>
	<div
		class="az-turn"
		:class="'az-turn--' + currentTurn"
	>
		<div class="az-turn__indicator"></div>
		{{ currentTurn === "player" ? "Your turn" : "AI's turn" }}
	</div>
</template>

<script lang="ts" setup>
type Owner = 'player' | 'ai'

defineProps<{
	currentTurn: Owner
}>()
</script>

<style lang="scss" scoped>
.az-turn {
    height: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;

	&__indicator {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

	&--player {
		.az-turn__indicator {
			background: $color-mint-200;
		}
	}

	&--ai {
		.az-turn__indicator {
			background: $color-rose-200;
		}
	}
}
</style>