.PHONY: up dev restart down build logs

# Spin up the entire stack including databases
up:
	docker compose up -d

# Spin up the stack in foreground for logs/development
dev:
	docker compose up

# Full restart of all services
restart:
	docker compose restart

# Tear down the stack and stop containers
down:
	docker compose down

# Force a rebuild of all images
build:
	docker compose build --no-cache

# View logs for all services
logs:
	docker compose logs -f
