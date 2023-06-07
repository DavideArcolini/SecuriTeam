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

The SecuriTeam Broker project consists of the following components:

- `webapp`: it represents the Internal Legacy Application of the company. It consists of:
  - React client: A user-friendly front-end application for interacting with the system.
  - Express backend: Simulates an internal legacy application and serves as the backend for the web application.
- `fidoserver`: it mocks the functionality of the [**StrongKey FIDO Server**](https://www.strongkey.com/products/software/fido-strong-authentication) by StrongKey. It consists of an Express backend: Mocks the functionality of a FIDO server using the `@simplewebauthn/server` library. This component handles FIDO registration and authentication operations.
- `broker`: the core product of the challenge, the broker acts as a centralized unit that facilitates communication between the web application and the FIDO server. It manages the flow of information and ensures seamless integration of the other two components.

## Development

To set up the development environment for the SecuriTeam Broker project, follow these steps:
- Clone the repository: git clone https://github.com/<username>/SecuriTeam-Broker.git
- Install the necessary dependencies:
  - For the web application, navigate to the web-app directory and run `npm install`.
  - For the FIDO server, go to the fido-server directory and run `npm install`.
  - For the broker, navigate to the broker directory and run `npm install`.
- Start the development servers:
  - For the web application, navigate to the web-app directory and run `npm start`.
  - For the FIDO server, go to the fido-server directory and run `npm start`.
  - For the broker, navigate to the broker directory and run `npm start`.
- Access the web application in your browser at `http://localhost:8001`.

## Deployments

Currently, the SecuriTeam Broker project does not have any specific deployment instructions. However, you can deploy the individual components (web application, FIDO server, and broker) using your preferred hosting platform or infrastructure.
Acknowledgements

## Acknowledges
We would like to express our sincere gratitude to Aruba S.p.A for sponsoring the **Challenge@PoliTo By Firms: Become Passwordless** and providing the opportunity to work on this project. Additionally, we would like to thank the entire SecuriTeam (Team 4) for their hard work and dedication in bringing this project to fruition.

If you have any questions or suggestions, feel free to reach out to any of our team members mentioned above. We appreciate your interest in the SecuriTeam Broker project!
