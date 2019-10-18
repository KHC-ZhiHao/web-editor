<template>
    <div id="content" class="p-0">
        <v-toolbar v-if="store.view" class="px-2 py-1" style="background-color: #DDD">
            <v-btn @click="save()" title="Save" icon="content-save"></v-btn>
            <span>{{ isChange ? '*' : '' }}</span>
            <span style="color:#999">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            {{ store.view.path }}
        </v-toolbar>
        <hr class="my-0">
        <div v-if="store.view && store.view.data != null" style="height:94.9%">
            <codemirror
                ref="codemirror"
                v-model="store.view.data"
                @change="test()"
                class="fill"
                :options="store.codemirrorOptions">
            </codemirror>
        </div>
        <div v-else class="p-2">
            Select File.
        </div>
    </div>
</template>

<script>
    module.exports = {
        data() {
            return {
                isChange: false
            }
        },
        watch: {
            'store.view': function() {
                setTimeout(() => {
                    this.isChange = false
                }, 100)
            }
        },
        mounted() {
            this.initCodemirror()
        },
        methods: {
            initCodemirror() {
                setTimeout(() => {
                    if (this.$refs.codemirror) {
                        this.$refs.codemirror.codemirror.on('change', () => {
                            this.isChange = true
                        })
                    } else {
                        this.initCodemirror()
                    }
                }, 1000)
            },
            save() {
                let parmas = {
                    path: this.store.view.path,
                    data: this.store.view.data
                }
                axios.post('./apis/save', parmas).then(() => {
                    this.isChange = false
                })
            }
        }
    }
</script>
