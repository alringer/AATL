# README

This README file documents the necessary steps to set up the client-side application for LFB.

### How do I get set up?

-   Install all packages by running the following command in the root directory of this repository:
    > npm install
-   Ensure that the local database, services, and keycloak are running
-   Start the local client server by running the following command:
    > npm run dev

### Deployment

-   Note that we have **QA**, **Staging**, and **Production** environments for this project
-   Each environment is built from a pipeline, listening to their respective branch on Bitbucket as follows:
-   QA environment (www-qa.localfoodbuzz.com) listening to branch:
    > qa
-   Staging environment (www-staging.localfoodbuzz.com) listening to branch:
    > staging
-   Production environment (www.localfoodbuzz.com) listening to branch:
    > master
-   In order to deploy to any of the above environment, create and merge a PR to any of the above branch. This will trigger a codebuild to deploy the latest code to the environment with the newly introduced code.
-   Best order for code deployment is as follows:
    > develop ==> qa ==> staging ==> master

### Example Workflow

-   Create a new branch off the latest branch of **develop**
-   Modify code. Test locally.
-   Create a PR of the new branch into **develop**
-   Merge the PR. Now, the **develop** is updated.
-   Create a PR of **develop** into **qa**
-   Merge the PR and verify the changes on www-qa.localfoodbuzz.com
-   Once the changes are verified, create a PR of **qa** into **staging**
-   Merge the PR and verify the changes on www-staging.localfoodbuz.com
-   Once the changes are verified, create a PR of **staging** into **master**
-   Merge the PR and verify the changes on www.localfoodbuzz.com

### Quick Fixes

-   All of the constant string values can be found in **src/StringConstants.js**
