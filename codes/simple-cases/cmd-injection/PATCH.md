1. Constants.js
    function HOP
    add 
```
if (typeof prop === 'symbol') return false;
```
    at first line

2. runtime/SMemory.js 
    function getOwnerAndAccess
    add
```
if (typeof prop === 'symbol') return { owner: undefined, isProperty: true };
```
    at first line

3. We encountered a new issue on March 15th. Specifically, 'merge-descriptors' updates to 2.x.x (uses EX6 default parameter syntax) in the duration of few weeks, causing the jalangi2 instrumentation to break.  

To resolve this, modify package.json to be 

{
    "overrides": {
        "merge-descriptors": "1.0.3"
}
}

To check for version updates and incompatibility, we used `cat node_modules/merge-descriptors/package.json | grep '"version"' to check the version and compare to most recent update histories in npm`

