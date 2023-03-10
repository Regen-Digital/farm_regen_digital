<?php

namespace Drupal\farm_regen_digital_map\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Threatened species action plan form.
 */
class ThreatenedSpecies extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'protected_species_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    // Render a flex wrapper.
    $form['wrapper'] = [
      '#type' => 'container',
      '#attributes' => [
        'style' => 'display: flex; justify-content: center;',
      ],
    ];

    // Filters in a details element.
    $filter = [
      '#type' => 'details',
      '#title' => $this->t('Filters'),
      '#open' => TRUE,
      '#attributes' => [
        'style' => 'flex-basis: 300px; margin: 0 1em;',
      ],
    ];

    // Select widget for species options.
    $filter['category'] = [
      '#type' => 'select',
      '#title' => $this->t('Species'),
      '#options' => [
        'bird' => $this->t('Birds'),
        'mammal' => $this->t('Mammals'),
        'fish' => $this->t('Fish'),
        'frog' => $this->t('Frogs'),
        'reptile' => $this->t('Reptiles'),
        'invertebrate' => $this->t('Invertebrates'),
        'plant' => $this->t('Plants'),
      ],
      '#default_value' => 'bird',
    ];

    // The species count output.
    $filter['count'] = [
      '#type' => 'container',
      '#attributes' => [
        'id' => 'species-count-wrapper',
      ],
    ];

    // The map.
    $form['wrapper']['map'] = [
      '#type' => 'farm_map',
      '#attributes' => [
        'style' => 'flex-grow: 2; height: 600px;',
      ],
    ];
    $form['wrapper']['filter'] = $filter;
    $form['#attached']['library'][] = 'farm_regen_digital_map/threatened_species';
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
  }

}
