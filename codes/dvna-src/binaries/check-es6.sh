echo "const/let:" && grep -rc "const \|let " . --include="*.js" | grep -v ":0" | wc -l
echo "arrows:" && grep -rc "=>" . --include="*.js" | grep -v ":0" | wc -l
echo "template literals:" && grep -rc '`' . --include="*.js" | grep -v ":0" | wc -l
echo "destructuring:" && grep -rc "const {" . --include="*.js" | grep -v ":0" | wc -l
echo "classes:" && grep -rc "^class \|= class " . --include="*.js" | grep -v ":0" | wc -l
echo "for...of:" && grep -rc "for.*of " . --include="*.js" | grep -v ":0" | wc -l
echo "await:" && grep -rc "await " .  --include="*.js" | grep -v ":0" | wc -l

