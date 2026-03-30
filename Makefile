.PHONY: up dev restart down build logs

up:
	docker compose up -d

dev:
	docker compose up

restart:
	docker compose restart

down:
	docker compose down

build:
	docker compose build --no-cache

logs:
	docker compose logs -f
