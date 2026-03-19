(function(sandbox) {
	var taintedStrings = new Set();
	var ignoreStrings = [
    		'true', 'false', 'null', 'undefined', '',
    		'object', 'string', 'number', 'function',  // typeof results
    		'GET', 'POST', 'PUT', 'DELETE', 'http', 'ok',  // HTTP-related
    '		utf8', 'utf-8',                            // encodings
    		'0', '1',                                   // common numeric strings
	];
	var ignoreFunctions = [
		// noise sink functions
		'', // complete blank for no reason loll
		'Object.<anonymous>', // like literally no information
		'RegExp.test', // low value sink
		'Object.assign', // more for propagation than sink?
		// 'write', 'send', 'header', 'contentType', // express internals
		// '_swift', '_output +=', '_ctx.', // swig template rendering
		// 'byteLength', 'indexOf', 'push', 'hasOwnProperty',
		// 'isBuffer', 'from', // low-value sinks (e.g. fs template loading, buffer conversion, HTTP response building)
		// 'View', 'extname', 'lookup', // internal fs stuff 
		// 'tryStat', 'statSync', 
		// 'readPartials', 'cacheGet', 'cacheSet', 'reader',
	];

	var skipOps = ['===', '!==', '==', '!=', 
		'<', '>', '<=', '>=', 'instanceof', 'in'];

	var concatCounter = 0;
	var concatResult = '';

	function shouldIgnore(v) {
    		return typeof v !== 'string' || ignoreStrings.indexOf(v) !== -1 || taintedStrings.has(v);
	}

	function hasTaint(val, visited) {
    		visited = visited || new WeakSet();
    
    		if (typeof val === 'string') {
        		return taintedStrings.has(val);
    		}
    
    		if (typeof val !== 'object' || val === null) {
        		return false;
    		}
    
    		// avoid circular reference infinite loops
    		if (visited.has(val)) {
       	 		return false;
    		}
    		
		visited.add(val);
    
    		// check arrays and objects recursively
    		try {
       	 		var keys = Object.keys(val);
        		for (var i = 0; i < keys.length; i++) {
            		if (hasTaint(val[keys[i]], visited)) {
                		return true;
            			}
        		}
    		} catch(e) {
       			// some objects (Buffers, native objects) may throw on Object.keys
        		return false;
    		}
    
   		 return false;
	}	

	function safeStringify(obj) {
		const seen = new WeakSet();

		try {
			return JSON.stringify(obj, (key,val) => {
				if (typeof val === 'object' && val !== null) {
					if (seen.has(val)) return '[Circular]';
					seen.add(val);
				}
				return val;
			});
		} catch (e) {
			return '[Unstringifiable]';
		}
	}

	function MyAnalysis() {
	
	 this.getField = function(iid, base, offset, val) {
		if (typeof offset === 'symbol') return;
		if (typeof val === 'function') return;

		 if (offset === 'query' || offset === 'body') {
	 	      if (!shouldIgnore(val)) {
		           const params = new URLSearchParams(val);
			   params.forEach(v => {
		            if (v.length > 0) {
		  	    	taintedStrings.add(v);
		  	    	console.log(`[TAINT SOURCE] GET_FIELD marked tainted: '${v.slice(0, 100)}'`);
			    }
			  });
		      } else if (Array.isArray(val)) {
			   val.forEach(v => {
			     // assuming that some middleware have parsed the request
			     if (v.length > 0) {
				if (typeof v === 'string' && ignoreStrings.indexOf(v) !== -1) return;
			     	taintedStrings.add(v);
				console.log(`[TAINT SOURCE] GET_FIELD marked tainted: '${v.slice(0, 100)}'`);
			     }
		  });

		      } else if (typeof val === 'object' && val !== null) {
        		   // body is a parsed object — taint it and all its string values
        	 	   // taintedObjects.add(val);
        		   Object.keys(val).forEach(function(k) {
            			if (!shouldIgnore(val[k])) {
                			taintedStrings.add(val[k]);
                			console.log('[TAINT SOURCE] GET_FIELD body field tainted: ' + val[k].slice(0, 100));
            			}
	 		});
		}
	} else if (offset === 'files') {
			if (val && val.products && val.products.data) {
			const data_str = val.products.data.toString();
			taintedStrings.add(data_str);
			console.log('[TAINT SOURCE] GET_FIELD body field tainted: ' + data_str.slice(0, 100));
		}
	 }
};

	this.binary = function(iid, op, lhs, rhs, result) {
	    // those operations do not propagate string
	    if (skipOps.indexOf(op) !== -1) return { result };

	    if (!shouldIgnore(result) && op === '+' && (lhs !== '' && rhs !== '') && 
		    (lhs === concatResult || rhs === concatResult)) {
		    concatResult = result;
		    concatCounter++;
		    return { result };
	    }

	    if (concatCounter != 0) {
		    // previous concat data
		    console.log(`[TAINT PROPAGATION] executed ${concatCounter} binary operations on tainted string, propagate to '${concatResult.slice(0, 100)}'`);
		    taintedStrings.add(concatResult);
		    concatCounter = 0;
		    concatResult = '';
	    }

	    if ((taintedStrings.has(lhs) || taintedStrings.has(rhs)) 
		    && !shouldIgnore(result)) {
		concatResult = result;
		    concatCounter++;
	    }
	  return { result };
	};


 	this.instrumentCodePre = function (iid, code) {
		if (typeof code === 'string' && taintedStrings.has(code))
			console.log(`[POTENTIAL SINK] INSTRUMENT_CODE tainted value '${code.slice(0, 100)}' reached eval instrumentation`);
	};
	
	// sink check should happen here
	// because for some attacks the function may never finish
	// e.g. while(1) / process.kill execition
	this.invokeFunPre = function(iid, f, base, args) {
		// clean previous concat result (if any)
		
		var fnName = (base && base.constructor ? base.constructor.name : '[None]'); 
		fnName += '.';
		fnName += (f.name || '<anonymous>');

		if (concatCounter != 0) {
		     // previous concat data
			console.log(`[TAINT PROPAGATION] executed "${concatCounter}" binary operations on tainted string, propagate to "${concatResult.slice(0, 100)}"`);
			taintedStrings.add(concatResult);
			concatCounter = 0;
			concatResult = '';
	    	}

		// ignore
		if (!f || ignoreFunctions.indexOf(fnName || '') != -1)
			return;

		var argsArr = Array.from(args || []);
		if (argsArr.some(arg => hasTaint(arg))) {
			var printableArgs = argsArr.map(function(a) 
				    {
					    if (typeof a === 'function') return (a.name.slice(0, 100) || '<anonymous>');
					    if (typeof a === 'string') return a.slice(0, 100);
					    if (typeof a === 'object') return safeStringify(a);
					    return a;
				    });

			console.log(`[POTENTIAL SINK] INVOKE_FUN tainted value '${[...printableArgs]}' reached '${fnName}'`);
		}
	};

  	this.invokeFun = function(iid, f, base, args, result) {
		// ignore	
		if (!f) return;
		var fnName = (base && base.constructor ? base.constructor.name : '[None]'); 
		fnName += '.';
		fnName += (f.name || '<anonymous>');

		// 1. check for functions that may propagate taint
		if (!shouldIgnore(result)) {

			var argsArr = Array.from(args || []);
			if (argsArr.some(arg => hasTaint(arg))) {
			    taintedStrings.add(result);
			    var printableArgs = argsArr.map(function(a) 
				    {
					    if (typeof a === 'function') return (a.name.slice(0, 100) || '<anonymous>');
					    if (typeof a === 'string') return a.slice(0, 100);
					    if (typeof a === 'object') return safeStringify(a);
					    return a;
				    });

		   	console.log(`[TAINT PROPAGATION] INVOKE_FUN '${fnName}' with arguments '${[...printableArgs]}', propagate to '${result.slice(0, 100)}'`);
			}
		}	
		return { result };
    	};
  }
    sandbox.analysis = new MyAnalysis();
})(J$);
