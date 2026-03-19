rm -rf /tmp/db

codeql database create /tmp/db \
  --language=javascript --source-root=/analysis/codes/example-01/src

codeql database analyze /tmp/db \
	/opt/codeql-queries/javascript/ql/src/Security/CWE-078/CommandInjection.ql \
	--format=sarif-latest --output=/analysis/results/static-ex01.sarif
