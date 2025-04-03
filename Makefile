NPM=npm
TSC=./node_modules/.bin/tsc

server:
	$(NPM) run server

build:
	$(NPM) run build
	$(MAKE) dist/client/sitemap.txt
	$(MAKE) dist/client/robots.txt
	touch dist/client/.nojekyll

deploy:
	$(NPM) run deploy

compile:
	$(TSC) --noEmit --strict

test:
	$(NPM) run test

test/watch:
	$(NPM) run test/watch


lint:
	$(NPM) run prettier/check

lint/fix:
	$(NPM) run prettier


dist/client/sitemap.txt:
	@echo https://ara-ta3.github.io/ >> $@
	@echo https://ara-ta3.github.io/cat/calorie >> $@
	@echo https://ara-ta3.github.io/cat/calorie/foods >> $@
	@echo https://ara-ta3.github.io/cat/calorie/transition >> $@
	@echo https://ara-ta3.github.io/cat/calorie/reference >> $@
	@echo https://ara-ta3.github.io/schedules >> $@

dist/client/robots.txt:
	@echo "User-agent: *" >> $@
	@echo "Allow: /" >> $@
	@echo "Sitemap: https://ara-ta3.github.io/sitemap.txt" >> $@
