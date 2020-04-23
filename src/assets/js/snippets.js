const jsSnippet =
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

const pythonSnippet =
    `import one from two

literal = 79228162514264337593543950336L

# Our beauty constant demonstration
STRANGE_BLACK_WALL_GROUP_CONSTANT = 1111111

# Error sample demonstration
stupid stupid-error error

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

const cSnippet =
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
}`

export { jsSnippet, pythonSnippet, cSnippet };