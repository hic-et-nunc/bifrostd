
function curry(fx) {
  let arity = fx.length;

  return function f1() {
    let args = Array.prototype.slice.call(arguments, 0);

    if (args.length >= arity) {
      return fx.apply(null, args);
    } else {
      return function f2() {
        var args2 = Array.prototype.slice.call(arguments, 0);
        return f1.apply(null, args.concat(args2));
      };
    }
  };
}

module.exports = curry(function(log, formatter, filter, lvl, message) {
  return log(filter(lvl(formatter(message))));
});
