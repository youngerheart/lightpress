default: help

help:
	@echo "   \033[35mmake test\033[0m \033[1m运行测试脚本\033[0m"

test:
	@echo "   \033[35m********** String test **********"
	@mocha --reporter list --ui bdd -c
	@echo "   \033[35m********** Ending test **********"


.PHONY: test