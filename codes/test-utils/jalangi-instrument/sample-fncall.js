// analysis/taint_plugin.js
(function(sandbox) {
  var taintedVars = new Set();

  function MyAnalysis() {

  // Hook: after a function is called
  this.invokeFunPre = function(iid, f, base, args) {
	  console.warn(`[LOG] about to invoke function (${f.name || "anonymous`"})`);
  };

  this.invokeFun = function(iid, f, base, args, result) {
    // Check if tainted value reaches exec()
    if (f === require('child_process').exec) {
      const cmd = args[0];
     console.warn(`[LOG] potential tainted value reached exec(): ${cmd}`);

      if (typeof cmd === 'string' && [...taintedVars].some(t => cmd.includes(t))) {
        console.warn(`[LOG] iid=${iid} tainted value reached exec(): ${cmd}`);
      }
    }
    return { result };
  };
  }
	
  sandbox.analysis = new MyAnalysis();
	

})(J$);
