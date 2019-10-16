<template>
    <div id="side-bar" class="p-0">
        <v-toolbar>
            <v-btn @click="refresh()" title="Refresh" icon="refresh"></v-btn>
        </v-toolbar>
        <hr class="my-0">
        <div v-if="menu" class="p-2">
            <v-menu :data="menu">
        </div>
    </div>
</template>

<style>
    #side-bar {
        background-color: #EEE
    }
</style>

<script>
    module.exports = {
        data() {
            return {
                menu: null
            }
        },
        mounted() {
            this.refresh()
        },
        methods: {
            refresh() {
                axios.get('./apis/menu').then(({ data }) => {
                    this.menu = data
                })
            }
        }
    }
</script>
