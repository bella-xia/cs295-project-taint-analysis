#Dockerfile
FROM node:20-slim

RUN apt-get update && apt-get install -y        \
    git curl unzip python3 vim build-essential  \
    && rm -rf /var/lib/apt/lists/*

# Install CodeQL CLI
RUN curl -L https://github.com/github/codeql-cli-binaries/releases/latest/download/codeql-linux64.zip \
    -o /tmp/codeql.zip && unzip /tmp/codeql.zip -d /opt && rm /tmp/codeql.zip
RUN git clone --depth=1 https://github.com/github/codeql /opt/codeql-queries

ENV PATH="/opt/codeql:$PATH"

WORKDIR /analysis

# just run for now
CMD ["tail", "-f", "/dev/null"]
