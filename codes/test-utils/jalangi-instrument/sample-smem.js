(function(sandbox) {
	var taintedIIDs = new Set();
	var taintedStrings = new Set();

	function MyAnalysis() {
	
	  this.getFieldPre = function (iid, base, offset, isComputed, isOpAssign, isMethodCall) {

	    if (typeof offset === 'symbol') return;
            
            // client query
            if (offset === 'query') {
            	var shadowObj = sandbox.smemory.getShadowObject(base, offset, true);
		console.log("[TAINT SOURCE] GET_FIELD_PRE "+sandbox.smemory.getIDFromShadowObjectOrFrame(shadowObj.owner)+"." + J$.iidToLocation(J$.sid, iid));
		 if (shadowObj.owner) {
		   shadowObj.owner.tainted = true;
		   console.log("[TAINT SOURCE] GET_FIELD_PRE set owner "+sandbox.smemory.getIDFromShadowObjectOrFrame(shadowObj.owner)+" to tainted");
		 }
		 taintedIIDs.add(iid);
	    }
	  };
	
	 this.getField = function(iid, base, offset, val) {
		if (typeof offset === 'symbol') return;

		 var shadowObj = sandbox.smemory.getShadowObject(base, offset, true);
		 if ((shadowObj.owner && shadowObj.owner.tainted) || 
		 	taintedIIDs.has(iid)) {
	 	      if (typeof val === 'string') {
		           const params = new URLSearchParams(val);
			   params.forEach(v => {
		            if (v.length > 0) {
		  	    	taintedStrings.add(v);
		  	    	console.warn(`[TAINT SOURCE] GET_FIELD marked tainted: '${v}'`);
			    }
			  });
		      } else if (Array.isArray(val)) {
			   val.forEach(v => {
			     // assuming that some middleware have parsed the request
			     if (v.length > 0) {
			     	taintedStrings.add(v);
				console.warn(`[TAINT SOURCE] GET_FIELD marked tainted: '${v}'`);
			     }
		  });

		 }
	 }
	};

	this.read = function (iid, name, val, isGlobal, isScriptLocal) {

	    // check if reading a tainted val?
	    if (typeof val === 'string' && taintedStrings.has(val)) {
	       console.log(`[TAINT PROPAGATION] READ tainted string '${val}' (iid ${iid})`);
	    }
	    // check if reading a tainted iid?
	    if (taintedIIDs.has(iid)) {
		console.log(`[TAINT PROPAGATION] READ tainted iid ${iid} (string literal '${val}')`);
	    }
	   
	    var shadowObj = sandbox.smemory.getShadowFrame(name);
	    if (shadowObj.owner && shadowObj.owner.tainted) {
	      console.log(`[TAINT PROPAGATION] READ tainted shadowObj with iid ${iid}, name ${name} and val '${val}'`);
	    }
	};
	
	this.write = function (iid, name, val, lhs, isGlobal, isScriptLocal) {
	     // check if writing to a tainted iid?
	     if (taintedIIDs.has(iid)) {
		console.log(`[TAINT PROPAGATION] WRITE to tainted iid ${iid} (previous string '${lhs}', overwritten to '${val}'`);
	     }
	     // check if writing a tainted val?
	     if (typeof lhs === 'string' && taintedStrings.has(lhs)) {
               console.log(`[TAINT PROPAGATION] WRITE tainted string '${lhs}' overwritten by '${val}' (iid ${iid})`);
	     }
	     if (taintedStrings.has(val)) {
		console.log(`[TAINT PROPAGATION] WRITE tainted string '${val}' to iid ${iid} (previous value '${lhs}'`);
		taintedIIDs.add(iid);
	     }
	     
	     var shadowObj = sandbox.smemory.getShadowFrame(name);
	     if (shadowObj.owner && shadowObj.owner.tainted) {
		console.log(`[TAINT PROPAGATION] WRITE to tainted shadowObj with iid ${iid}, name ${name} val '${val}' and lhs '${lhs}'`);
	     }
	};
	
	// UNUSED
	// this.binaryPre = function(iid, op, lhs, rhs) {
	// }
	
	this.binary = function(iid, op, lhs, rhs, result) {
	    if (taintedStrings.has(lhs) || taintedStrings.has(rhs)) {
		 console.log(`[TAINT PROPAGATION] BINARY OPERATION ${op} between '${lhs}' and '${rhs}' propagates to iid ${iid} '${result}'`);
		 taintedIIDs.add(iid);
		 taintedStrings.add(result);
	  }
	  return { result };
	};

  	this.invokeFun = function(iid, f, base, args, result) {
    	// Check if tainted value reaches exec()
    	if (f === require('child_process').exec) {
      	const cmd = args[0];
	console.log(`[TAINT SINK] INVOKE_FUNC checking cmd '${cmd}'`);

      	if (typeof cmd === 'string' && [...taintedStrings].some(t => cmd.includes(t))) {
        	console.log(`[TAINT SINK] INVOKE_FUNC iid=${iid} tainted value reached exec(): ${cmd}`);
      }
    }
    return { result };
  };
  }
    sandbox.analysis = new MyAnalysis();
})(J$);
