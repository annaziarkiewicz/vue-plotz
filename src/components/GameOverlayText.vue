<template>
	<div class="az-overlay">
		<div
			class="az-overlay__text"
			:class="`az-overlay__text--${color}`"
		>
			{{ text }}
		</div>
	</div>
</template>

<script lang="ts" setup>
type Color = 'milk' | 'mint' | 'rose' | 'navy'

withDefaults(defineProps<{
	text: string
	color?: Color
}>(), {
	color: 'milk'
})
</script>

<style lang="scss" scoped>
.az-overlay {
	position: absolute;
	inset: 0;
	display: flex;
	justify-content: center;
	align-items: center;

	&__text {
		font-size: 96px;
		font-weight: 700;
		line-height: 1em;
		text-shadow: 0 0 24px $color-grey-400;
		animation: az-overlay-fade-in 0.3s ease forwards;

		&--milk {
			color: $color-milk-200;
		}

		&--mint {
			color: $color-mint-200;
		}

		&--rose {
			color: $color-rose-200;
		}

		&--navy {
			color: $color-navy-200;
		}
	}

	@keyframes az-overlay-fade-in {
		0% { opacity: 0; }
		100% { opacity: 1; }
	}
}
</style>