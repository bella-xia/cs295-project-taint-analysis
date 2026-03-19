#Dockerfile
# use a very specific node version to avoid update problems
FROM node:18.20.8-slim

RUN apt-get update && apt-get install -y        \
    git curl unzip python3 vim tmux build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /analysis

# just run for now
CMD ["tail", "-f", "/dev/null"]
