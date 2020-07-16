# Trees Querying API

This API is built with Nest JS. It was bootstrapped using the Nest JS CLI.

There is a single endpoint which has a range of optional query params.


The API supports the following queries.

* Querying all tree items with totalTrees
[http://localhost:3000/trees](http://localhost:3000/trees)

* Querying within a date range
[http://localhost:3000/trees?startDate=2020-02-17T16:31:33.369Z&endDate=2020-06-19T09:05:39.511Z](http://localhost:3000/trees?startDate=2020-02-17T16:31:33.369Z&endDate=2020-06-19T09:05:39.511Z)

* Querying all normal trees
[http://localhost:3000/trees?varient=normal](http://localhost:3000/trees?varient=normal)

* Option to add total trees grouped by projectId to the response
[http://localhost:3000/trees?totalTreesGroupedBy=projectId](http://localhost:3000/trees?totalTreesGroupedBy=projectId)


Other queries

* Querying before an endDate
[http://localhost:3000/trees?endDate=2020-06-19T09:05:39.511Z](http://localhost:3000/trees?endDate=2020-06-19T09:05:39.511Z)

* Querying all referral trees
[http://localhost:3000/trees?varient=referral](http://localhost:3000/trees?varient=referral)

* Option to add total trees filter by startDate and grouped by varient to the response
[http://localhost:3000/trees?totalTreesGroupedBy=varient&startDate=2020-06-01T09:05:39.511Z](http://localhost:3000/trees?totalTreesGroupedBy=varient&startDate=2020-06-01T09:05:39.511Z)

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```


## TODO list

* Use a database to access the data instead of the fixed JSON file data.

* Some data formatting functions for the response in the trees controller. This should be moved to a data formatting module or moved down to the trees service.

* Remove use of `any` type in `getTotalTreesGroupedByKey` function

* Add unit tests for edge cases such as empty results

* Add integration tests for each query use case.

* Add more integration tests for request validation errors.

* Mock out the NestJS Logger in the integration tests. Add assertions that the Logger is called correctly.

* Add a docker-compose file to make the project easier to run.

* Update Node version in .nvmrc to LTS version.

* Support filtering by `productId`

* Support finding an individual tree planting entity. i.e `GET /trees/:id`
