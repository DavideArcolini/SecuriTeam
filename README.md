# SecuriTeam_Broker
**SecuriTeam Broker**, managed by Team 4 (**SecuriTeam**) as part of the **Challenge@PoliTo By Firms: Become Passwordless**, sponsored by **Aruba S.p.A.**
About

SecuriTeam Broker is a comprehensive solution designed to facilitate passwordless authentication within organizations. It acts as a centralized unit that manages communication between the web application, FIDO server, and users. By leveraging the power of FIDO (Fast Identity Online) standards, SecuriTeam Broker enhances security and user experience, eliminating the need for traditional passwords.

## Team Members: 
| Name | Contact |
|:---:|:---:|
| Davide Arcolini | davide.arcolini@studenti.polito.it |
| Alessio Brescia | alessio.brescia@studenti.polito.it |
| Leandra Valenti | leandra.valenti@studenti.polito.it |
| Bianca Perra | bianca.perra@studenti.polito.it |
| Elmira Abedpour | elmira.abedpour@studenti.polito.it |

## Components

The SecuriTeam Broker simulation project consists of the following components:

- `webapp`: it represents the Internal Legacy Application of the company. It consists of:
  - React client: A user-friendly front-end application for interacting with the system.
  - Express backend: Simulates an internal legacy application and serves as the backend for the web application.
- `fidoserver`: it mocks the functionality of the [**StrongKey FIDO Server**](https://www.strongkey.com/products/software/fido-strong-authentication) by StrongKey. It consists of an Express backend: Mocks the functionality of a FIDO server using the `@simplewebauthn/server` library. This component handles FIDO registration and authentication operations.
- `broker`: the core product of the challenge, the broker acts as a centralized unit that facilitates communication between the web application and the FIDO server. It manages the flow of information and ensures seamless integration of the other two components.

## Development

To set up the development environment for the SecuriTeam Broker project, follow these steps:
- Clone the repository: git clone https://github.com/DavideArcolini/SecuriTeam.git
- Install the required packages with `npm`. In particular, navigate to: 
  - `application/client/src` and run `npm install`;
  - `application/server/src` and run `npm install`;
  - `broker/client/src` and run `npm install`;
  - `broker/server/src` and run `npm install`;
  - `fidoserver/server/src` and run `npm install`;
- Run the development servers with `npm`. In particular, navigate to:
  - `application/server/src` and run `npm run develop`;
  - `broker/server/src` and run `npm ruun develop`;
  - `fidoserver/server/src` and run `npm run develop`;
- Run the web clients with `npm`. In particular, navigate to:
  - `application/client/src` and run `npm start`;
  - `broker/client/src` and run `npm start`;

## Deployments

It is possible to deploy the whole infrastructure using `docker-compose`, by running, at the root of this repository, the following command:
```bash
docker-compose up
```

This will instantiate all the docker containers in a auto-configured and auto-managed networked docker infrastructure. If you want to set up only a subset of the components, you can run:
```bash
docker-compose up <component> <component> <...>
```
where `<component>` can be obtained directly from the `docker-compose.yaml` file.


### Requirements
In order to run `docker-compose` it is necessary to have Docker installed and running on the machine. To install and run Docker is outside of the scope of this simulation. You can follow the official installation guide at this page: [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)

## Acknowledges
We would like to express our sincere gratitude to Aruba S.p.A for sponsoring the **Challenge@PoliTo By Firms: Become Passwordless** and providing the opportunity to work on this project. Additionally, we would like to thank the entire SecuriTeam (Team 4) for their hard work and dedication in bringing this project to fruition.

If you have any questions or suggestions, feel free to reach out to any of our team members mentioned above. We appreciate your interest in the SecuriTeam Broker project!
