<?php

/**
 * @file
 * Post update functions for farm_regen_digital.module.
 */

/**
 * Install farm_farmlab module.
 */
function farm_regen_digital_post_update_enable_farm_farmlab(&$sandbox = NULL) {
  if (!\Drupal::service('module_handler')->moduleExists('farm_farmlab')) {
    \Drupal::service('module_installer')->install(['farm_farmlab']);
  }
}

/**
 * Install farm_import_kml module.
 */
function farm_regen_digital_post_update_enable_farm_import_kml(&$sandbox = NULL) {
  if (!\Drupal::service('module_handler')->moduleExists('farm_import_kml')) {
    \Drupal::service('module_installer')->install(['farm_import_kml']);
  }
}

/**
 * Install farm_regen_digital_map module.
 */
function farm_regen_digital_post_update_enable_farm_regen_digital_map(&$sandbox = NULL) {
  if (!\Drupal::service('module_handler')->moduleExists('farm_regen_digital_map')) {
    \Drupal::service('module_installer')->install(['farm_regen_digital_map']);
  }
}
