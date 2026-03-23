WEB_DIR=frontend
DIST_DIR=$(WEB_DIR)/dist

PNPM=pnpm
MARP=$(PNPM) exec marp
MARP_THEME_SET=--theme-set ./slides/themes/ara-ta3.css

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
	cp -r $(WEB_DIR)/resources/assets $(DIST_DIR)/client/assets
	$(MAKE) marp
	$(MAKE) marp/image

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

$(DIST_DIR)/client/slides:
	mkdir -p $@

$(DIST_DIR)/client/slides/assets:
	mkdir -p $@

$(DIST_DIR)/client/slides/themes:
	mkdir -p $@

marp: $(DIST_DIR)/client/slides $(DIST_DIR)/client/slides/assets $(DIST_DIR)/client/slides/themes
	$(MARP) --input-dir ./slides $(MARP_THEME_SET) --output $(DIST_DIR)/client/slides
	cp -f slides/themes/ara-ta3.css $(DIST_DIR)/client/slides/themes/ara-ta3.css
	cp -f slides/assets/ara_ta3-avatar.jpeg $(DIST_DIR)/client/slides/assets/ara_ta3-avatar.jpeg

marp/image: slides/assets
	$(MARP) --input-dir ./slides --output $(DIST_DIR)/client/slides/assets --image png

marp/watch: slides
	$(MARP) --input-dir ./slides $(MARP_THEME_SET) --output $(DIST_DIR)/client/slides --watch

marp/server: slides
	$(MARP) --input-dir ./slides $(MARP_THEME_SET) --server
