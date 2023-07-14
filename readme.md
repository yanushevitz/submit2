# What is "Submit?"

Submit is imageboard-style social platform created in PHP with JS front-end components. It doesn't have any fancy functionality - mainly designed to just work with all features already introduced

# How to deploy the project?

In source code, there is "docker" directory, go into it, add to docker-compose.yml environmental variables and run

```bash
docker-compose up -d --build
```

Then, enter database container using command:

```bash
docker exec -it submit2_db sh
```

and enter the mysql CLI. Then create database "submit". Next, exit container and run

```bash
docker exec -it submit2_app sh
```

and migrate migrations:

```bash
symfony console doctrine:migrations:migrate
```

# Is this page bulletproof?

Someday it might be, but so far it suffers from security issues

# Can I contribute?

Of course, but if you like to, text me so we can consider changes and ideas. Also feel free to contact me with any feedback you have

# Did Gomez know about fire wizards murder?

[no.](https://youtu.be/uAsIRW86750)
