NPM=npm


deploy:
	$(NPM) run deploy
	cp -f dist/index.html dist/404.html