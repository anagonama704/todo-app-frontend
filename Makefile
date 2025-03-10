build:
	docker-compose build
up:
	docker-compose up -d
down:
	docker-compose down
apps:
	docker-compose exec app sh
