<template>
	<div
		class="az-timer"
		:class="`az-timer--${align}`"
	>
		{{ label }}: {{ formattedTime }}
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

type Align = 'left' | 'center' | 'right'

const props = withDefaults(defineProps<{
	align?: Align
	label?: string
	time: number
}>(), {
	align: 'right',
	label: 'Time'
})

const formattedTime = computed(() => {
	const minutes = String(Math.floor(props.time / 60)).padStart(2, '0')
	const seconds = String(props.time % 60).padStart(2, '0')

	return `${minutes}:${seconds}`
})
</script>

<style lang="scss" scoped>
.az-timer {
	&--left {
		text-align: left;
	}

	&--center {
		text-align: center;
	}

	&--right {
		text-align: right;
	}
}
</style>