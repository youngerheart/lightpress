install:
	@if [ ! -f "$$(which nodemon)" ]; then npm --registry=http://registry.npm.taobao.org install nodemon -g; fi
	@npm --registry=http://registry.npm.taobao.org install

dev: install
	@eslint --fix admin/**/*.js core/**/*.js theme/**/*.js
	@nodemon core/index.js
