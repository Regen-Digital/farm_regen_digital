<?php

namespace Drupal\farm_regen_digital\Routing;

use Drupal\Core\Routing\RouteSubscriberBase;
use Symfony\Component\Routing\RouteCollection;

/**
 * Add access requirement to data streams.
 */
class RouteSubscriber extends RouteSubscriberBase {

  /**
   * {@inheritdoc}
   */
  protected function alterRoutes(RouteCollection $collection) {

    // Deny access to farmOS modules form.
    if ($route = $collection->get('farm_settings.modules_form')) {
      $route->setRequirement('_access', 'FALSE');
    }
  }

}
