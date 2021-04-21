# Record Shelves App

Welcome to the Record Shelves App, a tool for organizing your record collection into different named shelves. There are a number of features implemented already, but still a ways to go before we're ready for public release.

[Live site](https://record-shelves.netlify.app/)

## Current Features Include

- Displays first page of records for user `blacklight`
- Can add/remove shelves for organizing records
- Can rename existing shelves
- Can add records to particular shelves
- Can reorder records within shelves
- Can move records between shelves

## Outstanding Tasks

| Name | Type | Description |
| --- | --- | --- |
| Paginate records | Feature | Currently only the first page of results is fetched, implement fetching for subsequent pages. |
| Let users specify Discogs username | Feature | Currently only records belonging to `blacklight` are considered, the app should provide a place to gather a new username and fetch records for them.
| Drag and drop to add record to shelf | Enhancement | Dragging records between shelves and reordering them within a shelf works, but selecting an initial shelf from a dropdown is less intuitive. Implement dragging a record from the list of records onto its first shelf. |
| Improve overall UX | Enhancement | Identify areas of interaction within the app that are unpleasant and reduce that friction. |
| Improve overall styles | Enhancement | Make the template your own, add colors and change layout based on design choices you find preferable. One way to start is by making the app more responsive at different page widths. |
| Only add record once to shelf | Defect | A record can be added to a specific shelf multiple times, which leads to jarring behavior when dragging one of the duplicates around or removing it. Only one copy of a record should be allowed on a given shelf.
| Add tests | Debt | The test coverage for the app's functionality is lacking, improve coverage on key interactions. |

## Developing

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
