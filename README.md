<<<<<<< HEAD
# Setting up a React And Firebase Project

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node](https://nodejs.org/en/) (version 16 is recommended)
- [Java DK](https://docs.oracle.com/en/java/javase/16/install/overview-jdk-installation.html#GUID-8677A77F-231A-40F7-98B9-1FD0B48C346A)
- [Firebase CLI](https://github.com/firebase/firebase-tools)

## Setup Guide

Check out the mentorship branch by running `git checkout mentorship`.

Navigate to the Firebase project directory `firebase-course` and run the setup script: `npm run setup`

Follow the prompts in the Firebase CLI to choose the features you want to set up for this directory. Use the following answers::

```
Enter the Project ID of the project you want to use:(Enter the project ID you just created)

* ? Which Firebase features do you want to set up for this directory?
  Firestore
  Emulators

* ? What file should be used for Firestore Rules? firestore.rules
? File firestore.rules already exists. Do you want to overwrite it with the Firestore Rules from the Firebase Console? No

? What file should be used for Firestore indexes? firestore.indexes.json
? File firestore.indexes.json already exists. Do you want to overwrite it with the Firestore Indexes from the Firebase Console? No

? Which Firebase emulators do you want to set up?
  Authentication Emulator
  Firestore Emulator

? Would you like to download the emulators now? Yes
```

Now that we've initialized the local Firebase directory, we can start using the project. Run Firebase Emulators with `npm run emulators`.
In another terminal, launch the app with `npm start`. The app will run on `localhost:3000`.
If the setup process was successful, you will see `Hello from Firestore Emulator` in the app.

Congratulations! The setup process is now complete.

## Troubleshooting

If you encounter the following issues during the setup process:

### Issue 1

```
It looks like you haven't used Cloud Firestore in this project before. 
Go to https://console.firebase.google.com/project/(yourprojectid)/firestore to create your Cloud Firestore database
```

Please follow these steps to resolve the issue:

- In the Firebase Dashboard, go to Project Settings -> General
- Set "Default GCP resource location" again.

### Issue 2

```
database: Port #### is not open on localhost, could not start Database Emulator.
```
or
```
Port #### is already in use 
```

For Linux/Mac OS run this command in the terminal:

```
sudo lsof -i tcp:typePortnumberhere
sudo kill -9 typeyourPIDhere
```

On Windows:

```
netstat -ano | findstr :typePortnumberhere
tskill typeyourPIDhere
```

## Contribute

🚧 This tutorial is a work in progress 🚧 We ❤️ feedback and help from fellow devs! If you found a bug, create an [issue](https://github.com/codebusters-ca/firebase-course/issues/new?labels=bug) or send us a [pull request](https://github.com/codebusters-ca/firebase-course/compare).
=======
# Welcome to the Firebase Tutorial

🚧 This tutorial is a work in progress 🚧 We would love to hear your feedback! Check out [open issues](https://github.com/codebusters-ca/react-firebase-starter/issues), create a [new one](https://github.com/codebusters-ca/react-firebase-starter/issues/new?labels=bug), or send us a [pull request](https://github.com/codebusters-ca/react-firebase-starter/compare).
>>>>>>> 9eb661c7262fecc8b739d00ad928dae36df8be3f

## Licence

This project is licensed under the [MIT license](https://github.com/codebusters-ca/firebase-course/blob/main/LICENSE).
