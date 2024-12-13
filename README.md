# TaskList Manager

**TaskList Manager is a React application that allows users to manage their tasks efficiently. It provides features such as inline editing, task filtering, and state management to keep track of tasks.**

## Features

-- Inline Editing: Edit tasks directly within the table.

-- Task Filtering: Filter tasks based on their status.

-- State Management: Manage the state of tasks when adding or editing them.

-- Data Fetching: Fetch and process data from a dummy API.

## Code Overview

### Inline Editing
-- The ReactTabulator library is used to implement inline editing functionality. The editable property is set to true in the column definitions, allowing users to edit the table directly within the cells.

### Data Fetching
-- Data is fetched from the dummy API using the Axios library. The fetchData function makes an asynchronous GET request to the https://jsonplaceholder.typicode.com/todos endpoint and stores the fetched data in the taskData state.

### Task Filtering
-- Tasks are filtered based on their status using the headerFilter property provided by the ReactTabulator library. A custom formatter is used to display a dropdown menu for changing task statuses.

### State Management
-- The state of tasks is managed using React's useState hook. The taskData state holds the array of tasks, while the taskCounts state keeps track of the number of tasks marked as "Done" and "ToDo." The useEffect hook updates the task counts whenever the taskData state changes.
