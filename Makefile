NPX=npx
PNPM=pnpm

install:
	$(PNPM) install

server:
	$(NPX) vike dev

build:
	$(NPX) vike build
	$(MAKE) dist/client/sitemap/sitemap.xml
	$(MAKE) dist/client/robots.txt
	touch dist/client/.nojekyll
	cp -r resources/cat dist/client/cat

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

dist/client/sitemap:
	mkdir -p $@

dist/client/sitemap/sitemap.xml: dist/client/sitemap
	cp -f ./resources/sitemap.xml $@

dist/client/robots.txt:
	cp -f ./resources/robots.txt $@
