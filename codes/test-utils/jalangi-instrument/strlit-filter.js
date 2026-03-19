(function(sandbox) {
	var taintedStrings = new Set();

	var MALICIOUS_PATTERNS = [
		/[;&|`$]/, 	// `// comment injection chars
		/\,\,\//, 	// path traversal
		/['"]/, 		//"'// quote injection	
	];

	function isMalicious(val) {
		return MALICIOUS_PATTERNS.some(function(p) {return p.test(val);});
	}

	function MyAnalysis() {
	
	 this.getField = function(iid, base, offset, val) {
		if (typeof offset === 'symbol') return;

		 if (offset === 'query') {
	 	      if (typeof val === 'string') {
		           const params = new URLSearchParams(val);
			   params.forEach(v => {
		            if (typeof v === 'string' && 
				    v.length > 0 &&
			    	    isMalicious(v)) {
		  	    	taintedStrings.add(v);
		  	    	console.log(`[TAINT SOURCE] GET_FIELD marked tainted: '${v}'`);
			    }
			  });
		      } else if (Array.isArray(val)) {
			   val.forEach(v => {
			     // assuming that some middleware have parsed the request
			     if (typeof v === 'string' &&
				     v.length > 0 && 
			     	     isMalicious(v)) {
			     	taintedStrings.add(v);
				console.log(`[TAINT SOURCE] GET_FIELD marked tainted: '${v}'`);
			     }
		  });

		 }
	 }
	};

	this.binary = function(iid, op, lhs, rhs, result) {
	    if (taintedStrings.has(lhs) || taintedStrings.has(rhs)) {
		 console.log(`[TAINT PROPAGATION] binary op '${op}' between '${lhs}' and '${rhs}', propagates to '${result}'`);
		 taintedStrings.add(result);
	  }
	  return { result };
	};

  	this.invokeFun = function(iid, f, base, args, result) {
	// 1. check for functions that may propagate taint
	if (typeof result === 'string' && !taintedStrings.has(result)) {
		if (taintedStrings.has(base)) {
		    taintedStrings.add(result);
		    console.log(`[TAINT PROPAGATION] INVOKE_FUN '${f.name}' with base '${base}', progagate to '${result}'`);
		}

		var argsArr = Array.from(args || []);
		if (argsArr.some(arg => taintedStrings.has(arg))) {
		    taintedStrings.add(result);
		    var printableArgs = argsArr.map(function(a) {
    return typeof a === 'function' ? (a.name || '<anonymous>') : a;
});
		    console.log(`[TAINT PROPAGATION] INVOKE_FUN '${f.name}' with arguments '${[...printableArgs]}', propagate to '${result}'`);
		}
	}
	
		
	// 2. check for functions that may sink taint
    	// Check if tainted value reaches exec()
	var cp = require('child_process');
    	if (f === cp.exec || f === cp.execSync ||
	    f === cp.spawn || f === cp.spawnSync ||
	    f === cp.execFile || f === cp.execFileSync) {
      	const cmd = args[0];
      	if (typeof cmd === 'string' && taintedStrings.has(cmd)) {
        	console.log(`[TAINT SINK] INVOKE_FUN tainted value '${cmd}' reached '${f.name}'`);
      }
    }
    return { result };
  };
  }
    sandbox.analysis = new MyAnalysis();
})(J$);
