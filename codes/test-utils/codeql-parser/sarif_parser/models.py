from dataclasses import dataclass, field

@dataclass
class VarSpec:
    name: str = "?"

@dataclass
class PhysicalLocSpec:
    startLine: int = -1 # let's do -1 for unknown or unspec now
    startColumn: int = -1
    endColumn: int = -1

@dataclass
class FlowStep:
    variable: VarSpec | None = None
    physicalLoc: PhysicalLocSpec | None = None

@dataclass
class ThreadFlow:
    steps: list[FlowStep] = field(default_factory=list)

@dataclass
class CodeFlow:
    threadFlows: list[ThreadFlow] = field(default_factory=list)

@dataclass
class TaintTrace:
    rule_id: str = ""
    message: str = ""
    sink: FlowStep | None = None
    codeFlows: list[CodeFlow] = field(default_factory=list)
