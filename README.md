<div align="center">
  <h1>💻 Inforeader</h1>
  <a href="https://inforeader.netlify.app/" target="_blank">View Demo</a>
  <br/><br/>

  ![Version](https://img.shields.io/github/package-json/v/marcode24/inforeader-frontend?style=popout&logo=npm)
  ![GitHub CI Workflow Status](https://img.shields.io/github/actions/workflow/status/marcode24/inforeader-frontend/ci.yml?branch=main&style=popout&logo=testcafe&label=tests)
  ![GitHub repo size](https://img.shields.io/github/repo-size/marcode24/inforeader-frontend?style=popout&logo=github&label=repo%20size)
  ![GitHub](https://img.shields.io/github/license/marcode24/inforeader-frontend?style=popout&logo=github&label=license)
  ![GitHub Repo stars](https://img.shields.io/github/stars/marcode24/inforeader-frontend?style=popout&logo=apachespark&color=yellow&logoColor=yellow)
  ![Github repo views](https://img.shields.io/github/search/marcode24/inforeader-frontend/inforeader-frontend?style=popout&logo=github&label=repo%20views)
  ![GitHub last commit](https://img.shields.io/github/last-commit/marcode24/inforeader-frontend?style=popout&logo=git&label=last%20commit)
</div>

## 🚀 Getting Started

This is a web application that allows you to read technology news, using RSS feeds from different sources and saving them in a database. It also allows you to create a user account and save your favorite news.

###  📝 Requirements

- [![Angular](https://img.shields.io/badge/Angular-blue?style=popout&logo=angular&logoColor=red)](https://angular.io/)
- [![Node](https://img.shields.io/badge/Node-gray?style=popout&logo=node.js)](https://nodejs.org/en/)
- [![NPM](https://img.shields.io/badge/NPM-blue?style=popout&logo=npm)](https://www.npmjs.com/)
- [![Git](https://img.shields.io/badge/Git-gray?style=popout&logo=git)](https://git-scm.com/)

Optional tools:

- [![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-blue?style=popout&logo=visual-studio-code)](https://code.visualstudio.com/)

### 📦 Installation & Usage

```bash
# Clone this repository
git clone https://github.com/marcode24/inforeader-frontend

# Go into the repository
cd inforeader-frontend

# Install dependencies
npm install

# Run the app
ng serve
```

shut it down manually with `Ctrl-C` or `Cmd-C`.

## 📐 Tests

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:cov
```

## 🌎 Environments

| Name       | URL                                                                | PORT |
| ---------- | -----------------------------------------------------------------  | ---- |
| Localhost  | [localhost](http://localhost:4200)                                 | 4200 |
| Production | [https://inforeader.netlify.app/](https://inforeader.netlify.app/) |

## 📁 Folder Structure

    .
    ├── src
    │ ├── app                 # Source code application
    │ │ │── auth              # Module for auth feature
    │ │ ├── core              # Module as a singleton
    │ │ │ ├── components
    │ │ │ ├── constants
    │ │ │ ├── guards
    │ │ │ ├── interfaces
    │ │ │ ├── models
    │ │ │ ├── pipes
    │ │ │ ├── services
    │ │ │ └── utils
    │ │ ├── features          # Module for features which compose the application
    │ │ ├── shared            # Module for components shared between application modules
    │ │ │ ├── components
    │ ├── assets              # Styles, images, icons, fonts etc
    │ ├── environments        # Config by environment (localhost and production)
    │ └── styles              # Global styles
    └── README.md

## 📝 License

This project is under the [MIT](./LICENSE) license. See the LICENSE for more information. 😉

## 🖼️ Previews
<details>
  <summary>Click to expand!</summary>

### 🖥️ Desktop

![home-1](https://res.cloudinary.com/dfeujtobk/image/upload/v1658346332/InfoReader/home-1_gpqyqq.png)
![home-2](https://res.cloudinary.com/dfeujtobk/image/upload/v1658346331/InfoReader/home-2_hpojr8.png)
![home-3](https://res.cloudinary.com/dfeujtobk/image/upload/v1658346331/InfoReader/home-4_vqxco3.png)
![home-4](https://res.cloudinary.com/dfeujtobk/image/upload/v1658346331/InfoReader/home-3_qqeh64.png)

### 📱 Mobile

![mobile-1](https://res.cloudinary.com/dfeujtobk/image/upload/v1658346331/InfoReader/mobile-1_wjz51l.png)
![mobile-2](https://res.cloudinary.com/dfeujtobk/image/upload/v1658346331/InfoReader/mobile-2_d7umlp.png)
![mobile-3](https://res.cloudinary.com/dfeujtobk/image/upload/v1658346332/InfoReader/mobile-4_dbtnph.png)
![mobile-4](https://res.cloudinary.com/dfeujtobk/image/upload/v1658346331/InfoReader/mobile-3_r1ppv3.png)
