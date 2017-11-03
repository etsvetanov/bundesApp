# bundesApp
A Bundesliga appication

## Build steps
1. git clone https://github.com/etsvetanov/bundesApp.git
2. cd bundesApp/
3. vagrant up
4. Go to localhost:4567

## Technologies 
* React - a very popular and powerful library for building modular UIs;
* Redux - a powerful state management library/framework. Redux (almost completely) removes state management from the React components and leaves those components concerned mainly with the UI. Great for separation of concerns;
* reselect - a great library for creating memoized selectors;
* normalizr - a library for data normalization/denormalization - working with normalized data is more often than not beneficial;
* create-react-app - a react project initializer - creates a boilerplate react project with very sensible default configurations (e.g. webpack), dev server, hot reloading, dev/prod builds and easy "eject" functionality if the project needs to be customized fully;
* semantic-ui-react - semanticUI is a pleasant alternative to Bootstrap and makes prototyping and creating small apps much faster. "semantic-ui-react" is a library of React wrappers around the css/js components;

## Workflow

Initial plan was to use React without Components but the application contains several pages that use differents "pieces" of the same information. Managing this information with Redux is much easier. Simple thunk action creators were used to fetch the data. Since each page expects different data, the selectors (functions that take the application state and return the required / processed data) are actually doing the heavy lifting. The "match" data is normalized when fetched via the API and denormalized inside the selectors when needed. No backend/persistence layer was deemed necessary.

As for the deployment part, I have not used Ansible/Fabric much so I've written a small provisioning script for Vagrant - I could've written a small fabfile but I wasn't sure how it ties with Vagrant provisioning - I have bit more experience with Docker. The provisioning script install dependencies (nginx, node, npm), installs npm dependencies and builds the production react app. The application is then served by nginx (due to time constraints, a small cheat was used - linking the /build folder to default nginx www folder. A proper config file would certainly be a better option).
