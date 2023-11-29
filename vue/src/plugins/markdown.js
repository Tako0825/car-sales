import Vue from 'vue'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import hljs from 'highlight.js';

export const RegisterMarkdown = () => {
    VMdPreview.use(githubTheme, { Hljs: hljs })
    Vue.use(VMdPreview);
}