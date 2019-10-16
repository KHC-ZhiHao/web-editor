<template>
    <span ref="btn" class="item-btn">
        <a @click.stop="$emit('click')" >
            <v-icon v-if="icon" :i="icon"></v-icon>
            <slot></slot>
        </a>
    </span>
</template>

<style>
    .item-btn {
        display : inline-block;
        cursor: pointer;
        text-align : center;
    }

    .item-btn:hover {
        color: #AAA;
    }
</style>

<script>
    module.exports = {
        props : ['icon']
    }
</script>
