import json, argparse
from dataclasses import dataclass, asdict
from sarif_parser import parseSarif

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("-i", "--input", type=str, required=True)
    parser.add_argument("-o", "--output", type=str)
    args = parser.parse_args()


    with open(args.input, "r") as f:
        j = json.load(f)
    
    sarif_obj = parseSarif(j)
    if args.output:
        with open(args.output, "w") as f:
            json.dump([[asdict(inst) for inst in run] for run in sarif_obj], f, indent=4)
    else:
        print(sarif_obj)
