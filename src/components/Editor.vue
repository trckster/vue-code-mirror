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
    </div>
</template>

<script>
    import 'codemirror/lib/codemirror.css'
    import { CodeMirror, codemirror } from 'vue-codemirror'
    import 'codemirror/theme/eclipse.css'
    import 'codemirror/addon/hint/show-hint'
    import 'codemirror/addon/hint/show-hint.css'

    /** Linters for languages JS, C, Python */
    import 'codemirror/mode/javascript/javascript'
    import 'codemirror/mode/clike/clike'
    import 'codemirror/mode/python/python'

    import pythonExtraHintWords from "@/assets/js/pythonExtraHintWords";

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
`#include "somefile.h"

typedef struct {
  void* arg_socket;
  zmq_msg_t* arg_msg;

  sem_t sem;
} acl_zmq_context;

/**
 * Simple comment
 */

#define p(X) (context->arg_##X)

void* zmq_thread(void* context_pointer) {
  acl_zmq_context* context = (acl_zmq_context*)context_pointer;
  char ok = 'K', err = 'X';
  int res;

  while (1) {
    while ((res = sem_wait(&context->sem)) == EINTR);
    if (res) {write(context->signal_fd, &err, 1); goto cleanup;}
    switch(p(command)) {
    case 0: goto cleanup;
    case 1: p(socket) = zmq_socket(context->context, p(int)); break;
    case 6: p(int) = zmq_setsockopt(p(socket), p(int), (void*)p(string), p(len)); break;
    case 9: p(int) = zmq_poll(p(socket), p(int), p(len)); break;
    }
    p(command) = errno;
    write(context->signal_fd, &ok, 1);
  }
 cleanup:
  close(context->signal_fd);
  free(context_pointer);
  return 0;
}

void* zmq_thread_init(void* zmq_context, int signal_fd) {
  acl_zmq_context* context = malloc(sizeof(acl_zmq_context));
  pthread_t thread;

  context->context = zmq_context;
  sem_init(&context->sem, 1, 0);
  pthread_create(&thread, 0, &zmq_thread, context);
  return context;
}

`
                this.code = snippet
            },
            onCmReady(cm) {
                cm.on('keypress', () => {
                    cm.showHint({
                        completeSingle: false
                    });
                })
            },
            onCmFocus() {},
            onCmCodeChange(newCode) {
                this.code = newCode;
            },
            onCmChange() {},
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
</style>
