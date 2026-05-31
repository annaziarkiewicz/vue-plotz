<template>
    <section class="az-author">
        <div class="az-author__content">
            Made with Vue.js by
            <a href="https://aniudomniemow.net"
               target="_blank"
               class="az-author__link"
            >
                Anna Ziarkiewicz
            </a>
        </div>
    </section>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.az-author {
    position: relative;
    width: 100%;
    padding: 24px;
    display: flex;
    justify-content: center;
    font-size: 15px;
    line-height: 1.25em;
    color: $color-milk-300;

    &__link {
        color: $color-milk-400;

        &:hover {
            color: $color-rose-200;
        }
    }
}
</style>