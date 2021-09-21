# Read and transfer device accelerometer data - Version 2

The application was created by  
`npx create-react-app phone_accelerometer`

Material UI  
`npm install @material-ui/core`
`npm install @material-ui/icons` 

Axios - HTTP request for React 
`npm install axios`

Redux state management  
`npm install react-redux`  
`npm install redux-saga` 
see also: https://github.com/erikras/ducks-modular-redux

# Node Red Scoring Flow
In order to send data from a browser to a Node Red http input node, Node Red has to be configured to reply to CORS requests from the browser:

1. Go to Node Red Toolchain (IBM Cloud -> Resource List -> Developer Tools -> NODERED....)
2. Open GIT Repo for Node Red
3. Edit bluemix-settings.js
4. after `functionGlobalContext: { }, ` add  
  ```
    // The following property can be used to configure cross-origin resource sharing
    // in the HTTP nodes.
    // See https://github.com/troygoode/node-cors#configuration-options for
    // details on its contents. The following is a basic permissive set of options:
    httpNodeCors: {
      origin: "*",
     methods: "GET,PUT,POST,DELETE"
    },
  ```

# IBM Cloud Toolchain Deployment
1) Create a new empty toolchain
2) Add the GitHub tool, configure with github credentials and project URL
3) Add a Delivery Pipeline tool
    - add a build stage, builder type npm  
    add at the end of the build script add:  
    `npm install`  
    `npm run build`  
    - add a deploy stage, deployer type Cloud Foundry  
    **NOTE:** change the `-name: XXX-iot` in the `manifest.yml` file to your IOT organization name -> this will be the first part of the application URL!!!
    replace the deploy script with:  
    `#!/bin/bash`  
    `cp -v Staticfile build &&`  
    `cp -v manifest.yml build &&`  
    `cd build &&`  
    `cf push -f manifest.yml`  



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
