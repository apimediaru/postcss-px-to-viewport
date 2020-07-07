# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.2.2](https://github.com/apimediaru/postcss-px-to-viewport/compare/v1.2.1...v1.2.2) (2020-07-07)

### [1.2.1](https://github.com/apimediaru/postcss-px-to-viewport/compare/v1.2.0...v1.2.1) (2020-07-07)

## [1.2.0](https://github.com/apimediaru/postcss-px-to-viewport/compare/v1.1.1...v1.2.0) (2020-07-07)


### Features

* add include option ([3964904](https://github.com/apimediaru/postcss-px-to-viewport/commit/39649046b8c26398f3ff5590d091a0a00539c826))

## [1.1.1] - 2019-07-08

### Fixed
- Fixed `rule.source === undefined` from `postcss-modules-values`.

## [1.1.0] - 2019-02-05

### Added
- `landscape` (Boolean) Adds `@media (orientation: landscape)` with values converted via `landscapeWidth`.
- `landscapeUnit` (String) Expected unit for `landscape` option
- `landscapeWidth` (Number) Viewport width for landscape orientation.

### Fixed
- `mediaQuery` option if `true` does not mutate its value now, but the rule inside it instead.

## [1.0.0] - 2019-01-28

### Added
- `replace` option - (Boolean) replaces rules containing `vw` instead of adding fallbacks.
- `propList` option - (Array) The properties that can change from `px` to `vw`.
- `exclude` option - (Array or Regexp) Ignore some files like `node_modules`.

### Changed
- zero values now remain unitless.
- replace regexp is now case sensitive, so if you want to change `px`, then `pX` values won't be changed.
