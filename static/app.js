import loader from './lib/vue-http-loader/index.js'

loader.addComponentFileFor('./layouts/', {
    'app-nav': 'nav.vue',
    'app-content': 'content.vue'
})

loader.addComponentFileFor('./components/', {
    'v-btn': 'btn.vue',
    'v-icon': 'icon.vue',
    'v-toolbar': 'toolbar.vue'
})

loader.onload((components) => {
    for (var key in components) {
        Vue.component(key, components[key])
    }
    window.editor = new Vue({
        el: '#app'
    })
})
