WEB_DIR=frontend
DIST_DIR=$(WEB_DIR)/dist

PNPM=pnpm

install:
	$(PNPM) install

install/playwright:
	$(PNPM) -C $(WEB_DIR) exec playwright install

server:
	$(PNPM) -C $(WEB_DIR) exec vike dev

server/build: build
	$(PNPM) -C $(WEB_DIR) exec serve dist/client -l 3000

build:
	$(PNPM) -C $(WEB_DIR) exec vike build
	$(MAKE) $(DIST_DIR)/client/sitemap.xml
	$(MAKE) $(DIST_DIR)/client/robots.txt
	touch $(DIST_DIR)/client/.nojekyll
	cp -r $(WEB_DIR)/resources/cat $(DIST_DIR)/client/cat

deploy:
	$(PNPM) exec gh-pages -d $(DIST_DIR)

compile:
	$(PNPM) -C $(WEB_DIR) exec tsc

test:
	$(PNPM) -C $(WEB_DIR) exec vitest --run

test/watch:
	$(PNPM) -C $(WEB_DIR) exec vitest --watch

test/e2e:
	$(PNPM) -C $(WEB_DIR) exec playwright test

test/e2e/ui:
	$(PNPM) -C $(WEB_DIR) exec playwright test --ui

lint/eslint:
	$(PNPM) -C $(WEB_DIR) exec eslint .

lint/prettier:
	$(PNPM) -C $(WEB_DIR) exec prettier --check 'src/**/*.{ts,tsx,json,css}' 'tests/**/*.{ts,json}'

lint: lint/eslint lint/prettier

lint/eslint/fix:
	$(PNPM) -C $(WEB_DIR) exec eslint . --fix

lint/prettier/fix:
	$(PNPM) -C $(WEB_DIR) exec prettier --write 'src/**/*.{ts,tsx,json,css}' 'tests/**/*.{ts,json}'

lint/fix: lint/eslint/fix lint/prettier/fix

$(DIST_DIR)/client/sitemap:
	mkdir -p $@

$(DIST_DIR)/client/sitemap.xml: $(DIST_DIR)/client/sitemap
	cp -f ./$(WEB_DIR)/resources/sitemap.xml $@

$(DIST_DIR)/client/robots.txt:
	cp -f ./$(WEB_DIR)/resources/robots.txt $@
