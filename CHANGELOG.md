 # Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.1.0 - 2024-03-17

### Added
* ([shared](./packages/shared/)) Support passing an AbortSignal to a request ([#59](https://github.com/haoliangyu/ogcapi-js/pull/59))

## 1.0.0 - 2023-11-07

### Added
* ([processes](./packages/processes/)) Initial release ([#51](https://github.com/haoliangyu/ogcapi-js/pull/51))

### Changed
* **breaking** ([features](./packages/features/)) Change service class name from `Service` to `FeatureService` ([#51](https://github.com/haoliangyu/ogcapi-js/pull/51))

## 0.5.0 - 2023-09-23

### Added
* ([features](./packages/features/)) Support requirement class `Search`` from OGC API - Features Part 5 proposal ([#49](https://github.com/haoliangyu/ogcapi-js/pull/49))

### Fixed

### Changed
* ([shared](./packages/shared/)) `request` method now accpets an object to support more request options ([#49](https://github.com/haoliangyu/ogcapi-js/pull/49))

## 0.4.1 - 2022-11-28

### Fixed
* ([features](./packages/features/)) `crs` query parameter was incorrectly set to be required ([#36](https://github.com/haoliangyu/ogcapi-js/pull/36))

## 0.4.0 - 2022-03-10

### Added
* ([features](./packages/features/)) Support to get `Queryables` resource ([#25](https://github.com/haoliangyu/ogcapi-js/pull/25))

### Fixed
* ([features](./packages/features/)) `crs` query parameter was not passed to `getFeatures` request options ([#23](https://github.com/haoliangyu/ogcapi-js/pull/23))

## 0.3.0 - 2021-12-14

### Added
* ([features](./packages/features/)) Support to the `properties` query parameter ([#16](https://github.com/haoliangyu/ogcapi-js/pull/16))
* ([features](./packages/features/)) Support to the `sortby` query parameter ([#17](https://github.com/haoliangyu/ogcapi-js/pull/17))
* ([features](./packages/features/)) Support to the `filter` query parameters ([#18](https://github.com/haoliangyu/ogcapi-js/pull/18))

## 0.2.3 - 2021-03-17

### Fixed
* ([features](./packages/features/)) Double encoding for request parameters ([#14](https://github.com/haoliangyu/ogcapi-js/pull/14))

## 0.2.2 - 2021-03-12

### Changed
* ([features](./packages/features/)) Allow to use a relative URL to create Features Service ([#13](https://github.com/haoliangyu/ogcapi-js/pull/13))

## 0.2.1 - 2021-02-08

### Added
* ([features](./packages/features/)) Support to OGCAPI Features API draft 2 ([#11](https://github.com/haoliangyu/ogcapi-js/pull/11))

## 0.1.2 - 2020-01-17

* Initial release
