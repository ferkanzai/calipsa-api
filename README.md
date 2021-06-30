# Full-Stack Engineer Test

## Instructions

- Complete as much of the test as you can in the time allotted. We suggest that you spend about 2 hours on this task.
  The aim of the test is to understand how you approach the problem.
- Make sure you are using GIT to keep track of your changes so that we can better understand your thought process, and
  source control discipline.
- Use the included JSON data as the data for your application.
- When complete run `git bundle create <your-name>`
- Things to consider include:
  - Maintainability of the code
  - Our core systems use Node on the back-end and VueJS on the front-end. You are free to deviate from this, but using
    these will help us with the review of your solution.

## Data format

Since there is a lot of data in the JSON file, this will help you to understand the format. The format is:

```json
{
  "locations": [
    {
      "id": 1,
      "location": "name"
    }
  ],
  "alarms": [
    {
      "location": location_id,
      "outcome": boolean,
      "timestamp": "ISO8601 timestamp"
    }
  ]
}
```

## Task 1

Using the data provided, create an API that allows access to the data. The endpoint should:

- Return a JSON response with the data
- Allow pagination for paging through large amounts of data
- Allow filtering based on time range, and/or processing result
- Allow requests only from authenticated users
- Store a log of requests in a suitable format

## Task 2

Write a web application which allows the user to fetch the data based on a time range, and/or processing result. If you
completed the API in task 1, then you should use this as your data source. The application should:

- Provide a list of events returned, including:
  - The date/time of the event
  - The outcome of the event
  - The location of the event
- Allow the user to view data about individual entries in detail

Ideally there should be a graphical representation of the count of events over time, and the outcome of events, however
time may not permit for this.
