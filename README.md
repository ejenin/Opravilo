To build api image:

In root directory
```
docker build -f ./docker/api/Dockerfile . --tag opravilo.api
```

Before running api in compose:
```
cd docker
docker compose up
```

To run api in docker for development - 

```
cd docker/api
docker compose up
```

To build frontend image:
in app directory:
```
docker build . --tag opravilo.web
```

To run frontend in docker for development - 
```
cd docker/web
docker compose up
```