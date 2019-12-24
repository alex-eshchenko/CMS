<?php

namespace Drupal\entityqueue\Plugin\views\filter;

use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\entityqueue\Plugin\views\relationship\EntityQueueRelationship;
use Drupal\views\Plugin\views\filter\BooleanOperator;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Filter for entities that are available or not in an entity queue.
 *
 * @ingroup views_filter_handlers
 *
 * @ViewsFilter("entity_queue_in_queue")
 */
class EntityQueueInQueue extends BooleanOperator {

  /**
   * The current user.
   *
   * @var \Drupal\Core\Session\AccountInterface
   */
  protected $currentUser;

  /**
   * The messenger.
   *
   * @var \Drupal\Core\Messenger\MessengerInterface
   */
  protected $messenger;

  /**
   * Constructor.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param array $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Session\AccountInterface $current_user
   *   The current user.
   * @param \Drupal\Core\Messenger\MessengerInterface $messenger
   *   The messenger.
   */
  public function __construct(array $configuration, $plugin_id, array $plugin_definition, AccountInterface $current_user, MessengerInterface $messenger) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);

    $this->currentUser = $current_user;
    $this->messenger = $messenger;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('current_user'),
      $container->get('messenger')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function query() {
    $this->ensureMyTable();

    // Try to find an entity queue relationship in this view, and pick the first
    // one available.
    $entity_queue_relationship = NULL;
    foreach ($this->view->relationship as $id => $relationship) {
      if ($relationship instanceof EntityQueueRelationship) {
        $entity_queue_relationship = $relationship;
        $this->options['relationship'] = $id;
        $this->setRelationship();

        break;
      }
    }

    if ($entity_queue_relationship) {
      $subqueue_items_table_alias = $entity_queue_relationship->first_alias;
      $field_field = $this->definition['field field'];
      $operator  = $this->value ? 'IS NOT NULL' : 'IS NULL';
      $condition = "$subqueue_items_table_alias.$field_field $operator";

      $this->query->addWhereExpression($this->options['group'], $condition);
    }
    else {
      if ($this->currentUser->hasPermission('administer views')) {
        $this->messenger->addMessage($this->t('In order to filter on items from the queue, you need to add the Entityqueue: Queue relationship on View: @view with display: @display', [
          '@view' => $this->view->storage->label(),
          '@display' => $this->view->current_display
        ]), MessengerInterface::TYPE_ERROR);
      }
    }
  }

}
