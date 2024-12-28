NPM=npm
TSC=./node_modules/.bin/tsc

server:
	$(NPM) run server

build:
	$(NPM) run build

deploy:
	$(NPM) run deploy

compile:
	$(TSC) --noEmit --strict

test:
	$(NPM) run test

lint:
	$(NPM) run prettier/check
