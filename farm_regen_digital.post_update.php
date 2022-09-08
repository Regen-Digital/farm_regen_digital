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
