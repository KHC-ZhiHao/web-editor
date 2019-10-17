<template>
    <div id="content" class="p-0">
        <v-toolbar v-if="store.view" class="px-2 py-1" style="background-color: #DDD">
            <v-btn @click="store.save()" title="Save" icon="content-save"></v-btn>
            <span>{{ diff ? '*' : '' }}</span>
            <span style="color:#999">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            {{ store.view.path }}
        </v-toolbar>
        <hr class="my-0">
        <div v-if="store.view && store.view.data != null" style="height:94.9%">
            <codemirror
                ref="codemirror"
                v-model="store.view.data"
                class="fill"
                :options="store.codemirrorOptions">
            </codemirror>
        </div>
    </div>
</template>

<script>
    module.exports = {
        computed: {
            diff() {
                if (this.store.view) {
                    return this.store.view.data !== this.store.origin
                }
                return false
            }
        }
    }
</script>
