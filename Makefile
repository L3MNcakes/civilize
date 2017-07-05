start:
	gulp && docker build -t l3mncakes/civilize . && docker run --name civilize -d -p 1234:80 -v `pwd`/dist/:/usr/share/nginx/html:ro l3mncakes/civilize

stop:
	docker stop civilize && docker rm civilize

restart:
	make stop && make start
