# Check if the container is already running
CONTAINER_NAME="f1_api"
IS_RUNNING=$(docker ps -q -f name=$CONTAINER_NAME)

# Build and start the container if it's not running
if [ -z "$IS_RUNNING" ]; then
    echo "Container is not running. Building and starting the container..."
    docker compose up -d --build
else
    echo "Container is already running."
fi

# Run migrations inside the container
echo "Running migrations..."
docker exec -it $CONTAINER_NAME npm run typeorm migration:run