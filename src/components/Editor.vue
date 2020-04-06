<template>
    <div class="wrap">
        <div class="editor">
            <codemirror
                    v-model="codeC"
                    :options="options"></codemirror>
        </div>
    </div>
</template>

<script>
    import 'codemirror/lib/codemirror.css'
    import { codemirror } from 'vue-codemirror'
    import 'codemirror/theme/eclipse.css'
    import 'codemirror/mode/clike/clike'

    export default {
        name: "Editor",
        data() {
            return {
                codeJS: 'const a = 2;\n\nfunction () {\n    console.log(\'oh\');\n};',
                codeC: '#include <stdio.h>\n\nint main() {}',
                options: {
                    theme: 'eclipse',
                    tabSize: 4,
                    mode: 'text/x-csrc',
                    lineNumbers: true,
                    line: true,
                },
            }
        },
        components: {
            codemirror
        }
    }
</script>

<style>

    .wrap {
        border: brown 1px solid;
    }

</style>
