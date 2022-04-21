<?php

namespace Drupal\farm_regen_digital\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Simple profile settings page.
 */
class ProfileController extends ControllerBase {

  /**
   * Displays list of enabled profiles.
   *
   * @return array
   *   Returns render array of profiles.
   */
  public function profiles() {
    $output = [];
    $profile_storage = $this->entityTypeManager()->getStorage('profile');

    // Load enabled profiles.
    $profile_ids = $profile_storage->getQuery()
      ->accessCheck(TRUE)
      ->condition('status', TRUE)
      ->sort('id')
      ->execute();
    $profiles = $profile_storage->loadMultiple($profile_ids);

    // Bail if there are no profiles.
    if (empty($profiles)) {
      return [
        '#markup' => $this->t('No profiles created.'),
      ];
    }

    // Display each profile.
    $profile_view_builder = $this->entityTypeManager()->getViewBuilder('profile');
    foreach ($profiles as $profile) {

      // Build details for each profile.
      $wrapper = $profile->id() . '_wrapper';
      $output[$wrapper] = [
        '#type' => 'details',
        '#title' => $profile->label(),
        '#open' => FALSE,
      ];

      // Include dropbutton in the description.
      $view_url = $profile->toUrl()->setAbsolute();
      $edit_url = $profile->toUrl('edit-form')->setAbsolute();
      $output[$wrapper]['#description'] = [
        '#type' => 'dropbutton',
        '#dropbutton_type' => 'small',
        '#links' => [
          'view' => [
            'title' => $this->t('View profile'),
            'url' => $view_url,
          ],
          'edit' => [
            'title' => $this->t('Edit profile'),
            'url' => $edit_url,
          ],
        ],
      ];

      // Include the rendered profile.
      $output[$wrapper][] = $profile_view_builder->view($profile);
    }

    return $output;
  }

}
