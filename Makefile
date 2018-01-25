install:
	@if [ ! -f "$$(which nodemon)" ]; then npm --registry=http://registry.npm.taobao.org install nodemon -g; fi
	@if [ ! -f "$$(which eslint)" ]; then npm --registry=http://registry.npm.taobao.org install eslint babel-eslint -g; fi
	@npm --registry=http://registry.npm.taobao.org install

dev: install
	@eslint --fix admin/**/*.js core/*.js core/**/*.js theme/**/*.js
	@nodemon core/index.js

start: install
	@nodemon core/muti.js
