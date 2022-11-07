## Makefile

all:
	yarn install && yarn run start

clean:
	echo "No test to execute"

unit_tests:
	echo "No test to execute"

fclean:	clean
	rm -rf node_modules/
	echo "[node_module] has been delete"

re:	clean fclean all

.PHONY:	all re clean fclean unit_tests