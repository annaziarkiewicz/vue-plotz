<template>
	<div
		class="az-timer"
		:class="`az-timer--${align}`"
	>
		Time: {{ formattedTime }}
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

type Align = 'left' | 'center' | 'right'

const props = withDefaults(defineProps<{
	time: number
	align?: Align
}>(), {
	align: 'right'
})

const formattedTime = computed(() => {
	const minutes = Math.floor(props.time / 60)
	const seconds = props.time % 60

	const mm = String(minutes).padStart(2, '0')
	const ss = String(seconds).padStart(2, '0')

	return `${mm}:${ss}`
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