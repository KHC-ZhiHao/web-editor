import Store from './store.js'
import loader from './lib/vue-http-loader/index.js'

const store = new Store()

axios.interceptors.request.use(function(config) {
    store.loading = true
    return config
}, function(error) {
    alert(JSON.stringify(error.response.data, null, 4))
    store.loading = false
    return Promise.reject(error)
})

axios.interceptors.response.use(function(response) {
    store.loading = false
    return response
}, function(error) {
    alert(JSON.stringify(error.response.data, null, 4))
    store.loading = false
    return Promise.reject(error);
})

loader.addComponentFileFor('./layouts/', {
    'app-nav': 'nav.vue',
    'app-loading': 'loading.vue',
    'app-content': 'content.vue'
})

loader.addComponentFileFor('./components/', {
    'v-btn': 'btn.vue',
    'v-menu': 'menu.vue',
    'v-icon': 'icon.vue',
    'v-toolbar': 'toolbar.vue'
})

loader.onload((components) => {
    for (var key in components) {
        Vue.component(key, components[key])
    }
    Vue.use(window.VueCodemirror)
    Vue.mixin({
        data() {
            return { store }
        }
    })
    window.editor = new Vue({
        el: '#app'
    })
})
