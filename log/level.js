
var log = function(level, value) {
  return function(obj) {
    return Object.assign({}, {lvl: level, level: value}, obj);
  };
};

const DEBUG = -200;
const INFO  = -100;
const WARN  = 0;
const ERR   = 100;
const FATAL = 200;

module.exports = {
  value: {
    debug: DEBUG,
    info: INFO,
    warn: WARN,
    err: ERR,
    fatal: FATAL,
  },
  debug: log("debug", DEBUG),
  info: log("info", INFO),
  warn: log("warn", WARN),
  err: log("err", ERR),
  error: log("err", ERR),
  fatal: log("fatal", FATAL),
};

