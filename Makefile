NPM=npm
TSC=./node_modules/.bin/tsc

server:
	$(NPM) run server

build:
	$(NPM) run build
	$(MAKE) dist/client/sitemap.txt

deploy:
	$(NPM) run deploy

compile:
	$(TSC) --noEmit --strict

test:
	$(NPM) run test

lint:
	$(NPM) run prettier/check

dist/client/sitemap.txt:
	@echo https://ara-ta3.github.io >> $@
	@echo https://ara-ta3.github.io/cat/calorie/ >> $@
	@echo https://ara-ta3.github.io/schedules/ >> $@
