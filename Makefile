NPX=npx
PNPM=pnpm

install:
	$(PNPM) install

server:
	$(NPX) vike dev

build:
	$(NPX) vike build
	$(MAKE) dist/client/sitemap.txt
	$(MAKE) dist/client/robots.txt
	touch dist/client/.nojekyll

deploy:
	$(NPX) gh-pages -d dist

compile:
	$(NPX) tsc --noEmit --strict

test:
	$(NPX) vitest --run

test/watch:
	$(NPX) vitest --watch

lint:
	$(NPX) prettier --check 'src/**/*.{ts, tsx, json, css}'

lint/fix:
	$(NPX) prettier --write 'src/**/*.{ts, tsx, json, css}'


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
