<?php

namespace Drupal\farm_regen_digital_document\Plugin\Asset\AssetType;

use Drupal\farm_entity\Plugin\Asset\AssetType\FarmAssetType;

/**
 * Provides the document asset type.
 *
 * @AssetType(
 *   id = "regen_digital_document",
 *   label = @Translation("Document"),
 * )
 */
class Document extends FarmAssetType {

  /**
   * {@inheritdoc}
   */
  public function buildFieldDefinitions() {
    $fields = parent::buildFieldDefinitions();
    $field_info = [
      'related_asset' => [
        'type' => 'entity_reference',
        'label' => $this->t('Related assets'),
        'description' => $this->t('What assets is this document about?'),
        'target_type' => 'asset',
        'multiple' => TRUE,
        'weight' => [
          'form' => -5,
          'view' => -5,
        ],
      ],
    ];
    foreach ($field_info as $name => $info) {
      $fields[$name] = $this->farmFieldFactory->bundleFieldDefinition($info);
    }
    return $fields;
  }

}
