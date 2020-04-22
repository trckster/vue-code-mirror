<template>
    <div class="outer-wrapper">
        <div class="management">
            <div class="selector">
                Highlight language:
                <el-select v-model="viewLanguage">
                    <el-option v-for="l in languages"
                               :key="l"
                               :label="l"
                               :value="l"
                    ></el-option>
                </el-select>
            </div>
            <div class="refresh-buttons">
                <el-button @click="setSnippet('js')">
                    Javascript snippet
                </el-button>
                <el-button @click="setSnippet('py')">
                    Python snippet
                </el-button>
                <el-button @click="setSnippet('c')">
                    C snippet
                </el-button>
            </div>
        </div>


        <div class="editor">
            <codemirror
                    :value="code"
                    @ready="onCmReady"
                    @focus="onCmFocus"
                    @changes="onCmChange"
                    @input="onCmCodeChange"
                    :options="options">
            </codemirror>
        </div>

        <div class="explanation">
            <ol>
                <li>
                    Можно динамически менять подсветку синтаксиса
                </li>
                <li>-</li>
                <li>-</li>
                <li>
                    Включены автоподсказки при наборе ключевых слов (Highlight lang: python),
                    также добавлено два ключевых слова:
                    <b>veryStrangeFunction</b> и <b>STRANGE_BLACK_WALL_GROUP_CONSTANT</b>. Вместе с ними работает
                    также динамическое автодополнение.
                </li>
                <li>-</li>
                <li>-</li>
            </ol>
        </div>
    </div>
</template>

<script>
    import 'codemirror/lib/codemirror.css'
    import { CodeMirror, codemirror } from 'vue-codemirror'
    import 'codemirror/theme/eclipse.css'
    import 'codemirror/addon/hint/show-hint'
    import 'codemirror/addon/hint/show-hint.css'
    import 'codemirror/addon/hint/anyword-hint'

    import { jsSnippet, pythonSnippet } from "@/assets/js/snippets";

    /** Linters for languages JS, C, Python */
    import 'codemirror/mode/javascript/javascript'
    import 'codemirror/mode/clike/clike'
    import 'codemirror/mode/python/python'

    import pythonExtraHintWords from "@/assets/js/pythonExtraHintWords";
    import {cSnippet} from "../assets/js/snippets";

    export default {
        name: "Editor",
        data() {
            return {
                viewLanguage: 'Python',
                languages: [
                    'Javascript',
                    'Python',
                    'C'
                ],
                code: ''
            }
        },
        components: {
            codemirror
        },
        computed: {
            currentMode() {
                if (this.viewLanguage === 'C')
                    return 'text/x-csrc'
                else if (this.viewLanguage === 'Javascript')
                    return 'text/javascript'
                else
                    return 'text/x-python'
            },
            options() {
                return {
                    theme: 'eclipse',
                    tabSize: 4,
                    mode: this.currentMode,
                    lineNumbers: true,
                    line: true,
                }
            }
        },
        methods: {
            setSnippet(lang) {
                let snippet = ''

                if (lang === 'js')
                    snippet = jsSnippet
                else if (lang === 'py')
                    snippet = pythonSnippet
                else
                    snippet = cSnippet

                this.code = snippet
            },

            onCmReady(cm) {
                cm.on('keypress', () => {
                    cm.showHint({
                        hint: this.hintingFunction,
                        completeSingle: false
                    });
                })
            },
            onCmFocus() {},
            onCmCodeChange(newCode) {
                this.code = newCode;
            },
            onCmChange() {},

            hintingFunction(cm, options) {
                const dynamicWords = CodeMirror.hint.anyword(cm, options)

                const staticWords = CodeMirror.hint.fromList(cm, {
                    ...options,
                    words: pythonExtraHintWords
                })

                let words = dynamicWords.list

                if (staticWords !== undefined)
                    /** Don't forget to delete duplicates */
                    words = words.concat(staticWords.list)

                if (words.length > 0)
                    return {
                        list: words,
                        from: dynamicWords.from,
                        to: dynamicWords.to
                    }
            }
        },
        mounted() {
            this.setSnippet('py')
        },
        created() {
            CodeMirror.registerHelper('hintWords', 'python', pythonExtraHintWords)
        }
    }
</script>

<style>
    .outer-wrapper {
        margin-left: 5%;
        margin-right: 5%;
        margin-top: 2%;
    }

    .management {
        margin-bottom: 1em;
        display: flex;
        justify-content: space-around;
    }

    .editor {
        border: brown 1px solid;
    }

    .CodeMirror {
        border: 1px solid #eee;
        height: auto;
    }

    .explanation {
        font-size: 1.5em;
    }
</style>
