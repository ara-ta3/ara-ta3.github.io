NPM=npm
VITE=./node_modules/.bin/vite

server:
	$(NPM) run server

build:
	$(NPM) run build

preview:
	$(VITE) preview

deploy:
	$(NPM) run deploy
