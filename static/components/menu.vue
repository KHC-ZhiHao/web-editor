<template>
    <ul class="itme-menu">
        <li>
            <v-icon :i="open ? 'folder-open-outline' : 'folder-outline'"></v-icon>
            <span @click="switchDir()" class="itme-menu-caret">{{ name || 'Root' }}</span>
            <ul :class="open ? 'itme-menu-active' : 'itme-menu-nested'">
                <li v-for="(dir, name) in data.dirs" :key="name">
                    <v-menu :data="dir" :name="name">
                </li>
                <li class="itme-menu-file" @click="openFile(name, path)" v-for="(path, name) in data.files" :key="name">
                    {{ name }}
                </li>
            </ul>
        </li>
    </ul>
</template>

<style>
    .itme-menu {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    .itme-menu ul {
        list-style-type: none;
    }

    .itme-menu .itme-menu-file {
        cursor: pointer;
        user-select: none;
        list-style-type: none;
    }

    .itme-menu .itme-menu-file:hover {
        background-color: #DDD;
    }

    .itme-menu-caret {
        cursor: pointer;
        user-select: none;
    }

    .itme-menu-caret::before {
        display: inline-block;
        margin-right: 6px;
    }

    .itme-menu-nested {
        display: none;
    }

    .itme-menu-active {
        display: block;
    }
</style>

<script>
    module.exports = {
        props: ['name', 'data'],
        data() {
            return {
                open: !this.name
            }
        },
        methods: {
            switchDir() {
                this.open = !this.open
            },
            openFile(name, path) {
                this.store.open(name, path)
            }
        }
    }
</script>
