# JS Fullstack task for Schibsted

## Create a simple issue tracker with UI.
An issue should have a title, description and one of three states: open, pending and closed. Once an issue is pending it cannot be set back to open, similarly if an issue is closed it cannot be set back to pending or open.

The minimal requirement is to provide a list view where you can see the issues and change their state. Use JavaScript (can be transpiled, but don't go crazier than ECMA stage 3).

Other than that, you're in charge. Choose whatever tools you're comfortable with and add whatever features you think would make sense. Do it as if it was your regular job assignment. Oh, and we really like tests.
It should take you about 3-5 hours.

## Solution

## Installing
The project is a mono-repo based on yarn workspaces.
To install dependencies and start the project in the development mode:

```bash
yarn
yarn start
```
Then open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To run tests call:
```bash
yarn test
```

You could run it using a docker composer by:
```bash
docker-compose up --build
```


### Back-end
As the requirement was to keep things simple I decided to not use any database and store data in the JSON file. From one point of view, it allowed me to show myself, on the other hand, I'm not sure that using a simple database driver as SQLite or even some ORM would introduce significant complexity.
As in the real application, the issue tracker most likely will be only a part I created a separate sub-application with its own router and a model.


The states transition logic is kept in the state machine which is in a real application could much more complex.

Util.js is a set of utility functions which are in a real application would be substituted by Lodash, Rambda or methods of ORM instance.

In a real application, you would obviously need some authentication service as well but is out of the scope of this task.

### Front-end
As in a position description was mentioned read a chose the Create React App a base for an application. For the same reasons I mentioned above the front-end part was created with modularity in mind.
The application contains two different kinds of modules. Visual, or widgets what are stored in the `widgets` folder, and non-visual, which are in the `store` folder. For now, there is only one non-visual module -- **issues**.
There two visual entities: **IssuesTracker** and **ErrorScreen**. There is such thing as **atom** it is a reusable dumb component to be shared across widgets.

The non-visual components are built using a `redux` and `redux-saga`. The main idea was to make those modules highly independent. As mount points and actions are generated during instantiation there is a possibility to use the same module multiple times in an application and use any mount points in a Redux store.

End-Points communication was moved to a separate module. The idea was to let it later attach different API to the feature, to make it possible to have several issue-trackers in the application pointing to different end-points.

The visual and non-visual features are instantiated and bound in the `App`.

### TODO
The application now definitely is not bulletproof. There are no checks for the correctness of requests. They have to be introduced.

Front-end API has to be made more abstract to make it possible to connect different API to a module.

Authentification has to be introduced.

Obviously, the application needs much more tests, plus different aspects have to be tested.
For now, only the components content is tested. Has to be introduced tests for behavior: clicks, callbacks etc. 
End-to-End tests have to be introduced with the Puppeteer. The server API has to be tested separately with a Supertest.

There are no new Entry dialog and a confirmation of removing, and there are a lot of things to be improved but I was seriously out of time for a time-based test task.

