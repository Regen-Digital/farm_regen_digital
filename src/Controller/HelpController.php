<?php

namespace Drupal\farm_regen_digital\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Link;

/**
 * Provides a help page for farm_regen_digital.
 */
class HelpController extends ControllerBase {

  /**
   * Regen digital help page.
   *
   * @return array
   *   Render array.
   */
  public function helpPage() {
    $output = [];

    // Render links to relevant help topics.
    $loocc_link = Link::createFromRoute('LOOC-C', 'help.page', ['name' => 'farm_loocc']);
    $output['topics'] = [
      '#theme' => 'help_section',
      '#title' => $this->t('Help topics'),
      '#description' => $this->t('Select a topic'),
      '#links' => [$loocc_link],
    ];

    return $output;
  }

}
