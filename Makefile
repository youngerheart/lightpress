default: help

help:
	@echo "   \033[35mmake\033[0m \033[1m命令使用说明\033[0m"
	@echo "   \033[35mmake install\033[0m\t---  安装依赖"
	@echo "   \033[35mmake clean\033[0m\t---  清除已经安装的依赖"
	@echo "   \033[35mmake server\033[0m\t---  启动api并进入server dev模式（运行watch并且运行restify）"

install:
	@if which cnpm > /dev/null; then \
    cnpm install && cd server && cnpm install && cd ../; \
  else \
    npm install && cd server && npm install && cd ../; \
  fi; \

dev: install
	@gulp dev;
