<template>
    <div id="loading" v-if="store.loading">
        Loading...        
    </div>
</template>

<style>
    #loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        color: #FFF;
        z-index: 1000;
        padding-top: 5%;
        font-size: 2em;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.5)
    }
</style>

<script>
    module.exports = {}
</script>
