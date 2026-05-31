<template>
	<div
		class="az-tile"
		:class="classes"
		@click="emit('click')"
	>
		<div class="az-tile__inner" />
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import type { Owner } from '@/types/plotz'

const props = defineProps<{
	columnOwner: Owner
	isClickable: boolean
	tileOwner: Owner
}>()

const emit = defineEmits<{
	(e: 'click'): void
}>()

const classes = computed(() => ({
	'az-tile--ai': props.tileOwner === 'ai' && !props.columnOwner,
	'az-tile--column-ai': props.columnOwner === 'ai',
	'az-tile--column-player': props.columnOwner === 'player',
	'az-tile--clickable': props.isClickable,
	'az-tile--player': props.tileOwner === 'player' && !props.columnOwner
}))
</script>

<style lang="scss" scoped>
.az-tile {
	display: flex;
	align-items: center;
	justify-content: center;
	border: 0.5px solid $color-milk-200;

	&--clickable {
		cursor: pointer;
	}

	&__inner {
		width: 47px;
		height: 47px;
		border: 8px solid;
	}

	&--player {
		.az-tile__inner {
			background: $color-mint-200;
			border-color: $color-mint-100 #0000000D #00000026 #0000000D;
		}
	}

	&--ai {
		.az-tile__inner {
			background: $color-rose-200;
			border-color: $color-rose-100 #0000000D #00000026 #0000000D;
		}
	}

	&--column-player {
		.az-tile__inner {
			background: $color-mint-400;
			border-color: $color-mint-300 #0000000D #00000026 #0000000D;
		}
	}

	&--column-ai {
		.az-tile__inner {
			background: $color-rose-400;
			border-color: $color-rose-300 #0000000D #00000026 #0000000D;
		}
	}
}
</style>