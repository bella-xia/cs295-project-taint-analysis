from .models import (VarSpec, PhysicalLocSpec, 
                     FlowStep, ThreadFlow, CodeFlow, TaintTrace)

def parseLoc(j: dict[str, any]) -> PhysicalLocSpec | None:
    if j.get("physicalLocation", None) is None: # no such field, just None
        return None

    loc = j['physicalLocation']
    locSpec = PhysicalLocSpec()
    if loc.get('region', None) is not None:
        locSpec.startLine = loc['region'].get('startLine', -1)
        locSpec.startColumn = loc['region'].get('startColumn', -1)
        locSpec.endColumn = loc['region'].get('endColumn', -1)

    if loc.get('artifactLocation', None) is not None:
        locSpec.uri = loc['artifactLocation'].get('uri', '?')
        locSpec.uriBase = loc['artifactLocation'].get('uriBase', '?')
    
    return locSpec

def parseVar(j: dict[str, any]) -> VarSpec | None:
    if j.get('message', None) is None:
        return None
    msg = j['message']
    varSpec = VarSpec()
    varSpec.name = msg.get('text', '?')
    return varSpec

def parseResult(j: dict[str, any]) -> TaintTrace:
    res_obj = TaintTrace()
    res_obj.rule_id = j['ruleId']

    sink_loc = j['locations'][0] 
    res_obj.sink = FlowStep(
            physicalLoc=parseLoc(sink_loc),
            variable=parseVar(sink_loc)
            )
    
    for codeFlow in j['codeFlows']:
        codeFlowSpec = CodeFlow()
        
        for threadFlow in codeFlow['threadFlows']:
            threadFlowSpec = ThreadFlow()

            for step in threadFlow['locations']:
                step_loc = step['location']

                flowStepSpec = FlowStep(
                        physicalLoc=parseLoc(step_loc),
                        variable=parseVar(step_loc)
                        )
                threadFlowSpec.steps.append(flowStepSpec)

            codeFlowSpec.threadFlows.append(threadFlowSpec)

        res_obj.codeFlows.append(codeFlowSpec)
    return res_obj

def parseRun(j: dict[str, any]):
    results = []
    for res in j['results']:
        results.append(parseResult(res))
    return results

def parseSarif(j: dict[str, any]):
    runsRecord = []
    for run in j['runs']:
        runsRecord.append(parseRun(run))
    return runsRecord
