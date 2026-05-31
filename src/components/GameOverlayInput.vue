<template>
	<section class="az-overlay">
		<div class="az-overlay__heading">{{ heading }}</div>
		<div class="az-overlay__close" @click="handleClose">✕</div>

		<div class="az-overlay__field">
			<input
				ref="gameInputRef"
				v-model="name"
				type="text"
				:maxlength="maxLength"
				:placeholder="placeholder"
				@keydown.enter="submit"
				@keydown.stop
			>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['close', 'submit'])

defineProps<{
	heading: string,
	placeholder: string
}>()

const gameInputRef = ref<HTMLInputElement | null>(null)
const name = ref('')
const maxLength = 45

onMounted(() => {
	gameInputRef.value?.focus()
})

const submit = () => {
	const nameTrimmed = name.value.trim().slice(0, maxLength)

	if (!nameTrimmed) return

	emit('submit', nameTrimmed)
}

const handleClose = () => {
	emit('close')
}
</script>

<style lang="scss" scoped>
.az-overlay {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	padding: 24px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 48px;

	&__heading {
		position: relative;
		z-index: 1;
		font-size: 48px;
		font-weight: 700;
		line-height: 1em;
		color: $color-milk-200;
		text-transform: uppercase;
		text-shadow: 0 0 24px $color-grey-400;
	}

	&__close {
		position: absolute;
		top: 30px;
		right: 24px;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		background: $color-milk-200;
		border-radius: 50%;
		color: $color-milk-500;

		&:hover {
			background: $color-milk-100;
		}
	}

	&__field {
		width: 100%;
		padding-bottom: 96px;
		display: flex;
		justify-content: center;
		align-items: center;

		input {
			width: 75%;
			background: $color-milk-300;
			box-shadow: 0 0 96px 0 $color-grey-400;
			border: 4px solid $color-milk-200;
			border-radius: 32px;
			padding: 20px 24px;
			font-size: 24px;
			font-weight: 500;
			line-height: 1em;
            text-align: center;

			&::placeholder {
				font-weight: 400;
				color: $color-grey-200;
			}
		}
	}
}
</style>