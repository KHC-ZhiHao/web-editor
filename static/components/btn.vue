<template>
    <span ref="btn" class="item-btn trans-01s" :class="theme === 'light' ? 'item-btn-light' : ''">
        <a @click.stop="$emit('click')">
            <v-icon v-if="icon" :i="icon"></v-icon>
            <slot></slot>
        </a>
    </span>
</template>

<style>
    .item-btn {
        color : #222;
        width : 100%;
        height : 100%;
        display : inline-block;
        cursor: pointer;
        text-align : center;
    }

    .item-btn a {
        display : inline-block;
    }

    .item-btn i {
        font-family : sans-serif;
        font-size : 1.3em;
    }

    .item-btn:hover {
        color: #AAA;
    }

    .item-btn:hover p {
        height : auto;
        opacity : 1;
    }

    .item-btn-light {
        color : #FFF;
    }

    .item-btn-light:hover {
        color: greenyellow;
    }

</style>

<script>
    module.exports = {
        props : ['theme', 'icon', 'click'],
        mounted() {
            var btn = this.$refs.btn
            var width = btn.clientWidth
            var height = btn.clientHeight
            if (width > height) {
                btn.style.width = height + 'px'
            } else {
                btn.style.height = width + 'px'
            }
        }
    }
</script>
