var cfork = require('cfork');
var util = require('util');

cfork({
  exec: './core/index.js',
  count: require('os').cpus().length
}).on('fork', function(worker) {
  console.warn('[%s] [worker:%d] new worker start', new Date(), worker.process.pid); //eslint-disable-line
}).on('disconnect', function(worker) {
  console.warn('[%s] [master:%s] wroker:%s disconnect, suicide: %s, state: %s.', //eslint-disable-line
    new Date(), process.pid, worker.process.pid, worker.suicide, worker.state);
}).on('exit', function(worker, code, signal) {
  var exitCode = worker.process.exitCode;
  var err = new Error(util.format('worker %s died (code: %s, signal: %s, suicide: %s, state: %s)',
    worker.process.pid, exitCode, signal, worker.suicide, worker.state));
  err.name = 'WorkerDiedError';
  console.error('[%s] [master:%s] wroker exit: %s', new Date(), process.pid, err.stack); //eslint-disable-line
}).on('reachReforkLimit', function() { // emit when reach refork times limit
  // do what you want
});
