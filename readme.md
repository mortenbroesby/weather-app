# Weather app

This is a weather app. The intent is to make use of the OpenWeather API https://openweathermap.org/

## Goal set for myself:

Search for a city or request the users location in the browser.

Make a page that shows the daily and hourly chart of the weather forecast for this location.

Create one chart to show all of the following:

* Rain amount.
* Temperature.
* Humidity.

Style it with correct weather icons.

---

## Installation

Prerequisites:

- Install NPM dependencies

```
npm install
```

To serve the project in the browser, run this command in the terminal:

```
npm run dev
```

To build the project for distribution:

```
npm run build
```

See here for more information: [https://parceljs.org/getting_started.html](https://parceljs.org/getting_started.html)

---

## Future considerations
- Add more pages and overlays. E.g. a settings page with personal preferences.
- Ensure application is responsive and adaptive, e.g. for mobile devices or large screens.
- Further atomise components where applicable.
- Setup namespaced sub-modules per domain in VueX store.
- Add end-to-end tests using Cypress.
- Increase unit test code coverage. Add more unit tests.
- Use Now.sh for interim deployment.
