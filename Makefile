command := docker-compose run -u 1000 --rm app

install:
	${command} npm install

format:
	${command} npm run format
	${command} npm run tslint:fix

test_generic:
	${command} ts-node src/test/generic.ts

