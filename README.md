<div align="center">
  <img src="https://raw.githubusercontent.com/gist/CassianoJunior/753f20be94de37b85c3262d723cefe88/raw/c9792a6b7350c5edbaabb264b89fa563318deff0/job.svg" width="25%" />
</div>

<h1 align="center">Employee Management</h1>

<p align="center">A simple app to manage a company's employees</p>
<p align="center">
  <a href="https://github.com/CassianoJunior"><img src="https://img.shields.io/badge/created%20by-CassianoJunior-4BBAAB" alt="Creator badge" /></a>
  <a href="https://employee-api-gx8v.onrender.com"><img src="https://img.shields.io/badge/api%20status-running-2dd4bf" alt="Creator badge" /></a>
  <a href="https://github.com/CassianoJunior"><img src="https://img.shields.io/badge/api%20deadline-June 15, 2023-f87171" alt="Creator badge" /></a>
</p>

## Table of contents
  
- [Figma Design](#figma-project)
- [Preview](#preview)
- [Demo video](#demo-video)
- [Features](#features)
- [Api](#api)
- [Installation](#installation)
- [Stack](#stack)
- [Project structure](#project-structure)

### Figma project

[Open in figma](https://www.figma.com/file/YBV5dssPC5C3hac9cRCn46/Practical-test---Grupo-Seven?node-id=0%3A1&t=UMepKwwAeEkm9Qsr-1)

### Preview

![Preview gif](https://gist.githubusercontent.com/CassianoJunior/753f20be94de37b85c3262d723cefe88/raw/7f4b68560612f8cf4cdbba876a035b648d569699/preview-employee-management.gif)

### Demo video

[Open youtube](https://youtu.be/GiRL1TdyUv0)

### Features

- Add employee
- Delete employee
- Update employee
- Search employee by name or email
- Context API
- Profile image select
- Toggle white/dark theme

### Api

The API repository is available [here](https://github.com/CassianoJunior/employee-api)

### Installation

#### Requirements

- [Node](https://nodejs.org) - Node.js is an open-source, cross-platform JavaScript runtime environment.
- [Git](https://git-scm.com) - Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

#### Install and execute

Clone this repository using:

```bash
  git clone https://github.com/CassianoJunior/employee-management.git  
```

In directory created, open terminal and install dependencies

```bash
  npm i
```

To start project run:

```bash
  npx expo start
```

On your device, scan the QR code that appears on the terminal, on ios just open your camera. If you have an Android device, install the [Expo Go app](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt-br)  from the Play Store and scan code with app

### Stack

- [Expo](expo.dev) - Expo is an open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React.
- [React Native](reactnative.dev) - React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces.
- [TypeScript](typescriptlang.org) - TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- [Expo Camera](https://docs.expo.dev/versions/latest/sdk/camera/) - Expo camera provides a React component that renders a preview of the device's front or back camera
- [Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/) - Expo image picker provides access to the system's UI for selecting images and videos from the phone's library or taking a photo with the camera
- [React Navigation](https://reactnavigation.org) - Routing and navigation for Expo and React Native apps.
- [Lucide icons](https://lucide.dev) - Beautiful & consistent icon toolkit made by the community.
- [React hook form](https://react-hook-form.com) - Performant, flexible and extensible forms with easy-to-use validation.
- [React Native paper](https://reactnativepaper.com) - React Native Paper is a high-quality, standard-compliant Material Design library that has you covered in all major use-cases.
- [React Native Reamimated](https://docs.expo.dev/versions/latest/sdk/reanimated/) - React native reanimated provides an API that greatly simplifies the process of creating smooth, powerful, and maintainable animations.
- [Styled Components](styled-components.com) - Visual primitives for the component age
- [Zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation with static type inference
- [Moment](https://momentjs.com) - Parse, validate, manipulate,
and display dates and times in JavaScript.
- [Axios](https://axios-http.com) - Promise based HTTP client for the browser and node.js

### Project structure

```bash
  $PROJECT_ROOT
    ├── App.tsx        # Entry point
    └── src
        ├── @types     # Type declarations
        ├── api        # Axios
        ├── components # UI Components
        ├── contexts   # App contexts
        ├── routes     # App routes
        ├── screens    # Screen components
        └── theme      # App theme

```
