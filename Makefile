NPM=npm
TSC=./node_modules/.bin/tsc

server:
	$(NPM) run server

build:
	$(NPM) run build
	cp -f dist/index.html dist/404.html

deploy:
	$(NPM) run deploy

compile:
	$(TSC) --noEmit --strict

test:
	$(NPM) run test
