Decorators Utils - TS
===================

## Build
```bash
docker-compose build
```

## Run
```bash
docker-compose run app ts-node src/test/{file}.ts
```
Example
```bash
docker-compose run app ts-node src/test/generic.ts
```
Result
```bash
Call [3ms]: myMethod() => true
```
