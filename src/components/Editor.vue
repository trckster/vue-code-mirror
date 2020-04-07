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
                    v-model="code"
                    :options="options">
            </codemirror>
        </div>
    </div>
</template>

<script>
    import 'codemirror/lib/codemirror.css'
    import { codemirror } from 'vue-codemirror'
    import 'codemirror/theme/eclipse.css'
    import 'codemirror/mode/javascript/javascript'
    import 'codemirror/mode/clike/clike'
    import 'codemirror/mode/python/python'

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
                    snippet =
`// Simple comment

function somefunc() {
    console.log('ok');
}

const var = 2;
const bln = false;

var += 2;

while (var < 10) {
    var += 2;
    let pr = new Promise();

    if (var === 4)
        somefunc();

    regex(/its_a_fek/);
}`
                else if (lang === 'py')
                    snippet =
`import one from two

literal = 79228162514264337593543950336L

if literal > 0 or True:
    two.comeOn('test')

"""
string or comment
"""

# Simple comment

@nonsenseDecorator
def doesNothing():
    return 'no-way'

class Heh:
    pass

# Python 3.6 f-strings (https://www.python.org/dev/peps/pep-0498/)
f'My name is {name}, my age next year is {age + 1}, my anniversary is {anniversary:%A, %B %d, %Y}.'
f'He said his name is {name!r}.'
f"""He said his name is {name!r}."""
f'{"quoted string"}'
f'{{ {4*10} }}'
f'This is an error }'
f'This is ok }}'
fr'x={4*10}\\n'
`
                else
                    snippet =
`#include "mystuff/util.h"

use namespace std;

namespace {
enum Enum {
  VAL1, VAL2, VAL3
};

char32_t unicode_string = U"\\U0010FFFF";
string raw_string = R"delim(anything
you
want)delim";

int Helper(const MyType& param) {
  return 0;
}
} // Simple comment

/**
 * Simple comment
 */

class ForwardDec;

int main() {
    int a;

    cin << a;

    cout << "Oh " << a;

    return (0);
}
`
                this.code = snippet
            }
        },
        mounted() {
            this.setSnippet('py')
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
</style>
