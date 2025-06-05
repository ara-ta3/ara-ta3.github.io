WEB_DIR=web
DIST_DIR=$(WEB_DIR)/dist
NPX=npx
PNPM=pnpm

install:
	$(PNPM) install

server:
	cd $(WEB_DIR) && $(NPX) vike dev

build:
	cd $(WEB_DIR) && $(NPX) vike build
	$(MAKE) $(DIST_DIR)/client/sitemap/sitemap.xml
	$(MAKE) $(DIST_DIR)/client/robots.txt
	touch $(DIST_DIR)/client/.nojekyll
	cp -r $(WEB_DIR)/resources/cat $(DIST_DIR)/client/cat

deploy:
	$(NPX) gh-pages -d $(DIST_DIR)

compile:
	cd $(WEB_DIR) && $(NPX) tsc --noEmit --strict

test:
	cd $(WEB_DIR) && $(NPX) vitest --run

test/watch:
	cd $(WEB_DIR) && $(NPX) vitest --watch

lint/eslint:
	cd $(WEB_DIR) && $(NPX) eslint .

lint/prettier:
	cd $(WEB_DIR) && $(NPX) prettier --check 'src/**/*.{ts,tsx,json,css}'

lint: lint/eslint lint/prettier

lint/eslint/fix:
	cd $(WEB_DIR) && $(NPX) eslint . --fix

lint/prettier/fix:
	cd $(WEB_DIR) && $(NPX) prettier --write 'src/**/*.{ts,tsx,json,css}'

lint/fix: lint/eslint/fix lint/prettier/fix

$(DIST_DIR)/client/sitemap:
	mkdir -p $@

$(DIST_DIR)/client/sitemap/sitemap.xml: $(DIST_DIR)/client/sitemap
	cp -f ./$(WEB_DIR)/resources/sitemap.xml $@

$(DIST_DIR)/client/robots.txt:
	cp -f ./$(WEB_DIR)/resources/robots.txt $@
