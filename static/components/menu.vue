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
                    <v-icon :i="getFileIcon(name)"></v-icon>
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
        white-space:nowrap;
        list-style-type: none;
    }

    .itme-menu ul {
        list-style-type: none;
    }

    .itme-menu .itme-menu-file {
        cursor: pointer;
        user-select: none;
        list-style-type: none;
        white-space:nowrap;
    }

    .itme-menu .itme-menu-file:hover {
        color: slateblue
    }

    .itme-menu-caret {
        white-space:nowrap;
        cursor: pointer;
        user-select: none;
    }

    .itme-menu-caret:hover {
        color: slateblue
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
            },
            getFileIcon(name) {
                let ext = name.split('.').pop()
                if (ext === 'js') {
                    return 'language-javascript'
                }
                if (ext === 'json') {
                    return 'json'
                }
                if (ext === 'php') {
                    return 'language-php'
                }
                if (ext === 'vue') {
                    return 'vuejs'
                }
                if (ext === 'cpp' || ext === 'h') {
                    return 'language-cpp'
                }
                if (ext === 'py') {
                    return 'language-python'
                }
                if (ext === 'html') {
                    return 'language-html5'
                }
                if (ext === 'css') {
                    return 'language-css3'
                }
                if (ext === 'ts') {
                    return 'language-typescript'
                }
                return 'file'
            }
        }
    }
</script>
