<template>
    <section class="az-screen">
        <div v-if="$slots.illustrations" class="az-screen__illustrations">
            <slot name="illustrations" />
        </div>

        <div class="az-screen__content">
            <div v-if="gameHeadline" class="az-screen__heading">
                {{ gameHeadline }}
            </div>

            <div v-if="hasAnyActions" class="az-screen__actions">
                <button
                    v-if="buttonPlayGame"
                    class="az-screen__button az-screen__button--mint"
                    @click="emit('play-game')"
                >
                    Play game
                </button>

                <button
                    v-if="buttonBackToGame"
                    class="az-screen__button az-screen__button--mint"
                    @click="emit('back-to-game')"
                >
                    Back to game
                </button>

                <button
                    v-if="buttonHighScores"
                    class="az-screen__button az-screen__button--rose"
                    @click="emit('show-high-scores')"
                >
                    High scores
                </button>

                <button
                    v-if="buttonHowToPlay"
                    class="az-screen__button az-screen__button--navy"
                    @click="emit('show-how-to-play')"
                >
                    How to play
                </button>
            </div>
        </div>

        <GameScreenAuthor/>

        <slot/>
    </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import GameScreenAuthor from '@/components/GameScreenAuthor.vue'

const props = defineProps<{
    gameHeadline: string,
    buttonPlayGame?: boolean,
    buttonBackToGame?: boolean,
    buttonHighScores?: boolean,
    buttonHowToPlay?: boolean,
}>()

const emit = defineEmits<{
    (e: 'play-game'): void
    (e: 'back-to-game'): void
    (e: 'show-high-scores'): void
    (e: 'show-how-to-play'): void
}>()

const hasAnyActions = computed(() => props.buttonPlayGame || props.buttonBackToGame || props.buttonHighScores || props.buttonHowToPlay)
</script>

<style lang="scss" scoped>
.az-screen {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    padding-top: 68px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: $color-milk-200;

    &__illustrations {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }

    &__content {
        position: relative;
        width: 100%;
        padding: 0 48px 96px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        align-items: center;
        justify-content: center;
        gap: 48px;
    }

    &__heading {
        font-size: 64px;
        font-weight: 700;
        line-height: 1em;
        color: $color-grey-300;
        text-transform: uppercase;
        text-align: center;
    }

    &__actions {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
    }

    &__button {
        width: 320px;
        padding: 20px 28px;
        border-radius: 12px;
        font-size: 18px;
        font-weight: 500;
        line-height: 1em;
        text-transform: uppercase;
        transition: 0.5s;

        &--mint {
            background: $color-mint-400;

            &:hover {
                background: $color-mint-500;
            }
        }

        &--rose {
            background: $color-rose-200;

            &:hover {
                background: $color-rose-300;
            }
        }

        &--navy {
            background: $color-navy-200;

            &:hover {
                background: $color-navy-300;
            }
        }
    }
}
</style>