<template>
    <div id="side-bar" class="p-0">
        <v-toolbar class="p-0">
            <input placeholder="command, ex: madir myDir" @focus="focusCommand()" @blur="blurCommand()" v-model="cli" type="text" class="px-2">
        </v-toolbar>        
        <hr class="my-0">
        <div v-if="menu" class="p-2 side-bar-menu">
            <v-menu :data="menu">
        </div>
        <hr class="my-0">
        <v-toolbar class="px-2 py-1">
            <v-btn @click="refresh()" class="pr-2" title="Refresh" icon="refresh"></v-btn>
            <v-btn @click="sendCommand()" title="Send Command" icon="apple-keyboard-command"></v-btn>
        </v-toolbar>
    </div>
</template>

<style>
    #side-bar {
        background-color: #EEE
    }

    #side-bar input {
        width: 100%;
        height: 100%;
        color: #FFF;
        background-color: #000;
        border: none;
    }

    #side-bar .side-bar-menu {
        height: 89.8%;
        width: 100%;
        overflow: auto;
    }
</style>

<script>
    module.exports = {
        data() {
            return {
                cli: '',
                menu: null,
                focusCli: false
            }
        },
        mounted() {
            this.refresh()
            window.addEventListener('keydown', event => {
                if (event.keyCode === 13 && this.focusCli === true) {
                    this.sendCommand()
                }
            })
        },
        methods: {
            refresh() {
                axios.get('./apis/menu').then(({ data }) => {
                    this.menu = data
                })
            },
            sendCommand() {
                if (this.cli) {
                    axios.post('./apis/command', { command: this.cli }).then(result => {
                        this.cli = ''
                        this.refresh()
                    })
                }
            },
            focusCommand() {
                this.focusCli = true
            },
            blurCommand() {
                this.focusCli = false
            }
        }
    }
</script>
