# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Include FarmLab v1.0.0-beta1 [#6](https://github.com/paul121/farm_regen_digital/issues/6)
- Add farm_import_kml dependency [#4](https://github.com/paul121/farm_regen_digital/issues/4)

## 1.0.3 2022-05-29

### Added

- Provide farmier.mail config to override welcome email template.

## 1.0.2 2022-04-22

### Added

- Simple profile settings page.

### Changed

- Depend on farm_loocc 1.0.1

## 1.0.1 2022-04-19

**An update hook is not provided with this release.**
**Profile field changes must be applied manually.**

### Added

- Help page [#1](https://github.com/paul121/farm_regen_digital/issues/1)
- RFM logo [#2](https://github.com/paul121/farm_regen_digital/issues/2)

### Changed

- Depend on farmOS 2.0.0-beta4
- Make profile fields required: `nrm_region`, `readiness`
- Allow multiple values for `readiness`.

### Removed

- Delete `market_interest` field.

## 1.0.0 2022-04-03

The initial release of this module.
