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

# What actually works?

- registering/loging users (via Auth0 API)
- creating threads and comments
- popping-up modals for creating post and comment
- uploading files
- refreshing without page reload (thanks to react.js)
- desktop/mobile version
- logout
- search engine (at the moment only searches thread's content)

# What doesn't work nor implemented yet?

- comment/post deletion (this feature was implemented in Submit 1.0 but it was broken so it's not implemented yet)
- comment/post sanitization
- comment/post cooldown
- pop-ups after refreshing, making new thread etc.
- public user profiles (this idea has to be considered deeply)
- following mechanism
- post reporting mechanism
- design sucks, I'm afraid of it
- administration panels
- error handling (for example when sending too large image, only error shows in API's response)
- any unit tests, ~~I'm too dumb for this~~ n-no need for them actually when everything works ehehe~

# Can I contribute?

Of course, but if you like to, text me so we can consider changes and ideas. Also feel free to contact me with any feedback you have

# Did Gomez know about fire wizards murder?

[no.](https://youtu.be/uAsIRW86750)

# Images gallery

![submit](https://i.ibb.co/MNwsNtF/submit6.png)
![submit](https://i.ibb.co/zbwsxq4/submit5.png)
![submit](https://i.ibb.co/rcPNfK9/submit2.png)
![submit](https://i.ibb.co/qY2xcXV/submit3.png)
![submit](https://i.ibb.co/1sPLSfK/submit4.png)