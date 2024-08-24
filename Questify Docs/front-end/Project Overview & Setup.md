
Here is the documentation on React based client for Questify project. In this document, we are going to cover main technologies used to build the frontend side of the Questify and how to get a dev environment up and running on your system.

## Technologies

* Node (v18.15.0)
* Vite (bundling & compilation) (vite/4.3.9 win32-x64 node-v18.15.0)
* React (UI rendering) (v18.2.0)
* React MUI (UI design lib) (v5.13.3)
* Recoil (global state management throughout the app) (v0.7.7)
* React Router DOM (routing) (v6.11.2)
* Yarn (package management) (v3.5.1)

## Dev Environment Setup

This project was developed as a monorepo, so when you clone the project repository it automatically downloads the backend server source code as well but you will work inside `questify_client` folder wherein front-end codes are held.

### Installing Dependencies

Make sure you have yarn installed on your system, then run these commands:

```bash
$ cd questify-community/questify_client
$ yarn install
```

### Setting Environment Variables

You can find an example file of all environment variables that need to be set in `env/.env.example` file. Create a `.env.development.local` file inside the `env` folder of `questify_client` and set the values like this:

```dotenv
VITE_SERVER_ADDR=http://192.168.1.100:8000
VITE_WS_ADDR=ws://192.168.1.100:8000
```

Replace the addresses with the correct IP address and port that the backend server is running on.

### Configuring and Running the Backend App

Now it is the time to run a local backend. If you already have access to a testing server, skip this part, otherwise follow through this link to get the backend app up and running.

* [[back-end/Project Overview & Setup|Setting up the backend app]] 

### Generating types & Running modifier scripts

In order to have a better intellisense in VS Code, you should generate both Open API and Graphql types. Also there's another script which modifies some of the generated files to setup the file upload mechanism.

**Note:** Before running these scripts, make sure you have already [[back-end/Project Overview & Setup#Generate Open API and Graphql schemas|generated the schemas]] by the backend app.

```bash
$ yarn gen:api
$ yarn gen:gql-types
$ yarn add-file-exts
```
### Running Vite Development Server

Now you are ready to 

```bash
$ yarn dev
```


## Where To Go From Here?

Read these documents in sequence from top to bottom. These documents don't cover every technical detail but they give you an intuition of anatomy of the app.

- [[Routing]]
- [[Global App Layout]]
- authentication:
	- [[User Login]]
	- [[Keeping User Logged In]]
	- [[Loading User Profile]]
	- [[User Logout]]
- user profile:
	- [[User Profile Menu]]
	- [[Editing User Profile]]
- questions:
	- [[Listing Questions In The Feed]]
	- [[Asking A New Question]]
	- [[Editing An Existing Question]]
	- [[Deleting A question]]
	- [[Seeing Question Details]]
- answers:
	- [[Posting A New Answer]]
	- [[Editing, Deleting & Accepting An Answer]]
- notifications:
	- [[Receiving & Viewing Notifications]]