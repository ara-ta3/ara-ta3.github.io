NPM=npm


build:
	$(NPM) run build
	cp -f dist/index.html dist/404.html

deploy:
	$(NPM) run deploy
