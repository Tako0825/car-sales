import Vue from 'vue'
import Vuex from 'vuex'
import { store } from '@/store'

export const RegisterStore = () => {
    Vue.use(Vuex)
}

export const store = new Vuex.Store(store)