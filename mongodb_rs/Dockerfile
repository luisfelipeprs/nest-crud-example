ARG MONGO_VERSION=latest

FROM mongo:${MONGO_VERSION}

# Install envsubst for variable substitution
RUN apt-get update && apt-get install -y gettext-base

# Start MongoDB in replica set mode
ENTRYPOINT mongod --port $MONGO_REPLICA_PORT --replSet rs0 --bind_ip 0.0.0.0 & MONGOD_PID=$!; \
# usa mongosh ao invés de mongo
INIT_REPL_CMD="rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: '$MONGO_REPLICA_HOST:$MONGO_REPLICA_PORT' }] })"; \
until mongosh --port $MONGO_REPLICA_PORT --eval "$INIT_REPL_CMD"; do sleep 1; done; \
echo "REPLICA SET ONLINE"; wait $MONGOD_PID;
