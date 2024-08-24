Here is the documentation on Django based web server for Questify project. In this document, we are going to cover main technologies used to build the backend side of the Questify and how to get a dev environment up and running on your system.

## Technologies

	* Python (v3.11.2)
	* Pip: package management (v22.3.1)
	* Django: web app development framework (v3.2.25)
	* PostgreSQL: main DB (v13.3)
	* DRF: Rest APIs (v3.14.0)
	* DRF spectacular: swagger docs & Open API spec generation (v0.26.2)
	* Graphene: Graphql API server and schema generation (v2.1.9) 
	* Channels: ASGI & Websocket functionality (v3.0.5)
	* Redis: message transport layer (v5.0.14)
## Dev Environment Setup

This project was developed as a monorepo, so when you clone the project repository it automatically downloads the frontend client source code as well but you will work inside `questify_server` folder wherein backend codes are held.

### Creating Virtual Env

Assuming you are currently at the very root folder of the project, run this command to create a virtual environment for python packages

```bash
$ python -m venv virtualenv
```

This will create an `env` folder at the root of the project, now you should activate it:

```bash
$ . ./virtualenv/Scripts/activate
```

### Installing Dependencies

Make sure the virtual env is activated then run this command to get all the required packages installed in your env:

```bash
$ cd questify_server # there's a requirements.txt file in this folder
$ python -m pip install -r requirements.txt
```

**Note:** This command will fail in a country like Iran as Pypi is blocked, therefore you have to use pypi mirrors to work around this problem. There is a `pip_mirrors.txt` file in `questify_server` folder wherein you can find a list of pypi mirrors which can be used like this:

```bash
$ pip install --trusted-host [host] -i [address] -r requirements.txt
```

**example:** (run this command and see if it works, if it doesn't choose another mirror and try again)

```bash
$ pip install --trusted-host http://pypi.douban.com -i http://pypi.douban.com/simple/ -r requirements.txt
```

### Setting up a Postgres database

Install Postgres and create a database with this configuration:

```SQL
-- Database: questify

-- DROP DATABASE questify;

CREATE DATABASE questify
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Persian_Iran.1256'
    LC_CTYPE = 'Persian_Iran.1256'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
```

If you are logged in with a different user, change the `OWNER = postgres` line to `OWNER = yourusername` before executing the query

### Setting Environment Variables

Now you just need to provide all the information to the Django configuration through env vars. To do this, create a `.env.development.local` file inside `env` folder of `questify_server`. Then add the following content:

```config
POSTGRES_DB_HOST=127.0.0.1
POSTGRES_DB_PORT=5432
POSTGRES_DB_NAME=questify
POSTGRES_DB_USER=postgres
POSTGRES_DB_PASSWORD=youruserpassword

REDIS_CHANNEL_HOST=127.0.0.1
REDIS_CHANNEL_PORT=6379
```

Note: depending on what you've done in previous steps, change the parameters as needed.

### Applying Migrations On DB

```bash
$ python manage.py migrate
```

### Generate Open API and Graphql schemas

This step is optional and it is only to have better intellisense in  VS Code environment when working on front-end with typescript.

```bash
$ . .\generate_gql_schema.ps1 # this is for Graphql
$ . .\generate_schema.cmd # this is for Open API 
```
### Running The Dev Server

you just need to run the `runserver.ps1` script to run the server

```bash
$ . .\runserver.ps1
```

### Where to go from here?
