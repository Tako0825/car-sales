import Vue from 'vue'
import Vuex from 'vuex'
import getStore from '@/store/index'

export const RegisterStore = () => {
    Vue.use(Vuex)
    return new Vuex.Store(getStore())
}
