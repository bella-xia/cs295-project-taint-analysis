// analysis/taint_plugin.js
(function(sandbox) {
  var taintedVars = new Set();

  function MyAnalysis() {

  // Hook: after a function is called
  this.getField = function(iid, base, offset, val) {
	  if (val != null && offset === 'query') {
		  if (typeof val === 'string') {
			const params = new URLSearchParams(val);
			params.forEach(v => {
		  	  taintedVars.add(v);
		  	  console.warn(`[TAINT SOURCE] marked tainted: ${v}`);
			});
		  } else if (Array.isArray(val)) {
			  val.forEach(v => {
			   // assuming that some middleware have parsed the request
			   taintedVars.add(v);
			   console.warn(`[TAINT SOURCE] marked tainted: ${v}`);
		  });
		  }
	  }
  };

  this.invokeFun = function(iid, f, base, args, result) {
    // Check if tainted value reaches exec()
    if (f === require('child_process').exec) {
      const cmd = args[0];
      console.warn(`[TAINT SINK] checking cmd argument ${cmd}`);

      if (typeof cmd === 'string' && [...taintedVars].some(t => cmd.includes(t))) {
        console.warn(`[TAINT SINK] iid=${iid} tainted value reached exec(): ${cmd}`);
      }
    }
    return { result };
  };
  }
	
  sandbox.analysis = new MyAnalysis();
	

})(J$);
