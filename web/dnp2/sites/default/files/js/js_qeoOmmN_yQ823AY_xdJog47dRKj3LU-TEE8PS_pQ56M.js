/**
 * @file
 * ckeditor sticky toolbar.
 */
(function ($, CKEDITOR) {

  'use strict';

  /**
   * Make ckeditor toolbar sticky.
   */
  Drupal.behaviors.ckeditorStickyToolbar = {
    attach: function (context) {
      // Apply on ckeditor init.
      CKEDITOR.once('instanceReady', function (event) {
        // Set initially.
        setPosition();
        // Add handler for maximize event.
        event.editor.on('maximize', setPosition);
        // Add handler for toolbar events.
        $(context).once('ckeditorStickyToolbar').on('drupalToolbarOrientationChange drupalToolbarTabChange drupalToolbarTrayChange', setPosition);
      });

      // Fix ckeditor sticky toolbar position.
      function setPosition() {
        var toolBar = $('.cke_top', context);
        toolBar.once('ckeditorStickyToolbarPosition').attr('style', toolBar.attr('style') + 'position: sticky; position: -webkit-sticky;');
        toolBar.css('top', $('body').css('padding-top'));
      }
    }
  };
})(jQuery, CKEDITOR);
;
/**
 * CKEditor plugin for split text feature for Paragraphs text fields.
 *
 * @file plugin.js
 */

(function ($, Drupal, drupalSettings, CKEDITOR) {

  'use strict';

  // Temporal object is used to preserve data over ajax requests.
  var tmpObject = {};

  /**
   * Register split text plugin for custom CKEditor.
   *
   * @param {object} editorSettings
   *   CKEditor settings object.
   */
  var registerPlugin = function (editorSettings) {
    // Split text toolbar and plugin should be registered only once.
    if (editorSettings.extraPlugins.indexOf('splittext') !== -1) {
      return;
    }

    // We want to have plugin enabled for all text editors.
    editorSettings.extraPlugins += ',splittext';

    // Split text option should be added as last one in toolbar and preserved
    // there after ajax requests are executed.
    var toolbar = editorSettings.toolbar;
    if (typeof editorSettings._splittextIndex === 'undefined') {
      editorSettings._splittextIndex = toolbar.length - 1;
      toolbar.push('/');
    }

    toolbar[editorSettings._splittextIndex] = {
      name: Drupal.t('Split text'),
      items: ['SplitText']
    };
  };

  /**
   * Register split text plugin for all CKEditors.
   *
   * @type {{attach: attach}}
   */
  Drupal.behaviors.setSplitTextPlugin = {
    attach: function () {
      if (!drupalSettings || !drupalSettings.editor || !drupalSettings.editor.formats) {
        return;
      }

      $.each(drupalSettings.editor.formats, function (editorId, editorInfo) {
        if (editorInfo.editor === 'ckeditor') {
          registerPlugin(editorInfo.editorSettings);
        }
      });
    }
  };

  /**
   * Create new paragraph with same type after one where editor is placed.
   *
   * -------------------------------------------------------------------------*
   * Important Note:
   * This could be provided in future as option where split text could work
   * without any add mode, not just modal.
   * -------------------------------------------------------------------------*
   *
   * @param {object} editor
   *   CKEditor object.
   */

  /*
  var createNewParagraphOverDuplicate = function (editor) {
    var actionButton = $('#' + editor.name).closest('.paragraphs-subform')
      .parent()
      .find('.paragraphs-actions input[name$="_duplicate"]');

    storeTempData(editor, actionButton.attr('name'));

    actionButton.trigger('mousedown');
  };
  */

  /**
   * Create new paragraph with same type after one where editor is placed.
   *
   * @param {object} editor
   *   CKEditor object.
   */
  var createNewParagraphOverModal = function (editor) {
    var $paragraphRow = $('#' + editor.name).closest('.paragraphs-subform').closest('tr');
    var paragraphType = $paragraphRow.find('[data-paragraphs-split-text-type]').attr('data-paragraphs-split-text-type');
    var $deltaField = $paragraphRow.closest('table').siblings().find('input.paragraph-type-add-modal-delta');

    // Stop splitting functionality if add button is disabled or not available.
    var $addButton = $deltaField.siblings('.paragraph-type-add-modal-button');
    if ($addButton.length === 0 || $addButton.is(':disabled')) {
      return;
    }

    // New paragraph is always added after existing one - all post ajax
    // functionality expects that.
    var insertionDelta = $paragraphRow.parent().find('> tr.draggable').index($paragraphRow) + 1;
    $deltaField.val(insertionDelta);

    var paragraphTypeButtonSelector = $deltaField.attr('data-drupal-selector').substr('edit-'.length).replace(/-add-more-add-modal-form-area-add-more-delta$/, '-' + paragraphType + '-add-more').replace(/_/g, '-');
    var $actionButton = $('[data-drupal-selector^="' + paragraphTypeButtonSelector + '"]');

    // Triggering element name is required for proper handling of ajax response.
    storeTempData(editor, $actionButton.attr('name'));

    $actionButton.trigger('mousedown');
  };

  /**
   * Store temporal data required after ajax request is finished.
   *
   * @param {object} editor
   *   CKEditor object.
   * @param {string} triggerElementName
   *   Name of trigger element, required for ajax response handling.
   */
  var storeTempData = function (editor, triggerElementName) {
    var $editorObject = $('#' + editor.name);
    var selection = editor.getSelection();
    var ranges = selection.getRanges();

    // Last node that should be selected to cut content should be text type.
    var lastNode = ranges[0].document.getBody().getLast();
    ranges[0].setEndAfter(lastNode);

    // Set new selection and trigger cut for it.
    selection.selectRanges(ranges);

    // We "cut" text that will be "pasted" to new added paragraph.
    tmpObject.newContent = editor.extractSelectedHtml(true, true);
    editor.updateElement();
    editor.element.data('editor-value-is-changed', true);

    // Temporal container is used to preserve data over ajax requests.
    var $originalRow = $editorObject.closest('tr');
    tmpObject.originalRowIndex = $originalRow.parent().find('> tr.draggable').index($originalRow);
    tmpObject.originalRowParagraphId = $originalRow.closest('.field--widget-paragraphs').prop('id');
    tmpObject.originalEditorWrapperSelector = getEditorWrapperSelector(editor);

    // Triggering element is required for proper handling of ajax response.
    tmpObject.triggeringElementName = triggerElementName;

    tmpObject.split_trigger = true;
  };

  /**
   * Handler for ajax requests.
   *
   * It handles updating of editors are new paragraph is added.
   *
   * @param {object} e
   *   Event object.
   * @param {object} xhr
   *   XHR object.
   * @param {object} settings
   *   Request settings.
   */
  var onAjaxSplit = function (e, xhr, settings) {
    // Only relevant ajax actions should be handled.
    if (settings.extraData._triggering_element_name !== tmpObject.triggeringElementName || !tmpObject.split_trigger) {
      return;
    }

    var originalRow = $('#' + tmpObject.originalRowParagraphId)
      .find('table')
      .first()
      .find('> tbody > tr.draggable, > tr.draggable')[tmpObject.originalRowIndex];
    var $originalRow = $(originalRow);

    // Set "cut" data ot new paragraph.
    var $newRow = $originalRow.nextAll($originalRow.hasClass('odd') ? '.even' : '.odd').first();

    // Build regex for search.
    var fieldSelector = tmpObject.originalEditorWrapperSelector.replace(/-[0-9]+-/, '-[0-9]+-');
    var $newEditor = $('[data-drupal-selector]', $newRow).filter(function () {
      return $(this).data('drupal-selector').match(fieldSelector);
    }).find('textarea');
    updateEditor($newEditor.attr('id'), tmpObject.newContent);

    // Cleanup states.
    tmpObject.split_trigger = false;

    // Delta field has to be cleaned up for proper working of add button. It
    // will not make any impact on non modal add mode.
    $originalRow.closest('table').siblings().find('input.paragraph-type-add-modal-delta').val('');
  };

  /**
   * Helper function to update content of CKEditor.
   *
   * @param {string} editorId
   *   Editor ID.
   * @param {string} data
   *   HTML as text for CKEditor.
   */
  var updateEditor = function (editorId, data) {
    if (typeof editorId === 'undefined') {
      return;
    }

    CKEDITOR.instances[editorId].setData(data, {
      callback: function () {
        this.updateElement();
        this.element.data('editor-value-is-changed', true);
      }
    });
  };

  /**
   * Makes split of paragraph text on cursor position.
   *
   * @param {object} editor
   *   CKEditor object.
   */
  var splitTextHandler = function (editor) {
    // There should be only one split request at a time.
    if (tmpObject.split_trigger) {
      return;
    }

    // After ajax response correct values should be placed in text editors.
    $(document).once('ajax-paragraph').ajaxComplete(onAjaxSplit);

    createNewParagraphOverModal(editor);
  };

  /**
   * Get wrapper Drupal selector for CKEditor.
   *
   * @param {object} editor
   *   CKEditor object.
   *
   * @return {string}
   *   Returns CKEditor wrapper ID.
   */
  var getEditorWrapperSelector = function (editor) {
    return editor.element.getAttribute('data-drupal-selector').replace(/-[0-9]+-value$/, '-wrapper');
  };

  /**
   * Verify if field is direct field of paragraph with enabled split text.
   *
   * Solution is to check that text field wrapper id direct child of subform.
   * And additionally that Wrapper ID is in list of enabled widgets.
   *
   * @param {object} editor
   *   CKEditor object.
   *
   * @return {boolean}
   *   Returns if editor is for valid paragraphs text field.
   */
  var isValidParagraphsField = function (editor) {
    var wrapperSelector = getEditorWrapperSelector(editor);
    var $subForm = $('#' + editor.name).closest('.paragraphs-subform');

    // Paragraphs split text should work only on widgets where that option is enabled.
    var paragraphWrapperId = $subForm.closest('.paragraphs-tabs-wrapper').attr('id');
    if (!drupalSettings.paragraphs_features.split_text[paragraphWrapperId]) {
      return false;
    }

    return $subForm.find('> div[data-drupal-selector="' + wrapperSelector + '"]').length === 1;
  };

  /**
   * Register define new plugin.
   */
  CKEDITOR.plugins.add('splittext', {
    hidpi: true,
    requires: '',

    init: function (editor) {
      // Split text namespace.
      var modulePath = drupalSettings.paragraphs_features.split_text._path;

      // Split Text functionality should be added only for paragraphs Text fields.
      if (!isValidParagraphsField(editor)) {
        return;
      }

      editor.addCommand('splitText', {
        exec: function (editor) {
          splitTextHandler(editor, 'before');
        }
      });

      editor.ui.addButton('SplitText', {
        label: 'Split Text',
        icon: '/' + modulePath + '/js/plugins/splittext/icons/splittext.png',
        command: 'splitText'
      });

      if (editor.addMenuItems) {
        editor.addMenuGroup('splittext');
        editor.addMenuItems({
          splittext: {
            label: Drupal.t('Split Text'),
            command: 'splitText',
            icon: '/' + modulePath + '/js/plugins/splittext/icons/splittext.png',
            group: 'splittext',
            order: 1
          }
        });
      }

      if (editor.contextMenu) {
        editor.contextMenu.addListener(function () {
          return {
            splittext: CKEDITOR.TRISTATE_OFF
          };
        });
      }
    }
  });

}(jQuery, Drupal, drupalSettings, CKEDITOR));
;
(function ($, Drupal, drupalSettings) {

  'use strict';

  /**
   * Filter items in dialog by a given search string.
   *
   * @param object $dialog
   *   The dialog to filter items.
   * @param string search
   *   The string to search for.
   * @param bool search_description
   *   If <code>true</code> the items description will be searched also.
   */
  var filterItems = function ($dialog, search, search_description) {
    if ('' === search) {
      // Display all potentially hidden elements.
      $('.button-group', $dialog).removeClass('js-hide');
      $('.paragraphs-add-dialog-row', $dialog).removeClass('js-hide');
      return;
    }
    // Hide rows matching the input.
    $('.paragraphs-add-dialog-row', $dialog).each(function () {
      var $row = $(this);
      var input_found = $('.paragraphs-label', $row).html().toLowerCase().indexOf(search.toLowerCase()) !== -1;
      var description = $('.paragraphs-description', $row).html() || '';
      if (search_description) {
        input_found |= (description.toLowerCase().indexOf(search.toLowerCase()) !== -1);
      }
      if (input_found) {
        $row.removeClass('js-hide');
      }
      else {
        $row.addClass('js-hide');
      }
    });
    // Hide categories if no rows are visible.
    $('.button-group', $dialog).each(function () {
      var $group = $(this);
      if ($('.paragraphs-add-dialog-row.js-hide', $group).length === $('.paragraphs-add-dialog-row', $group).length) {
        $group.addClass('js-hide');
      }
      else {
        $group.removeClass('js-hide');
      }
    });
  };

  /**
   * Init display toggle for listing in paragraphs modal.
   */
  Drupal.behaviors.initParagraphsEEDialogDisplayToggle = {
    attach: function (context) {
      $('.paragraphs-add-dialog--categorized', context).each(function () {
        var $dialog = $(this);
        var $toggle = $('.display-toggle', $dialog);
        $toggle.once().on('click', function () {
          var $self = $(this);

          if ($self.hasClass('style-list')) {
            $dialog.addClass('paragraphs-style-list');
          }
          else {
            $dialog.removeClass('paragraphs-style-list');
          }
        });
      });
    }
  };

  /**
   * Init filter for paragraphs in paragraphs modal.
   */
  Drupal.behaviors.initParagraphsEEDialogFilter = {
    attach: function (context) {
      $('.paragraphs-add-dialog--categorized', context).each(function () {
        var $dialog = $(this);
        if ($('.paragraphs-add-dialog-row', $dialog).length < 3) {
          // We do not need to enable the filter for very few items.
          return;
        }

        var $filter_wrapper = $('.filter', $dialog);
        $filter_wrapper.removeClass('js-hide');

        var $filter = $('.item-filter', $filter_wrapper);
        $filter.once().on('input', function () {
          filterItems($dialog, $filter.val(), $search_description.is(':checked'));
        });
        var $search_description = $('.search-description :checkbox', $filter_wrapper);
        $search_description.once().on('change', function () {
          filterItems($dialog, $filter.val(), $search_description.is(':checked'));
        });
      });
    }
  };

}(jQuery, Drupal, drupalSettings));
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, window) {
  function TableResponsive(table) {
    this.table = table;
    this.$table = $(table);
    this.showText = Drupal.t('Show all columns');
    this.hideText = Drupal.t('Hide lower priority columns');

    this.$headers = this.$table.find('th');

    this.$link = $('<button type="button" class="link tableresponsive-toggle"></button>').attr('title', Drupal.t('Show table cells that were hidden to make the table fit within a small screen.')).on('click', $.proxy(this, 'eventhandlerToggleColumns'));

    this.$table.before($('<div class="tableresponsive-toggle-columns"></div>').append(this.$link));

    $(window).on('resize.tableresponsive', $.proxy(this, 'eventhandlerEvaluateColumnVisibility')).trigger('resize.tableresponsive');
  }

  Drupal.behaviors.tableResponsive = {
    attach: function attach(context, settings) {
      var $tables = $(context).find('table.responsive-enabled').once('tableresponsive');
      if ($tables.length) {
        var il = $tables.length;
        for (var i = 0; i < il; i++) {
          TableResponsive.tables.push(new TableResponsive($tables[i]));
        }
      }
    }
  };

  $.extend(TableResponsive, {
    tables: []
  });

  $.extend(TableResponsive.prototype, {
    eventhandlerEvaluateColumnVisibility: function eventhandlerEvaluateColumnVisibility(e) {
      var pegged = parseInt(this.$link.data('pegged'), 10);
      var hiddenLength = this.$headers.filter('.priority-medium:hidden, .priority-low:hidden').length;

      if (hiddenLength > 0) {
        this.$link.show().text(this.showText);
      }

      if (!pegged && hiddenLength === 0) {
        this.$link.hide().text(this.hideText);
      }
    },
    eventhandlerToggleColumns: function eventhandlerToggleColumns(e) {
      e.preventDefault();
      var self = this;
      var $hiddenHeaders = this.$headers.filter('.priority-medium:hidden, .priority-low:hidden');
      this.$revealedCells = this.$revealedCells || $();

      if ($hiddenHeaders.length > 0) {
        $hiddenHeaders.each(function (index, element) {
          var $header = $(this);
          var position = $header.prevAll('th').length;
          self.$table.find('tbody tr').each(function () {
            var $cells = $(this).find('td').eq(position);
            $cells.show();

            self.$revealedCells = $().add(self.$revealedCells).add($cells);
          });
          $header.show();

          self.$revealedCells = $().add(self.$revealedCells).add($header);
        });
        this.$link.text(this.hideText).data('pegged', 1);
      } else {
          this.$revealedCells.hide();

          this.$revealedCells.each(function (index, element) {
            var $cell = $(this);
            var properties = $cell.attr('style').split(';');
            var newProps = [];

            var match = /^display\s*:\s*none$/;
            for (var i = 0; i < properties.length; i++) {
              var prop = properties[i];
              prop.trim();

              var isDisplayNone = match.exec(prop);
              if (isDisplayNone) {
                continue;
              }
              newProps.push(prop);
            }

            $cell.attr('style', newProps.join(';'));
          });
          this.$link.text(this.showText).data('pegged', 0);

          $(window).trigger('resize.tableresponsive');
        }
    }
  });

  Drupal.TableResponsive = TableResponsive;
})(jQuery, Drupal, window);;
/**
 * @file entity_browser.common.js
 *
 * Common helper functions used by various parts of entity browser.
 */

(function ($, Drupal, drupalSettings) {

  'use strict';

  Drupal.entityBrowser = {};

  /**
   * Command to refresh an entity_browser_entity_reference field widget.
   *
   * @param {Drupal.Ajax} [ajax]
   *   The ajax object.
   * @param {object} response
   *   Object holding the server response.
   * @param {string} response.details_id
   *   The ID for the details element.
   * @param {number} [status]
   *   The HTTP status code.
   */
  Drupal.AjaxCommands.prototype.entity_browser_value_updated = function (ajax, response, status) {
    $('#' + response.details_id)
      .find('input[type="hidden"][name$="[target_id]"]')
      .trigger('entity_browser_value_updated');
  };

  /**
   * Reacts on "entities selected" event.
   *
   * @param {object} event
   *   Event object.
   * @param {string} uuid
   *   Entity browser UUID.
   * @param {array} entities
   *   Array of selected entities.
   */
  Drupal.entityBrowser.selectionCompleted = function (event, uuid, entities) {
    var selected_entities = $.map(entities, function (item) {
      return item[2] + ':' + item[0];
    });
    // @todo Use uuid here. But for this to work we need to move eb uuid
    // generation from display to eb directly. When we do this, we can change
    // \Drupal\entity_browser\Plugin\Field\FieldWidget\EntityReferenceBrowserWidget::formElement
    // also.
    // Checking if cardinality is set - assume unlimited.
    var cardinality = isNaN(parseInt(drupalSettings['entity_browser'][uuid]['cardinality'])) ? -1 : parseInt(drupalSettings['entity_browser'][uuid]['cardinality']);

    // Get field widget selection mode.
    var selection_mode = drupalSettings['entity_browser'][uuid]['selection_mode'];

    // Update value form element with new entity IDs.
    var selector = drupalSettings['entity_browser'][uuid]['selector'] ? $(drupalSettings['entity_browser'][uuid]['selector']) : $(this).parent().parent().find('input[type*=hidden]');
    var entity_ids = selector.val();
    var existing_entities = (entity_ids.length !== 0) ? entity_ids.split(' ') : [];

    entity_ids = Drupal.entityBrowser.updateEntityIds(
      existing_entities,
      selected_entities,
      selection_mode,
      cardinality
    );

    selector.val(entity_ids);
    selector.trigger('entity_browser_value_updated');
  };

  /**
   * Updates the list of selected entities.
   *
   * It uses existing selection and selected entities in entity browser. Also
   * considers cardinality and used selection mode.
   *
   * Note: Selection modes are defined in EntityBrowserElement class and same
   * options should be used here to determine what action will be performed.
   * Default action is append ('selection_append').
   *
   * @param {Array} existing_entities
   *   List of existing entity IDs.
   * @param {Array} selected_entities
   *   The entities that are selected and entity browser.
   * @param {string} selection_mode
   *   Selection mode defined by entity browser field widget.
   * @param {int} cardinality
   *   The maximal amount of items the field can store.
   *
   * @return {string}
   *   List of entities as a string, separated by space.
   */
  Drupal.entityBrowser.updateEntityIds = function (existing_entities, selected_entities, selection_mode, cardinality) {
    var combined_entities;

    if (selection_mode === 'selection_edit') {
      // Propagate new selected entities.
      combined_entities = selected_entities;
    }
    else if (selection_mode === 'selection_prepend') {
      // Prepend selected entities to existing list of entities.
      combined_entities = selected_entities.concat(existing_entities);
    }
    else {
      // Append selected entities to existing list of entities.
      combined_entities = existing_entities.concat(selected_entities);
    }

    // Having more elements than cardinality should never happen, because
    // server side authentication should prevent it, but we handle it here
    // anyway.
    if (cardinality > 0 && combined_entities.length > cardinality) {
      combined_entities = combined_entities.slice(0, cardinality);
    }

    return combined_entities.join(' ');
  };

  /**
   * Reacts on "entities selected" event.
   *
   * @param {object} element
   *   Element to bind on.
   * @param {array} callbacks
   *   List of callbacks.
   * @param {string} event_name
   *   Name of event to bind to.
   */
  Drupal.entityBrowser.registerJsCallbacks = function (element, callbacks, event_name) {
    // JS callbacks are registred as strings. We need to split their names and
    // find actual functions.
    for (var i = 0; i < callbacks.length; i++) {
      var callback = callbacks[i].split('.');
      var fn = window;

      for (var j = 0; j < callback.length; j++) {
        fn = fn[callback[j]];
      }

      if (typeof fn === 'function') {
        $(element).bind(event_name, fn);
      }
    }
  };

}(jQuery, Drupal, drupalSettings));
;
/**
 * @file entity_browser.entity_reference.js
 *
 * Defines the behavior of the entity reference widget that utilizes entity
 * browser.
 */

(function ($, Drupal) {

  'use strict';

  /**
   * Registers behaviours related to entity reference field widget.
   */
  Drupal.behaviors.entityBrowserEntityReference = {
    attach: function (context) {
      $(context).find('.field--widget-entity-browser-entity-reference').each(function () {
        $(this).find('.entities-list.sortable').sortable({
          stop: Drupal.entityBrowserEntityReference.entitiesReordered
        });
      });
      // The AJAX callback will give us a flag when we need to re-open the
      // browser, most likely due to a "Replace" button being clicked.
      if (typeof drupalSettings.entity_browser_reopen_browser !== 'undefined' &&  drupalSettings.entity_browser_reopen_browser) {
        var data_drupal_selector = '[data-drupal-selector^="edit-' + drupalSettings.entity_browser_reopen_browser.replace(/_/g, '-') + '-entity-browser-entity-browser-' + '"][data-uuid]';
        var $launch_browser_element = $(context).find(data_drupal_selector);
        if ($launch_browser_element.attr('data-uuid') in drupalSettings.entity_browser && !drupalSettings.entity_browser[$launch_browser_element.attr('data-uuid')].auto_open) {
          $launch_browser_element.click();
        }
        // In case this is inside a fieldset closed by default, open it so the
        // user doesn't need to guess the browser is open but hidden there.
        var $fieldset_summary = $launch_browser_element.closest('details').find('summary');
        if ($fieldset_summary.length && $fieldset_summary.attr('aria-expanded') === 'false') {
          $fieldset_summary.click();
        }
      }
    }
  };

  Drupal.entityBrowserEntityReference = {};

  /**
   * Reacts on sorting of the entities.
   *
   * @param {object} event
   *   Event object.
   * @param {object} ui
   *   Object with detailed information about the sort event.
   */
  Drupal.entityBrowserEntityReference.entitiesReordered = function (event, ui) {
    Drupal.entityBrowserEntityReference.updateTargetId($(this));
  };

  /**
   * Updates the 'target_id' element.
   *
   * @param {object} $currentItems
   *   Object with '.entities-list.sortable' element.
   */
  Drupal.entityBrowserEntityReference.updateTargetId = function ($currentItems) {
    var items = $currentItems.find('.item-container');
    var ids = [];
    for (var i = 0; i < items.length; i++) {
      ids[i] = $(items[i]).attr('data-entity-id');
      // If using weight field, update it.
      $(items[i]).find('input[name*="[_weight]"]').val(i);
    }
    var $target_id_element = $currentItems.parent().find('input[type*=hidden][name*="[target_id]"]');
    $target_id_element.val(ids.join(' '));

    // Trigger ajax submission to restore entity browser form element.
    var cardinality = parseInt($target_id_element.attr('data-cardinality'));
    if (ids.length < cardinality && $target_id_element.attr('data-entity-browser-visible') === "0") {
      $target_id_element.trigger('entity_browser_value_updated');
    }
  }

}(jQuery, Drupal));
;
/**
 * @file
 * Provides improved handling of sorting ui for entity browser.
 *
 * It solves problem for drag-drop sorting for heights with fractional pixels.
 */
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.sortableFractionalPixels = {
    attach: function (context) {
      $(context)
        .find('.field--widget-entity-browser-entity-reference .entities-list.sortable, [data-drupal-selector="edit-selected"].entities-list.sortable')
        .once('ui-sortable-with-fractional-pixels')
        .sortable({
          start: function (e, ui) {
            if (typeof getComputedStyle === 'undefined') {
              return;
            }

            var $siblings = ui.placeholder.siblings(':not(.ui-sortable-helper)');
            if ($siblings.length === 0) {
              return;
            }

            var computedHeight = getComputedStyle($siblings[0]).height;
            ui.placeholder.height(computedHeight);
          }
        });
    }
  };

})(jQuery, Drupal, drupalSettings);
;
/**
 * @file entity_browser.modal.js
 *
 * Defines the behavior of the entity browser's modal display.
 */

(function ($, Drupal, drupalSettings) {

  'use strict';

  Drupal.entityBrowserModal = {};

  Drupal.AjaxCommands.prototype.select_entities = function (ajax, response, status) {
    var uuid = drupalSettings.entity_browser.modal.uuid;

    $(':input[data-uuid="' + uuid + '"]').trigger('entities-selected', [uuid, response.entities])
      .removeClass('entity-browser-processed').unbind('entities-selected');
  };

  /**
   * Registers behaviours related to modal display.
   */
  Drupal.behaviors.entityBrowserModal = {
    attach: function (context) {
      _.each(drupalSettings.entity_browser.modal, function (instance) {
        _.each(instance.js_callbacks, function (callback) {
          // Get the callback.
          callback = callback.split('.');
          var fn = window;

          for (var j = 0; j < callback.length; j++) {
            fn = fn[callback[j]];
          }

          if (typeof fn === 'function') {
            $(':input[data-uuid="' + instance.uuid + '"]').not('.entity-browser-processed')
              .bind('entities-selected', fn).addClass('entity-browser-processed');
          }
        });
        if (instance.auto_open) {
          $('input[data-uuid="' + instance.uuid + '"]').click();
        }
      });
    }
  };

  /**
   * Registers behaviours related to modal open and windows resize for fluid modal.
   */
  Drupal.behaviors.fluidModal = {
    attach: function (context) {
      var $window = $(window);
      var $document = $(document);

      // Be sure to run only once per window document.
      if ($document.once('fluid-modal').length === 0) {
        return;
      }

      // Recalculate dialog size on window resize.
      $window.resize(function (event) {
        Drupal.entityBrowserModal.fluidDialog();
      });

      // Catch dialog if opened within a viewport smaller than the dialog width
      // and recalculate size of all open dialogs.
      $(document).on('dialogopen', '.ui-dialog', function (event, ui) {
        Drupal.entityBrowserModal.fluidDialog();
      });

      // Disable scrolling of the whole browser window to not interfere with the
      // iframe scrollbar.
      $window.on({
        'dialog:aftercreate': function (event, dialog, $element, settings) {
          $('body').css({overflow: 'hidden'});
        },
        'dialog:beforeclose': function (event, dialog, $element) {
          $('body').css({overflow: 'inherit'});
        }
      });
    }
  };

  /**
   * Recalculates size of the modal.
   */
  Drupal.entityBrowserModal.fluidDialog = function () {

    var $visible = $('.ui-dialog:visible');
    // For each open dialog.
    $visible.each(function () {
      var $this = $(this);
      var dialog = $this.find('.ui-dialog-content').data('ui-dialog');
      // If fluid option == true.
      if (dialog.options.fluid) {
        var wWidth = $(window).width();
        // Check window width against dialog width.
        if (dialog.options.maxWidth && (wWidth > parseInt(dialog.options.maxWidth) + 50)) {
          dialog.option('width', dialog.options.maxWidth);
        }
        else {
          // If no maxWidth is defined, make it responsive.
          dialog.option('width', '92%');
        }

        var vHeight = $(window).height();
        // Check window width against dialog width.
        if (dialog.options.maxHeight && vHeight > (parseInt(dialog.options.maxHeight) + 50)) {
          dialog.option('height', dialog.options.maxHeight);
        }
        else {
          // If no maxHeight is defined, make it responsive.
          dialog.option('height', .92 * vHeight);

          // Because there is no iframe height 100% in HTML 5, we have to set
          // the height of the iframe as well.
          var contentHeight = $this.find('.ui-dialog-content').height();
          $this.find('iframe').css('height', contentHeight);
        }

        // Reposition dialog.
        dialog.option('position', dialog.options.position);
      }
    });
  };

}(jQuery, Drupal, drupalSettings));
;
(function (Drupal, $) {
  'use strict';

  Drupal.behaviors.length_indicator = {
    attach: function (context, settings) {
      $(context)
        .find('[length-indicator-enabled]')
        .once('length-indicator')
        .each(function (index, element) {
          var $el = $(element);
          var total = $el.data('length-indicator-total');

          new Indicator($el, $el.closest('.form-wrapper'), total);
        });
    }
  };

  function Indicator($el, $context, total) {
    this.$el = $el;

    this.total = total;

    this.allIndicators = $context.find('.length-indicator__indicator');
    this.cursor = $context.find('.length-indicator__cursor');

    var self = this;
    this.$el.on('input', function (e) {
      self.setCursorAndActiveIndicator();
    });
    this.setCursorAndActiveIndicator();
  }

  Indicator.prototype.setCursorAndActiveIndicator = function () {
    var length = this.$el.val().length;
    var position = (length / this.total) * 100;

    var positionDir = 'left';
    if ($('html').attr('dir') === 'rtl') {
      positionDir = 'right';
    }

    position = position < 100 ? position : 100;
    this.cursor.css(positionDir, position + '%');

    this.allIndicators.removeClass('is-active');

    var coloredIndicator = this.allIndicators.eq(0);
    for (var i = 1; i < this.allIndicators.length; i++) {
      var indicator = this.allIndicators.eq(i);
      if (length >= indicator.data('pos')) {
        coloredIndicator = indicator;
      }
      else {
        break;
      }
    }
    coloredIndicator.addClass('is-active');
  };

})(Drupal, jQuery);
;
/**
 * @file
 * Responsive advanced sidebar tray.
 *
 * This also supports collapsible navigable is the 'is-collapsible' class is
 * added to the main element, and a target element is included.
 */
(function ($, Drupal) {

  'use strict';

  /**
   * Initialise the advanced sidebar tray JS.
   */
  Drupal.behaviors.advancedSidebarTray = {
    attach: function (context) {
      var $body = $(context).find('body.advanced-sidebar-tray');
      // Add a click handler to the button(s) that toggle the advanced sidebar
      // tray.
      var $toggleBtn = $body.find('[data-toggle-advanced-sidebar-tray]');
      if ($body.length && $toggleBtn.length) {
        $toggleBtn.unbind('click').on('click', function (e) {
          e.preventDefault();
          $body.toggleClass('advanced-sidebar-tray-toggled');
          // Close the vertical toolbar tab if the toolbar layout is vertical.
          var $activeToolbarItem = $('.toolbar-item.is-active');
          if ($body.hasClass('toolbar-vertical') && $activeToolbarItem.length) {
            $activeToolbarItem.click();
          }
          // Trigger resize event.
          $(window).trigger('resize.tabs');
        });
      }
    }
  };

})(jQuery, Drupal);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal, debounce) {
  var liveElement = void 0;
  var announcements = [];

  Drupal.behaviors.drupalAnnounce = {
    attach: function attach(context) {
      if (!liveElement) {
        liveElement = document.createElement('div');
        liveElement.id = 'drupal-live-announce';
        liveElement.className = 'visually-hidden';
        liveElement.setAttribute('aria-live', 'polite');
        liveElement.setAttribute('aria-busy', 'false');
        document.body.appendChild(liveElement);
      }
    }
  };

  function announce() {
    var text = [];
    var priority = 'polite';
    var announcement = void 0;

    var il = announcements.length;
    for (var i = 0; i < il; i++) {
      announcement = announcements.pop();
      text.unshift(announcement.text);

      if (announcement.priority === 'assertive') {
        priority = 'assertive';
      }
    }

    if (text.length) {
      liveElement.innerHTML = '';

      liveElement.setAttribute('aria-busy', 'true');

      liveElement.setAttribute('aria-live', priority);

      liveElement.innerHTML = text.join('\n');

      liveElement.setAttribute('aria-busy', 'false');
    }
  }

  Drupal.announce = function (text, priority) {
    announcements.push({
      text: text,
      priority: priority
    });

    return debounce(announce, 200)();
  };
})(Drupal, Drupal.debounce);;
window.matchMedia||(window.matchMedia=function(){"use strict";var e=window.styleMedia||window.media;if(!e){var t=document.createElement("style"),i=document.getElementsByTagName("script")[0],n=null;t.type="text/css";t.id="matchmediajs-test";i.parentNode.insertBefore(t,i);n="getComputedStyle"in window&&window.getComputedStyle(t,null)||t.currentStyle;e={matchMedium:function(e){var i="@media "+e+"{ #matchmediajs-test { width: 1px; } }";if(t.styleSheet){t.styleSheet.cssText=i}else{t.textContent=i}return n.width==="1px"}}}return function(t){return{matches:e.matchMedium(t||"all"),media:t||"all"}}}());
;
(function(){if(window.matchMedia&&window.matchMedia("all").addListener){return false}var e=window.matchMedia,i=e("only all").matches,n=false,t=0,a=[],r=function(i){clearTimeout(t);t=setTimeout(function(){for(var i=0,n=a.length;i<n;i++){var t=a[i].mql,r=a[i].listeners||[],o=e(t.media).matches;if(o!==t.matches){t.matches=o;for(var s=0,l=r.length;s<l;s++){r[s].call(window,t)}}}},30)};window.matchMedia=function(t){var o=e(t),s=[],l=0;o.addListener=function(e){if(!i){return}if(!n){n=true;window.addEventListener("resize",r,true)}if(l===0){l=a.push({mql:o,listeners:s})}s.push(e)};o.removeListener=function(e){for(var i=0,n=s.length;i<n;i++){if(s[i]===e){s.splice(i,1)}}};return o}})();
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  var activeItem = Drupal.url(drupalSettings.path.currentPath);

  $.fn.drupalToolbarMenu = function () {
    var ui = {
      handleOpen: Drupal.t('Extend'),
      handleClose: Drupal.t('Collapse')
    };

    function toggleList($item, switcher) {
      var $toggle = $item.children('.toolbar-box').children('.toolbar-handle');
      switcher = typeof switcher !== 'undefined' ? switcher : !$item.hasClass('open');

      $item.toggleClass('open', switcher);

      $toggle.toggleClass('open', switcher);

      $toggle.find('.action').text(switcher ? ui.handleClose : ui.handleOpen);
    }

    function toggleClickHandler(event) {
      var $toggle = $(event.target);
      var $item = $toggle.closest('li');

      toggleList($item);

      var $openItems = $item.siblings().filter('.open');
      toggleList($openItems, false);
    }

    function linkClickHandler(event) {
      if (!Drupal.toolbar.models.toolbarModel.get('isFixed')) {
        Drupal.toolbar.models.toolbarModel.set('activeTab', null);
      }

      event.stopPropagation();
    }

    function initItems($menu) {
      var options = {
        class: 'toolbar-icon toolbar-handle',
        action: ui.handleOpen,
        text: ''
      };

      $menu.find('li > a').wrap('<div class="toolbar-box">');

      $menu.find('li').each(function (index, element) {
        var $item = $(element);
        if ($item.children('ul.toolbar-menu').length) {
          var $box = $item.children('.toolbar-box');
          options.text = Drupal.t('@label', {
            '@label': $box.find('a').text()
          });
          $item.children('.toolbar-box').append(Drupal.theme('toolbarMenuItemToggle', options));
        }
      });
    }

    function markListLevels($lists, level) {
      level = !level ? 1 : level;
      var $lis = $lists.children('li').addClass('level-' + level);
      $lists = $lis.children('ul');
      if ($lists.length) {
        markListLevels($lists, level + 1);
      }
    }

    function openActiveItem($menu) {
      var pathItem = $menu.find('a[href="' + window.location.pathname + '"]');
      if (pathItem.length && !activeItem) {
        activeItem = window.location.pathname;
      }
      if (activeItem) {
        var $activeItem = $menu.find('a[href="' + activeItem + '"]').addClass('menu-item--active');
        var $activeTrail = $activeItem.parentsUntil('.root', 'li').addClass('menu-item--active-trail');
        toggleList($activeTrail, true);
      }
    }

    return this.each(function (selector) {
      var $menu = $(this).once('toolbar-menu');
      if ($menu.length) {
        $menu.on('click.toolbar', '.toolbar-box', toggleClickHandler).on('click.toolbar', '.toolbar-box a', linkClickHandler);

        $menu.addClass('root');
        initItems($menu);
        markListLevels($menu);

        openActiveItem($menu);
      }
    });
  };

  Drupal.theme.toolbarMenuItemToggle = function (options) {
    return '<button class="' + options.class + '"><span class="action">' + options.action + '</span> <span class="label">' + options.text + '</span></button>';
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  var options = $.extend({
    breakpoints: {
      'toolbar.narrow': '',
      'toolbar.standard': '',
      'toolbar.wide': ''
    }
  }, drupalSettings.toolbar, {
    strings: {
      horizontal: Drupal.t('Horizontal orientation'),
      vertical: Drupal.t('Vertical orientation')
    }
  });

  Drupal.behaviors.toolbar = {
    attach: function attach(context) {
      if (!window.matchMedia('only screen').matches) {
        return;
      }

      $(context).find('#toolbar-administration').once('toolbar').each(function () {
        var model = new Drupal.toolbar.ToolbarModel({
          locked: JSON.parse(localStorage.getItem('Drupal.toolbar.trayVerticalLocked')),
          activeTab: document.getElementById(JSON.parse(localStorage.getItem('Drupal.toolbar.activeTabID'))),
          height: $('#toolbar-administration').outerHeight()
        });

        Drupal.toolbar.models.toolbarModel = model;

        Object.keys(options.breakpoints).forEach(function (label) {
          var mq = options.breakpoints[label];
          var mql = window.matchMedia(mq);
          Drupal.toolbar.mql[label] = mql;

          mql.addListener(Drupal.toolbar.mediaQueryChangeHandler.bind(null, model, label));

          Drupal.toolbar.mediaQueryChangeHandler.call(null, model, label, mql);
        });

        Drupal.toolbar.views.toolbarVisualView = new Drupal.toolbar.ToolbarVisualView({
          el: this,
          model: model,
          strings: options.strings
        });
        Drupal.toolbar.views.toolbarAuralView = new Drupal.toolbar.ToolbarAuralView({
          el: this,
          model: model,
          strings: options.strings
        });
        Drupal.toolbar.views.bodyVisualView = new Drupal.toolbar.BodyVisualView({
          el: this,
          model: model
        });

        model.trigger('change:isFixed', model, model.get('isFixed'));
        model.trigger('change:activeTray', model, model.get('activeTray'));

        var menuModel = new Drupal.toolbar.MenuModel();
        Drupal.toolbar.models.menuModel = menuModel;
        Drupal.toolbar.views.menuVisualView = new Drupal.toolbar.MenuVisualView({
          el: $(this).find('.toolbar-menu-administration').get(0),
          model: menuModel,
          strings: options.strings
        });

        Drupal.toolbar.setSubtrees.done(function (subtrees) {
          menuModel.set('subtrees', subtrees);
          var theme = drupalSettings.ajaxPageState.theme;
          localStorage.setItem('Drupal.toolbar.subtrees.' + theme, JSON.stringify(subtrees));

          model.set('areSubtreesLoaded', true);
        });

        Drupal.toolbar.views.toolbarVisualView.loadSubtrees();

        $(document).on('drupalViewportOffsetChange.toolbar', function (event, offsets) {
          model.set('offsets', offsets);
        });

        model.on('change:orientation', function (model, orientation) {
          $(document).trigger('drupalToolbarOrientationChange', orientation);
        }).on('change:activeTab', function (model, tab) {
          $(document).trigger('drupalToolbarTabChange', tab);
        }).on('change:activeTray', function (model, tray) {
          $(document).trigger('drupalToolbarTrayChange', tray);
        });

        if (Drupal.toolbar.models.toolbarModel.get('orientation') === 'horizontal' && Drupal.toolbar.models.toolbarModel.get('activeTab') === null) {
          Drupal.toolbar.models.toolbarModel.set({
            activeTab: $('.toolbar-bar .toolbar-tab:not(.home-toolbar-tab) a').get(0)
          });
        }

        $(window).on({
          'dialog:aftercreate': function dialogAftercreate(event, dialog, $element, settings) {
            var $toolbar = $('#toolbar-bar');
            $toolbar.css('margin-top', '0');

            if (settings.drupalOffCanvasPosition === 'top') {
              var height = Drupal.offCanvas.getContainer($element).outerHeight();
              $toolbar.css('margin-top', height + 'px');

              $element.on('dialogContentResize.off-canvas', function () {
                var newHeight = Drupal.offCanvas.getContainer($element).outerHeight();
                $toolbar.css('margin-top', newHeight + 'px');
              });
            }
          },
          'dialog:beforeclose': function dialogBeforeclose() {
            $('#toolbar-bar').css('margin-top', '0');
          }
        });
      });
    }
  };

  Drupal.toolbar = {
    views: {},

    models: {},

    mql: {},

    setSubtrees: new $.Deferred(),

    mediaQueryChangeHandler: function mediaQueryChangeHandler(model, label, mql) {
      switch (label) {
        case 'toolbar.narrow':
          model.set({
            isOriented: mql.matches,
            isTrayToggleVisible: false
          });

          if (!mql.matches || !model.get('orientation')) {
            model.set({ orientation: 'vertical' }, { validate: true });
          }
          break;

        case 'toolbar.standard':
          model.set({
            isFixed: mql.matches
          });
          break;

        case 'toolbar.wide':
          model.set({
            orientation: mql.matches && !model.get('locked') ? 'horizontal' : 'vertical'
          }, { validate: true });

          model.set({
            isTrayToggleVisible: mql.matches
          });
          break;

        default:
          break;
      }
    }
  };

  Drupal.theme.toolbarOrientationToggle = function () {
    return '<div class="toolbar-toggle-orientation"><div class="toolbar-lining">' + '<button class="toolbar-icon" type="button"></button>' + '</div></div>';
  };

  Drupal.AjaxCommands.prototype.setToolbarSubtrees = function (ajax, response, status) {
    Drupal.toolbar.setSubtrees.resolve(response.subtrees);
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Backbone, Drupal) {
  Drupal.toolbar.MenuModel = Backbone.Model.extend({
    defaults: {
      subtrees: {}
    }
  });
})(Backbone, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Backbone, Drupal) {
  Drupal.toolbar.ToolbarModel = Backbone.Model.extend({
    defaults: {
      activeTab: null,

      activeTray: null,

      isOriented: false,

      isFixed: false,

      areSubtreesLoaded: false,

      isViewportOverflowConstrained: false,

      orientation: 'horizontal',

      locked: false,

      isTrayToggleVisible: true,

      height: null,

      offsets: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },

    validate: function validate(attributes, options) {
      if (attributes.orientation === 'horizontal' && this.get('locked') && !options.override) {
        return Drupal.t('The toolbar cannot be set to a horizontal orientation when it is locked.');
      }
    }
  });
})(Backbone, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, Backbone) {
  Drupal.toolbar.BodyVisualView = Backbone.View.extend({
    initialize: function initialize() {
      this.listenTo(this.model, 'change:activeTray ', this.render);
      this.listenTo(this.model, 'change:isFixed change:isViewportOverflowConstrained', this.isToolbarFixed);
    },
    isToolbarFixed: function isToolbarFixed() {
      var isViewportOverflowConstrained = this.model.get('isViewportOverflowConstrained');
      $('body').toggleClass('toolbar-fixed', isViewportOverflowConstrained || this.model.get('isFixed'));
    },
    render: function render() {
      $('body').toggleClass('toolbar-tray-open', !!this.model.get('activeTray'));
    }
  });
})(jQuery, Drupal, Backbone);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Backbone, Drupal) {
  Drupal.toolbar.MenuVisualView = Backbone.View.extend({
    initialize: function initialize() {
      this.listenTo(this.model, 'change:subtrees', this.render);
    },
    render: function render() {
      var _this = this;

      var subtrees = this.model.get('subtrees');

      Object.keys(subtrees || {}).forEach(function (id) {
        _this.$el.find('#toolbar-link-' + id).once('toolbar-subtrees').after(subtrees[id]);
      });

      if ('drupalToolbarMenu' in $.fn) {
        this.$el.children('.toolbar-menu').drupalToolbarMenu();
      }
    }
  });
})(jQuery, Backbone, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Backbone, Drupal) {
  Drupal.toolbar.ToolbarAuralView = Backbone.View.extend({
    initialize: function initialize(options) {
      this.strings = options.strings;

      this.listenTo(this.model, 'change:orientation', this.onOrientationChange);
      this.listenTo(this.model, 'change:activeTray', this.onActiveTrayChange);
    },
    onOrientationChange: function onOrientationChange(model, orientation) {
      Drupal.announce(Drupal.t('Tray orientation changed to @orientation.', {
        '@orientation': orientation
      }));
    },
    onActiveTrayChange: function onActiveTrayChange(model, tray) {
      var relevantTray = tray === null ? model.previous('activeTray') : tray;

      if (!relevantTray) {
        return;
      }
      var action = tray === null ? Drupal.t('closed') : Drupal.t('opened');
      var trayNameElement = relevantTray.querySelector('.toolbar-tray-name');
      var text = void 0;
      if (trayNameElement !== null) {
        text = Drupal.t('Tray "@tray" @action.', {
          '@tray': trayNameElement.textContent,
          '@action': action
        });
      } else {
        text = Drupal.t('Tray @action.', { '@action': action });
      }
      Drupal.announce(text);
    }
  });
})(Backbone, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings, Backbone) {
  Drupal.toolbar.ToolbarVisualView = Backbone.View.extend({
    events: function events() {
      var touchEndToClick = function touchEndToClick(event) {
        event.preventDefault();
        event.target.click();
      };

      return {
        'click .toolbar-bar .toolbar-tab .trigger': 'onTabClick',
        'click .toolbar-toggle-orientation button': 'onOrientationToggleClick',
        'touchend .toolbar-bar .toolbar-tab .trigger': touchEndToClick,
        'touchend .toolbar-toggle-orientation button': touchEndToClick
      };
    },
    initialize: function initialize(options) {
      this.strings = options.strings;

      this.listenTo(this.model, 'change:activeTab change:orientation change:isOriented change:isTrayToggleVisible', this.render);
      this.listenTo(this.model, 'change:mqMatches', this.onMediaQueryChange);
      this.listenTo(this.model, 'change:offsets', this.adjustPlacement);
      this.listenTo(this.model, 'change:activeTab change:orientation change:isOriented', this.updateToolbarHeight);

      this.$el.find('.toolbar-tray .toolbar-lining').append(Drupal.theme('toolbarOrientationToggle'));

      this.model.trigger('change:activeTab');
    },
    updateToolbarHeight: function updateToolbarHeight() {
      var toolbarTabOuterHeight = $('#toolbar-bar').find('.toolbar-tab').outerHeight() || 0;
      var toolbarTrayHorizontalOuterHeight = $('.is-active.toolbar-tray-horizontal').outerHeight() || 0;
      this.model.set('height', toolbarTabOuterHeight + toolbarTrayHorizontalOuterHeight);

      $('body').css({
        'padding-top': this.model.get('height')
      });

      this.triggerDisplace();
    },
    triggerDisplace: function triggerDisplace() {
      _.defer(function () {
        Drupal.displace(true);
      });
    },
    render: function render() {
      this.updateTabs();
      this.updateTrayOrientation();
      this.updateBarAttributes();

      $('body').removeClass('toolbar-loading');

      if (this.model.changed.orientation === 'vertical' || this.model.changed.activeTab) {
        this.loadSubtrees();
      }

      return this;
    },
    onTabClick: function onTabClick(event) {
      if (event.currentTarget.hasAttribute('data-toolbar-tray')) {
        var activeTab = this.model.get('activeTab');
        var clickedTab = event.currentTarget;

        this.model.set('activeTab', !activeTab || clickedTab !== activeTab ? clickedTab : null);

        event.preventDefault();
        event.stopPropagation();
      }
    },
    onOrientationToggleClick: function onOrientationToggleClick(event) {
      var orientation = this.model.get('orientation');

      var antiOrientation = orientation === 'vertical' ? 'horizontal' : 'vertical';
      var locked = antiOrientation === 'vertical';

      if (locked) {
        localStorage.setItem('Drupal.toolbar.trayVerticalLocked', 'true');
      } else {
        localStorage.removeItem('Drupal.toolbar.trayVerticalLocked');
      }

      this.model.set({
        locked: locked,
        orientation: antiOrientation
      }, {
        validate: true,
        override: true
      });

      event.preventDefault();
      event.stopPropagation();
    },
    updateTabs: function updateTabs() {
      var $tab = $(this.model.get('activeTab'));

      $(this.model.previous('activeTab')).removeClass('is-active').prop('aria-pressed', false);

      $(this.model.previous('activeTray')).removeClass('is-active');

      if ($tab.length > 0) {
        $tab.addClass('is-active').prop('aria-pressed', true);
        var name = $tab.attr('data-toolbar-tray');

        var id = $tab.get(0).id;
        if (id) {
          localStorage.setItem('Drupal.toolbar.activeTabID', JSON.stringify(id));
        }

        var $tray = this.$el.find('[data-toolbar-tray="' + name + '"].toolbar-tray');
        if ($tray.length) {
          $tray.addClass('is-active');
          this.model.set('activeTray', $tray.get(0));
        } else {
          this.model.set('activeTray', null);
        }
      } else {
        this.model.set('activeTray', null);
        localStorage.removeItem('Drupal.toolbar.activeTabID');
      }
    },
    updateBarAttributes: function updateBarAttributes() {
      var isOriented = this.model.get('isOriented');
      if (isOriented) {
        this.$el.find('.toolbar-bar').attr('data-offset-top', '');
      } else {
        this.$el.find('.toolbar-bar').removeAttr('data-offset-top');
      }

      this.$el.toggleClass('toolbar-oriented', isOriented);
    },
    updateTrayOrientation: function updateTrayOrientation() {
      var orientation = this.model.get('orientation');

      var antiOrientation = orientation === 'vertical' ? 'horizontal' : 'vertical';

      $('body').toggleClass('toolbar-vertical', orientation === 'vertical').toggleClass('toolbar-horizontal', orientation === 'horizontal');

      var removeClass = antiOrientation === 'horizontal' ? 'toolbar-tray-horizontal' : 'toolbar-tray-vertical';
      var $trays = this.$el.find('.toolbar-tray').removeClass(removeClass).addClass('toolbar-tray-' + orientation);

      var iconClass = 'toolbar-icon-toggle-' + orientation;
      var iconAntiClass = 'toolbar-icon-toggle-' + antiOrientation;
      var $orientationToggle = this.$el.find('.toolbar-toggle-orientation').toggle(this.model.get('isTrayToggleVisible'));
      $orientationToggle.find('button').val(antiOrientation).attr('title', this.strings[antiOrientation]).text(this.strings[antiOrientation]).removeClass(iconClass).addClass(iconAntiClass);

      var dir = document.documentElement.dir;
      var edge = dir === 'rtl' ? 'right' : 'left';

      $trays.removeAttr('data-offset-left data-offset-right data-offset-top');

      $trays.filter('.toolbar-tray-vertical.is-active').attr('data-offset-' + edge, '');

      $trays.filter('.toolbar-tray-horizontal.is-active').attr('data-offset-top', '');
    },
    adjustPlacement: function adjustPlacement() {
      var $trays = this.$el.find('.toolbar-tray');
      if (!this.model.get('isOriented')) {
        $trays.removeClass('toolbar-tray-horizontal').addClass('toolbar-tray-vertical');
      }
    },
    loadSubtrees: function loadSubtrees() {
      var $activeTab = $(this.model.get('activeTab'));
      var orientation = this.model.get('orientation');

      if (!this.model.get('areSubtreesLoaded') && typeof $activeTab.data('drupal-subtrees') !== 'undefined' && orientation === 'vertical') {
        var subtreesHash = drupalSettings.toolbar.subtreesHash;
        var theme = drupalSettings.ajaxPageState.theme;
        var endpoint = Drupal.url('toolbar/subtrees/' + subtreesHash);
        var cachedSubtreesHash = localStorage.getItem('Drupal.toolbar.subtreesHash.' + theme);
        var cachedSubtrees = JSON.parse(localStorage.getItem('Drupal.toolbar.subtrees.' + theme));
        var isVertical = this.model.get('orientation') === 'vertical';

        if (isVertical && subtreesHash === cachedSubtreesHash && cachedSubtrees) {
          Drupal.toolbar.setSubtrees.resolve(cachedSubtrees);
        } else if (isVertical) {
            localStorage.removeItem('Drupal.toolbar.subtreesHash.' + theme);
            localStorage.removeItem('Drupal.toolbar.subtrees.' + theme);

            Drupal.ajax({ url: endpoint }).execute();

            localStorage.setItem('Drupal.toolbar.subtreesHash.' + theme, subtreesHash);
          }
      }
    }
  });
})(jQuery, Drupal, drupalSettings, Backbone);;
/**
 * @file
 * Provides a component that previews the page in various device dimensions.
 */

(function ($, Backbone, Drupal, drupalSettings, undefined) {

  "use strict";

  var strings = {
    close: Drupal.t('Close'),
    orientation: Drupal.t('Change orientation'),
    portrait: Drupal.t('Portrait'),
    landscape: Drupal.t('Landscape')
  };

  var options = $.extend({
    gutter: 60,
    // The width of the device border around the iframe. This value is critical
    // to determine the size and placement of the preview iframe container,
    // therefore it must be defined here instead of in the CSS file.
    bleed: 30
  }, drupalSettings.responsivePreview);

  /**
   * Attaches behaviors to the toolbar tab and preview containers.
   */
  Drupal.behaviors.responsivePreview = {
    attach: function (context) {
      // jQuery.once() returns a jQuery set. It will be empty if no unprocessed
      // elements are found. window and window.parent are equivalent unless the
      // Drupal page is itself wrapped in an iframe.
      var $body = $(window.parent.document.body).once('responsive-preview');

      if ($body.length) {
        // If this window is itself in an iframe it must be marked as processed.
        // Its parent window will have been processed above.
        // When attach() is called again for the preview iframe, it will check
        // its parent window and find it has been processed. In most cases, the
        // following code will have no effect.
        $(window.document.body).once('responsive-preview');

        var envModel = Drupal.responsivePreview.models.envModel = new Drupal.responsivePreview.EnvironmentModel({
          dir: document.documentElement.getAttribute('dir')
        });
        var tabModel = Drupal.responsivePreview.models.tabModel = new Drupal.responsivePreview.TabStateModel();
        var previewModel = Drupal.responsivePreview.models.previewModel = new Drupal.responsivePreview.PreviewStateModel();

        // Manages the PreviewView.
        Drupal.responsivePreview.views.appView = new Drupal.responsivePreview.AppView({
          // The previewView model.
          model: previewModel,
          envModel: envModel,
          // Gutter size around preview frame.
          gutter: options.gutter,
          // Preview device frame width.
          bleed: options.bleed,
          strings: strings
        });

        // The toolbar tab view.
        var $tab = $('#responsive-preview-toolbar-tab').once('responsive-preview');
        if ($tab.length > 0) {
          Drupal.responsivePreview.views.tabView = new Drupal.responsivePreview.TabView({
            el: $tab.get(),
            model: previewModel,
            tabModel: tabModel,
            envModel: envModel,
            // Gutter size around preview frame.
            gutter: options.gutter,
            // Preview device frame width.
            bleed: options.bleed
          });
        }
        // The control block view.
        var $block = $('#block-responsivepreviewcontrols').once('responsive-preview');
        if ($block.length > 0) {
          Drupal.responsivePreview.views.blockView = new Drupal.responsivePreview.BlockView({
            el: $block.get(),
            model: previewModel,
            envModel: envModel,
            // Gutter size around preview frame.
            gutter: options.gutter,
            // Preview device frame width.
            bleed: options.bleed
          });
        }

        // Keyboard controls view.
        Drupal.responsivePreview.views.keyboardView = new Drupal.responsivePreview.KeyboardView({
          el: $block.get(),
          model: previewModel
        });

        /**
         * Sets the viewport width and height dimensions on the envModel.
         */
        var setViewportDimensions = function () {
          envModel.set({
            'viewportWidth': document.documentElement.clientWidth,
            'viewportHeight': document.documentElement.clientHeight
          });
        };

        $(window)
        // Update the viewport width whenever it is resized, but max 4 times/s.
          .on('resize.responsivepreview', Drupal.debounce(setViewportDimensions, 250));

        $(document)
        // Respond to viewport offsetting elements like the Toolbar.
          .on('drupalViewportOffsetChange.responsivepreview', function (event, offsets) {
            envModel.set('offsets', offsets);
          })
          .on('keyup.responsivepreview', function (event) {
            // Close the preview if the Esc key is pressed.
            if (event.keyCode === 27) {
              previewModel.set('isActive', false);
            }
          })
          // Close the preview if the overlay is opened.
          .on('drupalOverlayOpen.responsivepreview', function () {
            previewModel.set('isActive', false);
          });

        // Allow other scripts to respond to responsive preview mode changes.
        previewModel.listenTo(previewModel, 'change:isActive', function (model, isActive) {
          tabModel.set('isActive', isActive);
          $(document).trigger((isActive) ? 'drupalResponsivePreviewStarted' : 'drupalResponsivePreviewStopped');
        });

        // Initialization: set the current viewport width.
        setViewportDimensions();
      }
      // The main window is equivalent to window.parent and window.self. Inside,
      // an iframe, these objects are not equivalent. If the parent window is
      // itself in an iframe, check that the parent window has been processed.
      // If it has been, this invocation of attach() is being called on the
      // preview iframe, not its parent.
      if (window.parent !== window.self) {
        // Test for empty object (seems to happen occasionally).
        if(!window.self.hasOwnProperty('document')) {
          return;
        }

        var $frameBody = $(window.self.document.body);
        if ($frameBody.length > 0) {
          $frameBody.addClass('responsive-preview-frame');
          // Call Drupal.displace in the next process frame to relayout the page
          // in the iframe. This will ensure that no gaps in the presentation
          // exist from elements that are hidden, such as the toolbar.
          var win = window;
          window.setTimeout(function () {
            win.Drupal.displace();
          }, 0);
        }
      }
    },
    detach: function (context, settings, trigger) {
      /**
       * Loops through object properties; applies a callback function.
       */
      function looper(obj, iterator) {
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            iterator.call(null, prop, obj[prop]);
          }
        }
      }

      var app = Drupal.responsivePreview.views.appView || null;
      // Detach only if the app view is unloading.
      if (app && context === app && trigger === 'unload') {
        // Remove listeners on the window and document.
        $(window).add(document).off('.responsivepreview');
        // Remove and delete the view references.
        looper(Drupal.responsivePreview.views, function (label, view) {
          view.remove();
          Drupal.responsivePreview.views[label] = undefined;
        });
        // Reset models, remove listeners and delete the model references.
        looper(Drupal.responsivePreview.models, function (label, model) {
          model.set(model.defaults);
          model.stopListening();
          Drupal.responsivePreview.models[label] = undefined;
        });
      }
    }
  };

  Drupal.responsivePreview = Drupal.responsivePreview || {

      // Storage for view instances.
      views: {},

      // Storage for model instances.
      models: {},

      /**
       * Backbone Model for the environment in which the Responsive Preview operates.
       */
      EnvironmentModel: Backbone.Model.extend({
        defaults: {
          // The viewport width, within which the preview will have to fit.
          viewportWidth: null,
          // The viewport height, within which the preview will have to fit.
          viewportHeight: null,
          // Text direction of the document, affects some positioning.
          dir: 'ltr',
          // Viewport offset values.
          offsets: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      }),

      /**
       * Backbone Model for the Responsive Preview toolbar tab state.
       */
      TabStateModel: Backbone.Model.extend({
        defaults: {
          // The state of toolbar list of available device previews.
          isDeviceListOpen: false
        }
      }),

      /**
       * Backbone Model for the Responsive Preview preview state.
       */
      PreviewStateModel: Backbone.Model.extend({
        defaults: {
          // The state of the preview.
          isActive: false,
          // Indicates whether the preview iframe has been built.
          isBuilt: false,
          // Indicates whether the device is portrait (false) or landscape (true).
          isRotated: false,
          // Indicates of the device details are visible in the preview frame.
          isDetailsExpanded: false,
          // The number of devices that fit the current viewport (i.e. previewable).
          fittingDeviceCount: 0,
          // Currently selected device link.
          activeDevice: null,
          // Dimensions of the currently selected device to preview.
          dimensions: {
            // The width of the device to preview.
            width: null,
            // The height of the device to preview.
            height: null,
            // The dots per pixel of the device to preview.
            dppx: null
          }
        },

        /**
         * {@inheritdoc}
         */
        initialize: function () {
          this.listenTo(this, 'change:isActive', this.reset);
        },

        /**
         * Puts the model back into a ready state where no device is active.
         *
         * @param Backbone.Model model
         *   This model.
         * @param Boolean isActive
         *   Whether the responsive preview is currently active.
         */
        reset: function (model, isActive) {
          // Reset the model when it is deactivated.
          if (!isActive) {
            // Process this model change after any views have had the chance to
            // react to the change of isActive.
            var that = this;
            window.setTimeout(function () {
              that.set({
                isRotated: false,
                activeDevice: null,
                dimensions: {
                  width: null,
                  height: null,
                  dppx: null
                }
              }, {silent: true});
            }, 0);
          }
        }
      }),

      /**
       * Manages the PreviewView.
       */
      AppView: Backbone.View.extend({

        /**
         * {@inheritdoc}
         */
        initialize: function (options) {
          this.envModel = options.envModel;
          this.gutter = options.gutter;
          this.bleed = options.bleed;
          this.strings = options.strings;
          // Listen to changes on the previewModel.
          this.listenTo(this.model, 'change:isActive', this.render);
        },

        /**
         * {@inheritdoc}
         */
        render: function (previewModel, isActive, options) {
          // The preview container view.
          if (isActive && !Drupal.responsivePreview.views.previewView) {
            // Holds the Backbone View of the preview. This view is created and destroyed
            // when the preview is enabled or disabled respectively.
            Drupal.responsivePreview.views.previewView = new Drupal.responsivePreview.PreviewView({
              el: Drupal.theme('responsivePreviewContainer'),
              // The previewView model.
              model: this.model,
              envModel: this.envModel,
              // Gutter size around preview frame.
              gutter: this.gutter,
              // Preview device frame width.
              bleed: this.bleed,
              strings: this.strings
            });
            // Remove the inlined opacity style so that the CSS opacity transition
            // will fade in the preview view.
            window.setTimeout(function () {
              Drupal.responsivePreview.views.previewView.el.style.opacity = null;
            }, 0);
          }
          else if (!isActive && Drupal.responsivePreview.views.previewView) {
            // The transitionEnd event is still heavily vendor-prefixed.
            var transitionEnd = "transitionEnd.responsivepreview webkitTransitionEnd.responsivepreview transitionend.responsivepreview msTransitionEnd.responsivepreview oTransitionEnd.responsivepreview";
            // When the fade transition is complete, remove the view.
            Drupal.responsivePreview.views.previewView.$el.on(transitionEnd, function (event) {
              Drupal.responsivePreview.views.previewView.remove();
              delete Drupal.responsivePreview.views.previewView;
            });
            // Fade out the preview.
            Drupal.responsivePreview.views.previewView.el.style.opacity = 0;
          }
        }
      }),

      /**
       * Handles responsive preview toolbar tab interactions.
       */
      TabView: Backbone.View.extend({

        events: {
          'click .responsive-preview-trigger': 'toggleDeviceList',
          'mouseleave': 'toggleDeviceList'
        },

        /**
         * {@inheritdoc}
         */
        initialize: function (options) {
          this.gutter = options.gutter;
          this.bleed = options.bleed;
          this.tabModel = options.tabModel;
          this.envModel = options.envModel;
          var handler;

          // Curry the 'this' object in order to pass it as an argument to the
          // selectDevice function.
          handler = selectDevice.bind(null, this);
          this.$el.on('click.responsivepreview', '.responsive-preview-device', handler);

          handler = openPreview.bind(null, this);
          this.$el.on('open-preview', '.responsive-preview-device', handler);

          this.listenTo(this.model, 'change:activeDevice', this.render);
          this.listenTo(this.model, 'change:isActive', this.render);
          this.listenTo(this.tabModel, 'change:isDeviceListOpen', this.render);

          // Curry the 'this' object in order to pass it as an argument to the
          // updateDeviceList function.
          handler = updateDeviceList.bind(null, this);
          this.listenTo(this.envModel, 'change:viewportWidth', handler);

          this.listenTo(this.envModel, 'change:viewportWidth', this.correctDeviceListEdgeCollision);
        },

        /**
         * {@inheritdoc}
         */
        render: function () {
          var name = this.model.get('activeDevice');
          var isActive = this.model.get('isActive');
          var isDeviceListOpen = this.tabModel.get('isDeviceListOpen');
          this.$el
          // Render the visibility of the toolbar tab.
            .toggle(this.model.get('fittingDeviceCount') > 0)
            // Toggle the display of the device list.
            .toggleClass('open', isDeviceListOpen);

          // Render the state of the toolbar tab button.
          this.$el
            .find('> button')
            .toggleClass('active', isActive)
            .attr('aria-pressed', isActive);

          // Clean the active class from the device list.
          this.$el
            .find('.responsive-preview-device.active')
            .removeClass('active');

          this.$el
            .find('[data-responsive-preview-name="' + name + '"]')
            .toggleClass('active', isActive);
          // When the preview is active, a class on the body is necessary to impose
          // styling to aid in the display of the preview element.
          $('body').toggleClass('responsive-preview-active', isActive);
          // The list of devices might render outside the window.
          if (isDeviceListOpen) {
            this.correctDeviceListEdgeCollision();
          }
          return this;
        },

        /**
         * Toggles the list of devices available to preview from the toolbar tab.
         *
         * @param jQuery.Event event
         */
        toggleDeviceList: function (event) {
          // Force the options list closed on mouseleave.
          if (event.type === 'mouseleave') {
            this.tabModel.set('isDeviceListOpen', false);
          }
          else {
            this.tabModel.set('isDeviceListOpen', !this.tabModel.get('isDeviceListOpen'));
          }

          event.preventDefault();
          event.stopPropagation();
        },

        /**
         * Model change handler; corrects possible device list window edge collision.
         */
        correctDeviceListEdgeCollision: function () {
          // The position of the dropdown depends on the language direction.
          var dir = this.envModel.get('dir');
          var edge = (dir === 'rtl') ? 'left' : 'right';
          this.$el
            .find('.responsive-preview-item-list')
            .position({
              'my': edge + ' top',
              'at': edge + ' bottom',
              'of': this.$el,
              'collision': 'flip fit'
            });
        }
      }),

      /**
       * Handles responsive preview control block interactions.
       */
      BlockView: Backbone.View.extend({

        /**
         * {@inheritdoc}
         */
        initialize: function (options) {
          this.gutter = options.gutter;
          this.bleed = options.bleed;
          this.envModel = options.envModel;
          var handler;

          // Curry the 'this' object in order to pass it as an argument to the
          // selectDevice function.
          handler = selectDevice.bind(null, this);
          this.$el.on('click.responsivepreview', '.responsive-preview-device', handler);

          handler = openPreview.bind(null, this);
          this.$el.on('open-preview', '.responsive-preview-device', handler);

          this.listenTo(this.model, 'change:activeDevice', this.render);

          // Curry the 'this' object in order to pass it as an argument to the
          // updateDeviceList function.
          handler = updateDeviceList.bind(null, this);
          this.listenTo(this.envModel, 'change:viewportWidth', handler);
        },

        /**
         * {@inheritdoc}
         */
        render: function () {
          var name = this.model.get('activeDevice');
          var isActive = this.model.get('isActive');
          this.$el
          // Render the visibility of the toolbar block.
            .toggle(this.model.get('fittingDeviceCount') > 0)
            .find('.responsive-preview-device.active')
            .removeClass('active');

          this.$el
            .find('[data-responsive-preview-name="' + name + '"]')
            .addClass('active');
          // When the preview is active, a class on the body is necessary to impose
          // styling to aid in the display of the preview element.
          $('body').toggleClass('responsive-preview-active', isActive);
          return this;
        }
      }),

      /**
       * Handles keyboard input.
       */
      KeyboardView: Backbone.View.extend({

        /*
         * {@inheritdoc}
         */
        initialize: function () {
          $(document).on('keyup.responsivepreview', _.bind(this.onKeypress, this));
        },

        /**
         * Responds to esc key press events.
         *
         * @param jQuery.Event event
         */
        onKeypress: function (event) {
          if (event.keyCode === 27) {
            this.model.set('isActive', false);
          }
        },

        /**
         * Removes a listener on the document; calls the standard Backbone remove.
         */
        remove: function () {
          // Unbind the keyup listener.
          $(document).off('keyup.responsivepreview');
          // Call the standard remove method on this.
          Backbone.View.prototype.remove.call(this);
        }
      }),

      /**
       * Handles the responsive preview element interactions.
       */
      PreviewView: Backbone.View.extend({

        events: {
          'click #responsive-preview-close': 'shutdown',
          'click #responsive-preview-modal-background': 'shutdown',
          'click #responsive-preview-scroll-pane': 'shutdown',
          'click #responsive-preview-orientation': 'rotate',
          'click #responsive-preview-frame-label': 'revealDetails'
        },

        /**
         * {@inheritdoc}
         */
        initialize: function (options) {
          this.gutter = options.gutter;
          this.bleed = options.bleed;
          this.strings = options.strings;
          this.envModel = options.envModel;

          this.listenTo(this.model, 'change:isRotated change:activeDevice', this.render);

          // Recalculate the size of the preview container when the window resizes.
          this.listenTo(this.envModel, 'change:viewportWidth change:viewportHeight change:offsets', this.render);

          // Build the preview.
          this._build();

          // Call an initial render.
          this.render();
        },

        /**
         * {@inheritdoc}
         */
        render: function () {
          // Refresh the preview.
          this._refresh();
          Drupal.displace();

          // Render the state of the preview.
          var that = this;
          // Wrap the call in a setTimeout so that it invokes in the next compute
          // cycle, causing the CSS animations to render in the first pass.
          window.setTimeout(function () {
            that.$el.toggleClass('active', that.model.get('isActive'));
          }, 0);

          var $container = this.$el.find('#responsive-preview-frame-container');
          var $frame = $container.find('#responsive-preview-frame');
          $frame.get(0).contentWindow.location = Drupal.url(drupalSettings.responsive_preview.url);

          return this;
        },

        /**
         * Closes the preview.
         *
         * @param jQuery.Event event
         */
        shutdown: function (event) {
          this.model.set('isActive', false);
        },

        /**
         * Removes a listener on the document; calls the standard Backbone remove.
         */
        remove: function () {
          // Unbind transition listeners.
          this.$el.off('.responsivepreview');
          // Call the standard remove method on this.
          Backbone.View.prototype.remove.call(this);
        },

        /**
         * Responds to rotation button presses.
         *
         * @param jQuery.Event event
         */
        rotate: function (event) {
          this.model.set('isRotated', !this.model.get('isRotated'));
          event.stopPropagation();
        },

        /**
         * Responds to clicks on the device frame label.
         *
         * @param jQuery.Event event
         */
        revealDetails: function (event) {
          this.model.set('isDetailsExpanded', !this.model.get('isDetailsExpanded'));
          event.stopPropagation();
        },

        /**
         * Builds the preview iframe.
         */
        _build: function () {
          var offsets = this.envModel.get('offsets');
          var $frameContainer = $(Drupal.theme('responsivePreviewFrameContainer', this.strings))
          // The padding around the frame must be known in order to position it
          // correctly, so the style property is defined in JavaScript rather than
          // CSS.
            .css('padding', this.bleed);
          // Attach the iframe that will hold the preview.
          var $frame = $(Drupal.theme('responsivePreviewFrame'))
          // Load the current page URI into the preview iframe.
            .on('load.responsivepreview', this._refresh.bind(this))
            // Add the frame to the preview container.
            .appendTo($frameContainer);
          // Wrap the frame container in a pair of divs that will allow for
          // scrolling.
          $frameContainer = $frameContainer.wrap(Drupal.theme('responsivePreviewScrollContainer'))
            .closest('#responsive-preview-scroll-track');
          // Apply padding to the scroll pane.
          $frameContainer.find('#responsive-preview-scroll-pane')
            .css({
              'padding-bottom': this.bleed,
              'padding-top': this.bleed
            });
          // Insert the container into the DOM.
          this.$el
            .css({
              'top': offsets.top,
              'right': offsets.right,
              'left': offsets.left
            })
            // Apend the frame container.
            .append($frameContainer)
            // Append the container to the body to initialize the iframe document.
            .appendTo('body');
          // Load the path into the iframe.
          $frame.get(0).contentWindow.location = Drupal.url(drupalSettings.path.currentPath);
          // Mark the preview element processed.
          this.model.set('isBuilt', true);
        },

        /**
         * Refreshes the preview based on the current state (device & viewport width).
         */
        _refresh: function () {
          var isRotated = this.model.get('isRotated');
          var $deviceLink = $('[data-responsive-preview-name="' + this.model.get('activeDevice') + '"]').eq(0);
          var $container = this.$el.find('#responsive-preview-frame-container');
          var $frame = $container.find('#responsive-preview-frame');
          var $scrollPane = this.$el.find('#responsive-preview-scroll-pane');
          var offsets = this.envModel.get('offsets');

          // Get the static state.
          var edge = (this.envModel.get('dir') === 'rtl') ? 'right' : 'left';
          var minGutter = this.gutter;

          // Get current (dynamic) state.
          var dimensions = this.model.get('dimensions');
          var viewportWidth = this.envModel.get('viewportWidth') - (offsets.left + offsets.right);

          // Calculate preview width & height. If the preview is rotated, swap width
          // and height.
          var displayWidth = dimensions[(isRotated) ? 'height' : 'width'];
          var displayHeight = dimensions[(isRotated) ? 'width' : 'height'];
          var width = displayWidth / dimensions.dppx;
          var height = displayHeight / dimensions.dppx;

          // Get the container padding and border width for both dimensions.
          var bleed = this.bleed;
          var widthSpread = width + (bleed * 2);

          // Calculate how much space is required to the right and left of the
          // preview container in order to center it.
          var gutterPercent = (1 - (widthSpread / viewportWidth)) / 2;
          var gutter = gutterPercent * viewportWidth;
          gutter = (gutter < minGutter) ? minGutter : gutter;

          // The device dimension size plus gutters must fit within the viewport
          // area for that dimension. The spread is how much room the preview
          // needs for that dimension.
          width = Math.ceil((viewportWidth - (gutter * 2) < widthSpread) ? viewportWidth - (gutter * 2) - (bleed * 2) : width);

          // Updated the state of the rotated icon.
          this.$el.find('.responsive-preview-control.responsive-preview-orientation').toggleClass('rotated', isRotated);

          // Reposition the preview root.
          this.$el.css({
            top: offsets.top,
            right: offsets.right,
            left: offsets.left,
            height: document.documentElement.clientHeight - (offsets.top + offsets.bottom)
          });

          // Position the frame.
          var position = {};
          // Position depends on text direction.
          position[edge] = (gutter > minGutter) ? gutter : minGutter;
          $frame
            .css({
              width: width,
              height: height
            });

          // Position the frame container.
          $container.css(position);

          // Resize the scroll pane.
          var paneHeight = height + (this.bleed * 2);
          // If the height of the pane that contains the preview frame is higher
          // than the available viewport area, then make it scroll.
          if ((paneHeight + $container.position().top) > (document.documentElement.clientHeight - offsets.top - offsets.bottom)) {
            $scrollPane
              .css({
                height: paneHeight
              })
              // Select the parent container that constrains the overflow.
              .parent()
              .css({
                overflow: 'scroll'
              });
          }
          // If the height of the viewport area is sufficient to display the preview
          // frame, remove the scroll styling.
          else {
            $scrollPane.css({
              height: 'auto'
            })
            // Select the parent container that constrains the overflow.
              .parent()
              .css({
                overflow: 'visible'
              });
          }

          // Scale if not responsive.
          this._scaleIfNotResponsive();

          // Update the text in the device label.
          var $label = $container.find('.responsive-preview-device-label');
          $label
            .find('.responsive-preview-device-label-text')
            .text(Drupal.t('@label', {
              '@label': $deviceLink.text()
            }));

          // The device details are appended to the device label node in a separate
          // node so that their presentation can be varied independent of the label.
          $label
            .find('.responsive-preview-device-label-details')
            .text(Drupal.t('@displayWidth@width by @displayHeight, @dpi, @orientation', {
              '@displayWidth': displayWidth + 'px',
              // If the width of the preview element is not equivalent to the
              // configured display width, display the actual width of the preview
              // in parentheses.
              '@width': (displayWidth !== Math.floor(width * dimensions.dppx)) ? ' (' + (Math.floor(width * dimensions.dppx)) + 'px)' : '',
              '@displayHeight': displayHeight + 'px',
              '@dpi': dimensions.dppx + 'ppx',
              '@orientation': (isRotated) ? this.strings.landscape : this.strings.portrait
            }));

          // Expose the details if the user has expanded the label.
          var isDetailsExpanded = this.model.get('isDetailsExpanded');
          $label
            .toggleClass('responsive-preview-expanded', isDetailsExpanded)
            .find('.responsive-preview-device-label-details')
            .toggleClass('visually-hidden', !isDetailsExpanded);
        },

        /**
         * Applies scaling in order to better approximate content display on a device.
         */
        _scaleIfNotResponsive: function () {
          var scalingCSS = this._calculateScalingCSS();
          if (scalingCSS === false) {
            return;
          }

          // Step 0: find DOM nodes we'll need to modify.
          var $frame = this.$el.find('#responsive-preview-frame');
          var doc = $frame[0].contentDocument || ($frame[0].contentWindow && $frame[0].contentWindow.document);
          // No document has been loaded into the iframe yet.
          if (!doc) {
            return;
          }
          var $html = $(doc).find('html');

          // Step 1: When scaling (as we're about to do), the background (color and
          // image) doesn't scale along. Fortunately, we can fix things in case of
          // background color.
          // @todo: figure out a work-around for background images, or somehow
          // document this explicitly.
          function isTransparent(color) {
            // TRICKY: edge case for Firefox' "transparent" here; this is a
            // browser bug: https://bugzilla.mozilla.org/show_bug.cgi?id=635724
            return (color === 'rgba(0, 0, 0, 0)' || color === 'transparent');
          }

          var htmlBgColor = $html.css('background-color');
          var bodyBgColor = $html.find('body').css('background-color');
          if (!isTransparent(htmlBgColor) || !isTransparent(bodyBgColor)) {
            var bgColor = isTransparent(htmlBgColor) ? bodyBgColor : htmlBgColor;
            $frame.css('background-color', bgColor);
          }

          // Step 2: apply scaling.
          $html.css(scalingCSS);
        },

        /**
         * Calculates scaling based on device dimensions and <meta name="viewport" />.
         *
         * Websites that don't indicate via <meta name="viewport" /> that their width
         * is identical to the device width will be rendered at a larger size: at the
         * layout viewport's default width. This width exceeds the visual viewport on
         * the device, and causes it to scale it down.
         *
         * This function checks whether the underlying web page is responsive, and if
         * it's not, then it will calculate a CSS scaling transformation, to closely
         * approximate how an actual mobile device would render the web page.
         *
         * We assume all mobile devices' layout viewport's default width is 980px. It
         * is the value used on all iOS and Android >=4.0 devices.
         *
         * Related reading:
         *  - http://www.quirksmode.org/mobile/viewports.html
         *  - http://www.quirksmode.org/mobile/viewports2.html
         *  - https://developer.apple.com/library/safari/#documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html
         *  - http://tripleodeon.com/2011/12/first-understand-your-screen/
         *  - http://tripleodeon.com/wp-content/uploads/2011/12/table.html?r=android40window.innerw&c=980
         */
        _calculateScalingCSS: function () {
          var isRotated = this.model.get('isRotated');
          var settings = this._parseViewportMetaTag();
          var defaultLayoutWidth = 980, initialScale = 1;
          var layoutViewportWidth, layoutViewportHeight;
          var visualViewPortWidth; // The visual viewport width === the preview width.

          if (settings.width) {
            if (settings.width === 'device-width') {
              // Don't scale if the page is marked to be as wide as the device.
              return false;
            }
            else {
              layoutViewportWidth = parseInt(settings.width, 10);
            }
          }
          else {
            layoutViewportWidth = defaultLayoutWidth;
          }

          if (settings.height && settings.height !== 'device-height') {
            layoutViewportHeight = parseInt(settings.height, 10);
          }

          if (settings['initial-scale']) {
            initialScale = parseFloat(settings['initial-scale'], 10);
            if (initialScale < 1) {
              layoutViewportWidth = defaultLayoutWidth;
            }
          }

          // Calculate the scale, prevent excesses (ensure the (0.25, 1) range).
          var dimensions = this.model.get('dimensions');
          // If the preview is rotated, width and height are swapped.
          visualViewPortWidth = dimensions[(isRotated) ? 'height' : 'width'] / dimensions.dppx;
          var scale = initialScale * (100 / layoutViewportWidth) * (visualViewPortWidth / 100);
          scale = Math.min(scale, 1);
          scale = Math.max(scale, 0.25);

          var transform = "scale(" + scale + ")";
          var xOrigin = (this.envModel.get('dir') === 'rtl') ? layoutViewportWidth : '0';
          var origin = xOrigin + "px 0px";
          return {
            'min-width': layoutViewportWidth + 'px',
            'min-height': layoutViewportHeight + 'px',
            '-webkit-transform': transform,
            '-ms-transform': transform,
            'transform': transform,
            '-webkit-transform-origin': origin,
            '-ms-transform-origin': origin,
            'transform-origin': origin
          };
        },

        /**
         * Parses <meta name="viewport" /> tag's "content" attribute, if any.
         *
         * Parses something like this:
         *   <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, user-scalable=yes">
         * into this:
         *   {
     *     width: 'device-width',
     *     initial-scale: '1',
     *     maximum-scale: '5',
     *     minimum-scale: '1',
     *     user-scalable: 'yes'
     *   }
         *
         * @return Object
         *   Parsed viewport settings, or {}.
         */
        _parseViewportMetaTag: function () {
          var settings = {};
          var $viewportMeta = $(document).find('meta[name=viewport][content]');
          if ($viewportMeta.length > 0) {
            $viewportMeta
              .attr('content')
              // Reduce multiple parts of whitespace to a single space.
              .replace(/\s+/g, '')
              // Split on comma (which separates the different settings).
              .split(',')
              .map(function (setting) {
                setting = setting.split('=');
                settings[setting[0]] = setting[1];
              });
          }
          return settings;
        }
      })
    };

  /**
   * Functions that are common to both the TabView and BlockView.
   */

  /**
   * Model change handler; hides devices that don't fit the current viewport.
   *
   * @param Backbone.View view
   *   The View curried to this handler. This function is used in multiple Views,
   *   so we bind it as an argument to the handler function in order to avoid
   *   having to reference it through a 'this' object which will trigger 'Possible
   *   strict violation' warning messages in JSHint.
   */
  function updateDeviceList(view) {
    var gutter = view.gutter;
    var bleed = view.bleed;
    var viewportWidth = view.envModel.get('viewportWidth');
    var $devices = view.$el.find('.responsive-preview-device');
    var fittingDeviceCount = $devices.length;

    // Remove devices whose previews won't fit the current viewport.
    $devices.each(function (index, element) {
      var $this = $(this);
      var width = parseInt($this.data('responsive-preview-width'), 10);
      var dppx = parseFloat($this.data('responsive-preview-dppx'), 10);
      var previewWidth = width / dppx;
      var fits = ((previewWidth + (gutter * 2) + (bleed * 2)) <= viewportWidth);
      if (!fits) {
        fittingDeviceCount--;
      }
      // Set the button to disabled if the device doesn't fit in the current
      // viewport.
      // Toggle between the prop() and removeProp() methods.
      $this.prop('disabled', !fits)
        .attr('aria-disabled', !fits);
    });
    // Set the number of devices that fit the current viewport.
    view.model.set('fittingDeviceCount', fittingDeviceCount);
  }

  /**
   * Wrapper for openPreview that takes in account if responsive preview is
   * triggered on edit form. Available only for node entity type.
   *
   * @param Backbone.View view
   *   The View curried to this handler. This function is used in multiple Views,
   *   so we bind it as an argument to the handler function in order to avoid
   *   having to reference it through a 'this' object which will trigger 'Possible
   *   strict violation' warning messages in JSHint.
   * @param jQuery.Event event
   */
  function selectDevice(view, event) {
    var config = drupalSettings.responsive_preview;

    if (config && config.ajax_responsive_preview && view.model.get('isActive') === false) {
      var $previewTriggerElement = $(config.ajax_responsive_preview);
      var deviceId = $(event.target).data('responsive-preview-name');

      if ($previewTriggerElement.length) {
        $previewTriggerElement.val(deviceId);
        $previewTriggerElement.trigger('show-responsive-preview');
      }
    }
    else {
      return openPreview(view, event);
    }
  }

  /**
   * Updates the model to reflect the properties of the chosen device.
   *
   * @param Backbone.View view
   *   The View curried to this handler. This function is used in multiple Views,
   *   so we bind it as an argument to the handler function in order to avoid
   *   having to reference it through a 'this' object which will trigger 'Possible
   *   strict violation' warning messages in JSHint.
   * @param jQuery.Event event
   */
  function openPreview(view, event) {
    var $link = $(event.target);
    var name = $link.data('responsive-preview-name');
    // If the clicked link is already active, then shut down the preview.
    if (view.model.get('activeDevice') === name) {
      view.model.set('isActive', false);
      return;
    }
    // Update the device dimensions.
    view.model.set({
      'activeDevice': name,
      'dimensions': {
        'width': parseInt($link.data('responsive-preview-width'), 10),
        'height': parseInt($link.data('responsive-preview-height'), 10),
        'dppx': parseFloat($link.data('responsive-preview-dppx'), 10)
      }
    });
    // Toggle the preview on.
    view.model.set('isActive', true);

    event.preventDefault();
  }

  /**
   * Registers theme templates with Drupal.theme().
   */
  $.extend(Drupal.theme, {
    /**
     * Theme function for the preview container element.
     *
     * @return
     *   The corresponding HTML.
     */
    responsivePreviewContainer: function () {
      return '<div id="responsive-preview" class="responsive-preview" style="opacity: 0;"><div id="responsive-preview-modal-background" class="responsive-preview-modal-background"></div></div>';
    },

    /**
     * Theme function for the close button for the preview container.
     *
     * @param Object strings
     *   A hash of strings to use in the template.
     *
     * @return
     *   The corresponding HTML.
     */
    responsivePreviewFrameContainer: function (strings) {
      return '<div id="responsive-preview-frame-container" class="responsive-preview-frame-container" aria-describedby="responsive-preview-frame-label">' +
        '<label id="responsive-preview-frame-label" class="responsive-preview-device-label" for="responsive-preview-frame-container">' +
        '<span class="responsive-preview-device-label-text"></span>' +
        // The space is necessary to prevent screen readers from pronouncing a
        // run-on word between the last word of the label and the first word
        // of the details.
        '<span>&#32;</span>' +
        '<span class="responsive-preview-device-label-details visually-hidden"></span></label>' +
        '<button id="responsive-preview-close" title="' + strings.close + '" role="button" class="responsive-preview-icon responsive-preview-icon-close responsive-preview-control responsive-preview-close" aria-pressed="false"><span class="visually-hidden">' + strings.close + '</span></button>' +
        '<button id="responsive-preview-orientation" title="' + strings.orientation + '" role="button" class="responsive-preview-icon responsive-preview-icon-orientation responsive-preview-control responsive-preview-orientation" aria-pressed="false"><span class="visually-hidden">' + strings.orientation + '</span></button>' +
        '</div>';
    },

    /**
     * Theme function for the scrolling wrapper of the preview container.
     *
     * @return
     *   The corresponding HTML.
     */
    responsivePreviewScrollContainer: function () {
      return '<div id="responsive-preview-scroll-track"><div id="responsive-preview-scroll-pane"></div></div>';
    },

    /**
     * Theme function for a responsive preview iframe element.
     *
     * @return
     *   The corresponding HTML.
     */
    responsivePreviewFrame: function () {
      return '<iframe id="responsive-preview-frame" width="100%" height="100%" frameborder="0" scrolling="auto" allowtransparency="true"></iframe>';
    }
  });

}(jQuery, Backbone, Drupal, drupalSettings));
;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","../keycode","../position","../safe-active-element","../unique-id","../version","../widget"],a):a(jQuery)}(function(a){return a.widget("ui.menu",{version:"1.12.1",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-caret-1-e"},items:"> *",menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().attr({role:this.options.role,tabIndex:0}),this._addClass("ui-menu","ui-widget ui-widget-content"),this._on({"mousedown .ui-menu-item":function(a){a.preventDefault()},"click .ui-menu-item":function(b){var c=a(b.target),d=a(a.ui.safeActiveElement(this.document[0]));!this.mouseHandled&&c.not(".ui-state-disabled").length&&(this.select(b),b.isPropagationStopped()||(this.mouseHandled=!0),c.has(".ui-menu").length?this.expand(b):!this.element.is(":focus")&&d.closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(b){if(!this.previousFilter){var c=a(b.target).closest(".ui-menu-item"),d=a(b.currentTarget);c[0]===d[0]&&(this._removeClass(d.siblings().children(".ui-state-active"),null,"ui-state-active"),this.focus(b,d))}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(a,b){var c=this.active||this.element.find(this.options.items).eq(0);b||this.focus(a,c)},blur:function(b){this._delay(function(){var c=!a.contains(this.element[0],a.ui.safeActiveElement(this.document[0]));c&&this.collapseAll(b)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(a){this._closeOnDocumentClick(a)&&this.collapseAll(a),this.mouseHandled=!1}})},_destroy:function(){var b=this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),c=b.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(),c.children().each(function(){var b=a(this);b.data("ui-menu-submenu-caret")&&b.remove()})},_keydown:function(b){var c,d,e,f,g=!0;switch(b.keyCode){case a.ui.keyCode.PAGE_UP:this.previousPage(b);break;case a.ui.keyCode.PAGE_DOWN:this.nextPage(b);break;case a.ui.keyCode.HOME:this._move("first","first",b);break;case a.ui.keyCode.END:this._move("last","last",b);break;case a.ui.keyCode.UP:this.previous(b);break;case a.ui.keyCode.DOWN:this.next(b);break;case a.ui.keyCode.LEFT:this.collapse(b);break;case a.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(b);break;case a.ui.keyCode.ENTER:case a.ui.keyCode.SPACE:this._activate(b);break;case a.ui.keyCode.ESCAPE:this.collapse(b);break;default:g=!1,d=this.previousFilter||"",f=!1,e=b.keyCode>=96&&b.keyCode<=105?(b.keyCode-96).toString():String.fromCharCode(b.keyCode),clearTimeout(this.filterTimer),e===d?f=!0:e=d+e,c=this._filterMenuItems(e),c=f&&c.index(this.active.next())!==-1?this.active.nextAll(".ui-menu-item"):c,c.length||(e=String.fromCharCode(b.keyCode),c=this._filterMenuItems(e)),c.length?(this.focus(b,c),this.previousFilter=e,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}g&&b.preventDefault()},_activate:function(a){this.active&&!this.active.is(".ui-state-disabled")&&(this.active.children("[aria-haspopup='true']").length?this.expand(a):this.select(a))},refresh:function(){var b,c,d,e,f,g=this,h=this.options.icons.submenu,i=this.element.find(this.options.menus);this._toggleClass("ui-menu-icons",null,!!this.element.find(".ui-icon").length),d=i.filter(":not(.ui-menu)").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var b=a(this),c=b.prev(),d=a("<span>").data("ui-menu-submenu-caret",!0);g._addClass(d,"ui-menu-icon","ui-icon "+h),c.attr("aria-haspopup","true").prepend(d),b.attr("aria-labelledby",c.attr("id"))}),this._addClass(d,"ui-menu","ui-widget ui-widget-content ui-front"),b=i.add(this.element),c=b.find(this.options.items),c.not(".ui-menu-item").each(function(){var b=a(this);g._isDivider(b)&&g._addClass(b,"ui-menu-divider","ui-widget-content")}),e=c.not(".ui-menu-item, .ui-menu-divider"),f=e.children().not(".ui-menu").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),this._addClass(e,"ui-menu-item")._addClass(f,"ui-menu-item-wrapper"),c.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!a.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(a,b){if("icons"===a){var c=this.element.find(".ui-menu-icon");this._removeClass(c,null,this.options.icons.submenu)._addClass(c,null,b.submenu)}this._super(a,b)},_setOptionDisabled:function(a){this._super(a),this.element.attr("aria-disabled",String(a)),this._toggleClass(null,"ui-state-disabled",!!a)},focus:function(a,b){var c,d,e;this.blur(a,a&&"focus"===a.type),this._scrollIntoView(b),this.active=b.first(),d=this.active.children(".ui-menu-item-wrapper"),this._addClass(d,null,"ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",d.attr("id")),e=this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"),this._addClass(e,null,"ui-state-active"),a&&"keydown"===a.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),c=b.children(".ui-menu"),c.length&&a&&/^mouse/.test(a.type)&&this._startOpening(c),this.activeMenu=b.parent(),this._trigger("focus",a,{item:b})},_scrollIntoView:function(b){var c,d,e,f,g,h;this._hasScroll()&&(c=parseFloat(a.css(this.activeMenu[0],"borderTopWidth"))||0,d=parseFloat(a.css(this.activeMenu[0],"paddingTop"))||0,e=b.offset().top-this.activeMenu.offset().top-c-d,f=this.activeMenu.scrollTop(),g=this.activeMenu.height(),h=b.outerHeight(),e<0?this.activeMenu.scrollTop(f+e):e+h>g&&this.activeMenu.scrollTop(f+e-g+h))},blur:function(a,b){b||clearTimeout(this.timer),this.active&&(this._removeClass(this.active.children(".ui-menu-item-wrapper"),null,"ui-state-active"),this._trigger("blur",a,{item:this.active}),this.active=null)},_startOpening:function(a){clearTimeout(this.timer),"true"===a.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(a)},this.delay))},_open:function(b){var c=a.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(b.parents(".ui-menu")).hide().attr("aria-hidden","true"),b.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(c)},collapseAll:function(b,c){clearTimeout(this.timer),this.timer=this._delay(function(){var d=c?this.element:a(b&&b.target).closest(this.element.find(".ui-menu"));d.length||(d=this.element),this._close(d),this.blur(b),this._removeClass(d.find(".ui-state-active"),null,"ui-state-active"),this.activeMenu=d},this.delay)},_close:function(a){a||(a=this.active?this.active.parent():this.element),a.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false")},_closeOnDocumentClick:function(b){return!a(b.target).closest(".ui-menu").length},_isDivider:function(a){return!/[^\-\u2014\u2013\s]/.test(a.text())},collapse:function(a){var b=this.active&&this.active.parent().closest(".ui-menu-item",this.element);b&&b.length&&(this._close(),this.focus(a,b))},expand:function(a){var b=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();b&&b.length&&(this._open(b.parent()),this._delay(function(){this.focus(a,b)}))},next:function(a){this._move("next","first",a)},previous:function(a){this._move("prev","last",a)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(a,b,c){var d;this.active&&(d="first"===a||"last"===a?this.active["first"===a?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[a+"All"](".ui-menu-item").eq(0)),d&&d.length&&this.active||(d=this.activeMenu.find(this.options.items)[b]()),this.focus(c,d)},nextPage:function(b){var c,d,e;return this.active?void(this.isLastItem()||(this._hasScroll()?(d=this.active.offset().top,e=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return c=a(this),c.offset().top-d-e<0}),this.focus(b,c)):this.focus(b,this.activeMenu.find(this.options.items)[this.active?"last":"first"]()))):void this.next(b)},previousPage:function(b){var c,d,e;return this.active?void(this.isFirstItem()||(this._hasScroll()?(d=this.active.offset().top,e=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return c=a(this),c.offset().top-d+e>0}),this.focus(b,c)):this.focus(b,this.activeMenu.find(this.options.items).first()))):void this.next(b)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(b){this.active=this.active||a(b.target).closest(".ui-menu-item");var c={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(b,!0),this._trigger("select",b,c)},_filterMenuItems:function(b){var c=b.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),d=new RegExp("^"+c,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return d.test(a.trim(a(this).children(".ui-menu-item-wrapper").text()))})}})});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./menu","../keycode","../position","../safe-active-element","../version","../widget"],a):a(jQuery)}(function(a){return a.widget("ui.autocomplete",{version:"1.12.1",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var b,c,d,e=this.element[0].nodeName.toLowerCase(),f="textarea"===e,g="input"===e;this.isMultiLine=f||!g&&this._isContentEditable(this.element),this.valueMethod=this.element[f||g?"val":"text"],this.isNewMenu=!0,this._addClass("ui-autocomplete-input"),this.element.attr("autocomplete","off"),this._on(this.element,{keydown:function(e){if(this.element.prop("readOnly"))return b=!0,d=!0,void(c=!0);b=!1,d=!1,c=!1;var f=a.ui.keyCode;switch(e.keyCode){case f.PAGE_UP:b=!0,this._move("previousPage",e);break;case f.PAGE_DOWN:b=!0,this._move("nextPage",e);break;case f.UP:b=!0,this._keyEvent("previous",e);break;case f.DOWN:b=!0,this._keyEvent("next",e);break;case f.ENTER:this.menu.active&&(b=!0,e.preventDefault(),this.menu.select(e));break;case f.TAB:this.menu.active&&this.menu.select(e);break;case f.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(e),e.preventDefault());break;default:c=!0,this._searchTimeout(e)}},keypress:function(d){if(b)return b=!1,void(this.isMultiLine&&!this.menu.element.is(":visible")||d.preventDefault());if(!c){var e=a.ui.keyCode;switch(d.keyCode){case e.PAGE_UP:this._move("previousPage",d);break;case e.PAGE_DOWN:this._move("nextPage",d);break;case e.UP:this._keyEvent("previous",d);break;case e.DOWN:this._keyEvent("next",d)}}},input:function(a){return d?(d=!1,void a.preventDefault()):void this._searchTimeout(a)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(a){return this.cancelBlur?void delete this.cancelBlur:(clearTimeout(this.searching),this.close(a),void this._change(a))}}),this._initSource(),this.menu=a("<ul>").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"),this._addClass(this.menu.element,"ui-autocomplete","ui-front"),this._on(this.menu.element,{mousedown:function(b){b.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,this.element[0]!==a.ui.safeActiveElement(this.document[0])&&this.element.trigger("focus")})},menufocus:function(b,c){var d,e;return this.isNewMenu&&(this.isNewMenu=!1,b.originalEvent&&/^mouse/.test(b.originalEvent.type))?(this.menu.blur(),void this.document.one("mousemove",function(){a(b.target).trigger(b.originalEvent)})):(e=c.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",b,{item:e})&&b.originalEvent&&/^key/.test(b.originalEvent.type)&&this._value(e.value),d=c.item.attr("aria-label")||e.value,void(d&&a.trim(d).length&&(this.liveRegion.children().hide(),a("<div>").text(d).appendTo(this.liveRegion))))},menuselect:function(b,c){var d=c.item.data("ui-autocomplete-item"),e=this.previous;this.element[0]!==a.ui.safeActiveElement(this.document[0])&&(this.element.trigger("focus"),this.previous=e,this._delay(function(){this.previous=e,this.selectedItem=d})),!1!==this._trigger("select",b,{item:d})&&this._value(d.value),this.term=this._value(),this.close(b),this.selectedItem=d}}),this.liveRegion=a("<div>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(a,b){this._super(a,b),"source"===a&&this._initSource(),"appendTo"===a&&this.menu.element.appendTo(this._appendTo()),"disabled"===a&&b&&this.xhr&&this.xhr.abort()},_isEventTargetInWidget:function(b){var c=this.menu.element[0];return b.target===this.element[0]||b.target===c||a.contains(c,b.target)},_closeOnClickOutside:function(a){this._isEventTargetInWidget(a)||this.close()},_appendTo:function(){var b=this.options.appendTo;return b&&(b=b.jquery||b.nodeType?a(b):this.document.find(b).eq(0)),b&&b[0]||(b=this.element.closest(".ui-front, dialog")),b.length||(b=this.document[0].body),b},_initSource:function(){var b,c,d=this;a.isArray(this.options.source)?(b=this.options.source,this.source=function(c,d){d(a.ui.autocomplete.filter(b,c.term))}):"string"==typeof this.options.source?(c=this.options.source,this.source=function(b,e){d.xhr&&d.xhr.abort(),d.xhr=a.ajax({url:c,data:b,dataType:"json",success:function(a){e(a)},error:function(){e([])}})}):this.source=this.options.source},_searchTimeout:function(a){clearTimeout(this.searching),this.searching=this._delay(function(){var b=this.term===this._value(),c=this.menu.element.is(":visible"),d=a.altKey||a.ctrlKey||a.metaKey||a.shiftKey;b&&(!b||c||d)||(this.selectedItem=null,this.search(null,a))},this.options.delay)},search:function(a,b){return a=null!=a?a:this._value(),this.term=this._value(),a.length<this.options.minLength?this.close(b):this._trigger("search",b)!==!1?this._search(a):void 0},_search:function(a){this.pending++,this._addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:a},this._response())},_response:function(){var b=++this.requestIndex;return a.proxy(function(a){b===this.requestIndex&&this.__response(a),this.pending--,this.pending||this._removeClass("ui-autocomplete-loading")},this)},__response:function(a){a&&(a=this._normalize(a)),this._trigger("response",null,{content:a}),!this.options.disabled&&a&&a.length&&!this.cancelSearch?(this._suggest(a),this._trigger("open")):this._close()},close:function(a){this.cancelSearch=!0,this._close(a)},_close:function(a){this._off(this.document,"mousedown"),this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",a))},_change:function(a){this.previous!==this._value()&&this._trigger("change",a,{item:this.selectedItem})},_normalize:function(b){return b.length&&b[0].label&&b[0].value?b:a.map(b,function(b){return"string"==typeof b?{label:b,value:b}:a.extend({},b,{label:b.label||b.value,value:b.value||b.label})})},_suggest:function(b){var c=this.menu.element.empty();this._renderMenu(c,b),this.isNewMenu=!0,this.menu.refresh(),c.show(),this._resizeMenu(),c.position(a.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next(),this._on(this.document,{mousedown:"_closeOnClickOutside"})},_resizeMenu:function(){var a=this.menu.element;a.outerWidth(Math.max(a.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(b,c){var d=this;a.each(c,function(a,c){d._renderItemData(b,c)})},_renderItemData:function(a,b){return this._renderItem(a,b).data("ui-autocomplete-item",b)},_renderItem:function(b,c){return a("<li>").append(a("<div>").text(c.label)).appendTo(b)},_move:function(a,b){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(a)||this.menu.isLastItem()&&/^next/.test(a)?(this.isMultiLine||this._value(this.term),void this.menu.blur()):void this.menu[a](b):void this.search(null,b)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(a,b){this.isMultiLine&&!this.menu.element.is(":visible")||(this._move(a,b),b.preventDefault())},_isContentEditable:function(a){if(!a.length)return!1;var b=a.prop("contentEditable");return"inherit"===b?this._isContentEditable(a.parent()):"true"===b}}),a.extend(a.ui.autocomplete,{escapeRegex:function(a){return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(b,c){var d=new RegExp(a.ui.autocomplete.escapeRegex(c),"i");return a.grep(b,function(a){return d.test(a.label||a.value||a)})}}),a.widget("ui.autocomplete",a.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(a){return a+(a>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(b){var c;this._superApply(arguments),this.options.disabled||this.cancelSearch||(c=b&&b.length?this.options.messages.results(b.length):this.options.messages.noResults,this.liveRegion.children().hide(),a("<div>").text(c).appendTo(this.liveRegion))}}),a.ui.autocomplete});;
/**
 * @file
 * Behaviors for the search widget in the admin toolbar.
 */

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.adminToolbarSearch = {

    // If extra links have been fetched.
    extraFetched: false,

    attach: function (context) {
      if (context != document) {
        return;
      }

      var getUrl = window.location;
      var baseUrl = getUrl.protocol + "//" + getUrl.host + "/";
      var $self = this;
      this.links = [];
      $('.toolbar-tray a[data-drupal-link-system-path]').each(function () {
        if (this.href != baseUrl) {
          var label = $self.getItemLabel(this);
          $self.links.push({
            'value': $(this).attr('href'),
            'label': label + ' ' + $(this).attr('href'),
            'labelRaw': label
          });
        }
      });

      $("#admin-toolbar-search-input").autocomplete({
        minLength: 2,
        source: function (request, response) {
          var data = $self.handleAutocomplete(request.term);
          if (!$self.extraFetched && drupalSettings.adminToolbarSearch.loadExtraLinks) {
            $.getJSON( "/admin/admin-toolbar-search", function( data ) {
              $(data).each(function() {
                var item = this;
                item.label = this.labelRaw + ' ' + this.value;
                $self.links.push(item);
              });

              $self.extraFetched = true;

              var results = $self.handleAutocomplete(request.term);
              response(results);
            });
          }
          else {
            response(data);
          }
        },
        open: function () {
          var zIndex = $('#toolbar-item-administration-search-tray')
            .css("z-index") + 1;
          $(this).autocomplete('widget').css('z-index', zIndex);

          return false;
        },
        select: function (event, ui) {
          if (ui.item.value) {
            location.href = ui.item.value;
            return false;
          }
        }
      }).data("ui-autocomplete")._renderItem = (function (ul, item) {
        return $("<li>")
          .append('<div>' + item.labelRaw + ' <span class="admin-toolbar-search-url">' + item.value + '</span></div>')
          .appendTo(ul);
      });

      // Focus on search field when tab is clicked, or enter is pressed.
      $(context).find('#toolbar-item-administration-search')
        .once('admin_toolbar_search')
        .each(function () {
          if (Drupal.behaviors.adminToolbarSearch.isSearchVisible()) {
            $('#admin-toolbar-search-input').focus();
          }
          $(this).on('click', function () {
            $self.focusOnSearchElement();
          });
        });

      // Initialize hotkey / keyboard shortcut.
      this.initHotkey();
    },
    focusOnSearchElement: function () {
      var waitforVisible = function () {
        if ($('#toolbar-item-administration-search-tray:visible').length) {
          $('#admin-toolbar-search-input').focus();
        }
        else {
          setTimeout(function () {
            waitforVisible();
          }, 1);
        }
      };
      waitforVisible();
    },
    getItemLabel: function (item) {
      var breadcrumbs = [];
      $(item).parents().each(function () {
        if ($(this).hasClass('menu-item')) {
          var $link = $(this).find('a:first');
          if ($link.length && !$link.hasClass('admin-toolbar-search-ignore')) {
            breadcrumbs.unshift($link.text());
          }
        }
      });
      return breadcrumbs.join(' > ');
    },
    handleAutocomplete: function (term) {
      var $self = this;
      var keywords = term.split(" "); // Split search terms into list.

      var suggestions = [];
      $self.links.forEach(function (element) {
        var label = element.label.toLowerCase();

        // Add exact matches.
        if (label.indexOf(term.toLowerCase()) >= 0) {
          suggestions.push(element);
        }
        else {
          // Add suggestions where it matches all search terms.
          var matchCount = 0;
          keywords.forEach(function (keyword) {
            if (label.indexOf(keyword.toLowerCase()) >= 0) {
              matchCount++;
            }
          });
          if (matchCount == keywords.length) {
            suggestions.push(element);
          }
        }
      });
      return suggestions;
    },
    /**
     * Whether the search is visible or not.
     *
     * @returns {boolean}
     *   True if visible, false otherwise.
     */
    isSearchVisible: function () {
      return $('#toolbar-item-administration-search-tray').is(':visible');
    },
    /**
     * Toggles the toolbar search tray.
     */
    toggleSearch: function () {
      $('#toolbar-item-administration-search').trigger('click');
    },
    /**
     * Binds a keyboard shortcut to toggle the search.
     */
    initHotkey: function () {
      $(document)
        .once('admin_toolbar_search')
        .keydown(function (event) {
          // Show the form with alt + S.
          if (!Drupal.behaviors.adminToolbarSearch.isSearchVisible()) {
            // 83 = s.
            if (event.altKey === true && event.keyCode === 83) {
              Drupal.behaviors.adminToolbarSearch.toggleSearch();
              event.preventDefault();
            }
          }
          // Hide the search with alt + S or ESC.
          else {
            // 83 = s.
            if (
              (event.altKey === true && event.keyCode === 83) ||
              event.key === 'Escape'
            ) {
              Drupal.behaviors.adminToolbarSearch.toggleSearch();
              event.preventDefault();
            }
          }
        });
    }
  };

})(jQuery, Drupal);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  function TabbingManager() {
    this.stack = [];
  }

  function TabbingContext(options) {
    $.extend(this, {
      level: null,

      $tabbableElements: $(),

      $disabledElements: $(),

      released: false,

      active: false
    }, options);
  }

  $.extend(TabbingManager.prototype, {
    constrain: function constrain(elements) {
      var il = this.stack.length;
      for (var i = 0; i < il; i++) {
        this.stack[i].deactivate();
      }

      var $elements = $(elements).find(':tabbable').addBack(':tabbable');

      var tabbingContext = new TabbingContext({
        level: this.stack.length,
        $tabbableElements: $elements
      });

      this.stack.push(tabbingContext);

      tabbingContext.activate();

      $(document).trigger('drupalTabbingConstrained', tabbingContext);

      return tabbingContext;
    },
    release: function release() {
      var toActivate = this.stack.length - 1;
      while (toActivate >= 0 && this.stack[toActivate].released) {
        toActivate--;
      }

      this.stack.splice(toActivate + 1);

      if (toActivate >= 0) {
        this.stack[toActivate].activate();
      }
    },
    activate: function activate(tabbingContext) {
      var $set = tabbingContext.$tabbableElements;
      var level = tabbingContext.level;

      var $disabledSet = $(':tabbable').not($set);

      tabbingContext.$disabledElements = $disabledSet;

      var il = $disabledSet.length;
      for (var i = 0; i < il; i++) {
        this.recordTabindex($disabledSet.eq(i), level);
      }

      $disabledSet.prop('tabindex', -1).prop('autofocus', false);

      var $hasFocus = $set.filter('[autofocus]').eq(-1);

      if ($hasFocus.length === 0) {
        $hasFocus = $set.eq(0);
      }
      $hasFocus.trigger('focus');
    },
    deactivate: function deactivate(tabbingContext) {
      var $set = tabbingContext.$disabledElements;
      var level = tabbingContext.level;
      var il = $set.length;
      for (var i = 0; i < il; i++) {
        this.restoreTabindex($set.eq(i), level);
      }
    },
    recordTabindex: function recordTabindex($el, level) {
      var tabInfo = $el.data('drupalOriginalTabIndices') || {};
      tabInfo[level] = {
        tabindex: $el[0].getAttribute('tabindex'),
        autofocus: $el[0].hasAttribute('autofocus')
      };
      $el.data('drupalOriginalTabIndices', tabInfo);
    },
    restoreTabindex: function restoreTabindex($el, level) {
      var tabInfo = $el.data('drupalOriginalTabIndices');
      if (tabInfo && tabInfo[level]) {
        var data = tabInfo[level];
        if (data.tabindex) {
          $el[0].setAttribute('tabindex', data.tabindex);
        } else {
            $el[0].removeAttribute('tabindex');
          }
        if (data.autofocus) {
          $el[0].setAttribute('autofocus', 'autofocus');
        }

        if (level === 0) {
          $el.removeData('drupalOriginalTabIndices');
        } else {
          var levelToDelete = level;
          while (tabInfo.hasOwnProperty(levelToDelete)) {
            delete tabInfo[levelToDelete];
            levelToDelete++;
          }
          $el.data('drupalOriginalTabIndices', tabInfo);
        }
      }
    }
  });

  $.extend(TabbingContext.prototype, {
    release: function release() {
      if (!this.released) {
        this.deactivate();
        this.released = true;
        Drupal.tabbingManager.release(this);

        $(document).trigger('drupalTabbingContextReleased', this);
      }
    },
    activate: function activate() {
      if (!this.active && !this.released) {
        this.active = true;
        Drupal.tabbingManager.activate(this);

        $(document).trigger('drupalTabbingContextActivated', this);
      }
    },
    deactivate: function deactivate() {
      if (this.active) {
        this.active = false;
        Drupal.tabbingManager.deactivate(this);

        $(document).trigger('drupalTabbingContextDeactivated', this);
      }
    }
  });

  if (Drupal.tabbingManager) {
    return;
  }

  Drupal.tabbingManager = new TabbingManager();
})(jQuery, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, Backbone) {
  var strings = {
    tabbingReleased: Drupal.t('Tabbing is no longer constrained by the Contextual module.'),
    tabbingConstrained: Drupal.t('Tabbing is constrained to a set of @contextualsCount and the edit mode toggle.'),
    pressEsc: Drupal.t('Press the esc key to exit.')
  };

  function initContextualToolbar(context) {
    if (!Drupal.contextual || !Drupal.contextual.collection) {
      return;
    }

    var contextualToolbar = Drupal.contextualToolbar;
    contextualToolbar.model = new contextualToolbar.StateModel({
      isViewing: localStorage.getItem('Drupal.contextualToolbar.isViewing') !== 'false'
    }, {
      contextualCollection: Drupal.contextual.collection
    });

    var viewOptions = {
      el: $('.toolbar .toolbar-bar .contextual-toolbar-tab'),
      model: contextualToolbar.model,
      strings: strings
    };
    new contextualToolbar.VisualView(viewOptions);
    new contextualToolbar.AuralView(viewOptions);
  }

  Drupal.behaviors.contextualToolbar = {
    attach: function attach(context) {
      if ($('body').once('contextualToolbar-init').length) {
        initContextualToolbar(context);
      }
    }
  };

  Drupal.contextualToolbar = {
    model: null
  };
})(jQuery, Drupal, Backbone);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal, Backbone) {
  Drupal.contextualToolbar.StateModel = Backbone.Model.extend({
    defaults: {
      isViewing: true,

      isVisible: false,

      contextualCount: 0,

      tabbingContext: null
    },

    initialize: function initialize(attrs, options) {
      this.listenTo(options.contextualCollection, 'reset remove add', this.countContextualLinks);
      this.listenTo(options.contextualCollection, 'add', this.lockNewContextualLinks);

      this.listenTo(this, 'change:contextualCount', this.updateVisibility);

      this.listenTo(this, 'change:isViewing', function (model, isViewing) {
        options.contextualCollection.each(function (contextualModel) {
          contextualModel.set('isLocked', !isViewing);
        });
      });
    },
    countContextualLinks: function countContextualLinks(contextualModel, contextualCollection) {
      this.set('contextualCount', contextualCollection.length);
    },
    lockNewContextualLinks: function lockNewContextualLinks(contextualModel, contextualCollection) {
      if (!this.get('isViewing')) {
        contextualModel.set('isLocked', true);
      }
    },
    updateVisibility: function updateVisibility() {
      this.set('isVisible', this.get('contextualCount') > 0);
    }
  });
})(Drupal, Backbone);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, Backbone, _) {
  Drupal.contextualToolbar.AuralView = Backbone.View.extend({
    announcedOnce: false,

    initialize: function initialize(options) {
      this.options = options;

      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'change:isViewing', this.manageTabbing);

      $(document).on('keyup', _.bind(this.onKeypress, this));
      this.manageTabbing();
    },
    render: function render() {
      this.$el.find('button').attr('aria-pressed', !this.model.get('isViewing'));

      return this;
    },
    manageTabbing: function manageTabbing() {
      var tabbingContext = this.model.get('tabbingContext');

      if (tabbingContext) {
        if (tabbingContext.active) {
          Drupal.announce(this.options.strings.tabbingReleased);
        }
        tabbingContext.release();
      }

      if (!this.model.get('isViewing')) {
        tabbingContext = Drupal.tabbingManager.constrain($('.contextual-toolbar-tab, .contextual'));
        this.model.set('tabbingContext', tabbingContext);
        this.announceTabbingConstraint();
        this.announcedOnce = true;
      }
    },
    announceTabbingConstraint: function announceTabbingConstraint() {
      var strings = this.options.strings;
      Drupal.announce(Drupal.formatString(strings.tabbingConstrained, {
        '@contextualsCount': Drupal.formatPlural(Drupal.contextual.collection.length, '@count contextual link', '@count contextual links')
      }));
      Drupal.announce(strings.pressEsc);
    },
    onKeypress: function onKeypress(event) {
      if (!this.announcedOnce && event.keyCode === 9 && !this.model.get('isViewing')) {
        this.announceTabbingConstraint();

        this.announcedOnce = true;
      }

      if (event.keyCode === 27) {
        this.model.set('isViewing', true);
      }
    }
  });
})(jQuery, Drupal, Backbone, _);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal, Backbone) {
  Drupal.contextualToolbar.VisualView = Backbone.View.extend({
    events: function events() {
      var touchEndToClick = function touchEndToClick(event) {
        event.preventDefault();
        event.target.click();
      };

      return {
        click: function click() {
          this.model.set('isViewing', !this.model.get('isViewing'));
        },

        touchend: touchEndToClick
      };
    },
    initialize: function initialize() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'change:isViewing', this.persist);
    },
    render: function render() {
      this.$el.toggleClass('hidden', !this.model.get('isVisible'));

      this.$el.find('button').toggleClass('is-active', !this.model.get('isViewing'));

      return this;
    },
    persist: function persist(model, isViewing) {
      if (!isViewing) {
        localStorage.setItem('Drupal.contextualToolbar.isViewing', 'false');
      } else {
        localStorage.removeItem('Drupal.contextualToolbar.isViewing');
      }
    }
  });
})(Drupal, Backbone);;
/*!
 * hoverIntent v1.8.1 // 2014.08.11 // jQuery v1.9.1+
 * http://briancherne.github.io/jquery-hoverIntent/
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2014 Brian Cherne
 */

/* hoverIntent is similar to jQuery's built-in "hover" method except that
 * instead of firing the handlerIn function immediately, hoverIntent checks
 * to see if the user's mouse has slowed down (beneath the sensitivity
 * threshold) before firing the event. The handlerOut function is only
 * called after a matching handlerIn.
 *
 * // basic usage ... just like .hover()
 * .hoverIntent( handlerIn, handlerOut )
 * .hoverIntent( handlerInOut )
 *
 * // basic usage ... with event delegation!
 * .hoverIntent( handlerIn, handlerOut, selector )
 * .hoverIntent( handlerInOut, selector )
 *
 * // using a basic configuration object
 * .hoverIntent( config )
 *
 * @param  handlerIn   function OR configuration object
 * @param  handlerOut  function OR selector for delegation OR undefined
 * @param  selector    selector OR undefined
 * @author Brian Cherne <brian(at)cherne(dot)net>
 */

;(function(factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (jQuery && !jQuery.fn.hoverIntent) {
    factory(jQuery);
  }
})(function($) {
  'use strict';

  // default configuration values
  var _cfg = {
    interval: 100,
    sensitivity: 6,
    timeout: 0
  };

  // counter used to generate an ID for each instance
  var INSTANCE_COUNT = 0;

  // current X and Y position of mouse, updated during mousemove tracking (shared across instances)
  var cX, cY;

  // saves the current pointer position coordinates based on the given mousemove event
  var track = function(ev) {
    cX = ev.pageX;
    cY = ev.pageY;
  };

  // compares current and previous mouse positions
  var compare = function(ev,$el,s,cfg) {
    // compare mouse positions to see if pointer has slowed enough to trigger `over` function
    if ( Math.sqrt( (s.pX-cX)*(s.pX-cX) + (s.pY-cY)*(s.pY-cY) ) < cfg.sensitivity ) {
      $el.off(s.event,track);
      delete s.timeoutId;
      // set hoverIntent state as active for this element (permits `out` handler to trigger)
      s.isActive = true;
      // overwrite old mouseenter event coordinates with most recent pointer position
      ev.pageX = cX; ev.pageY = cY;
      // clear coordinate data from state object
      delete s.pX; delete s.pY;
      return cfg.over.apply($el[0],[ev]);
    } else {
      // set previous coordinates for next comparison
      s.pX = cX; s.pY = cY;
      // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
      s.timeoutId = setTimeout( function(){compare(ev, $el, s, cfg);} , cfg.interval );
    }
  };

  // triggers given `out` function at configured `timeout` after a mouseleave and clears state
  var delay = function(ev,$el,s,out) {
    delete $el.data('hoverIntent')[s.id];
    return out.apply($el[0],[ev]);
  };

  $.fn.hoverIntent = function(handlerIn,handlerOut,selector) {
    // instance ID, used as a key to store and retrieve state information on an element
    var instanceId = INSTANCE_COUNT++;

    // extend the default configuration and parse parameters
    var cfg = $.extend({}, _cfg);
    if ( $.isPlainObject(handlerIn) ) {
      cfg = $.extend(cfg, handlerIn);
      if ( !$.isFunction(cfg.out) ) {
        cfg.out = cfg.over;
      }
    } else if ( $.isFunction(handlerOut) ) {
      cfg = $.extend(cfg, { over: handlerIn, out: handlerOut, selector: selector } );
    } else {
      cfg = $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut } );
    }

    // A private function for handling mouse 'hovering'
    var handleHover = function(e) {
      // cloned event to pass to handlers (copy required for event object to be passed in IE)
      var ev = $.extend({},e);

      // the current target of the mouse event, wrapped in a jQuery object
      var $el = $(this);

      // read hoverIntent data from element (or initialize if not present)
      var hoverIntentData = $el.data('hoverIntent');
      if (!hoverIntentData) { $el.data('hoverIntent', (hoverIntentData = {})); }

      // read per-instance state from element (or initialize if not present)
      var state = hoverIntentData[instanceId];
      if (!state) { hoverIntentData[instanceId] = state = { id: instanceId }; }

      // state properties:
      // id = instance ID, used to clean up data
      // timeoutId = timeout ID, reused for tracking mouse position and delaying "out" handler
      // isActive = plugin state, true after `over` is called just until `out` is called
      // pX, pY = previously-measured pointer coordinates, updated at each polling interval
      // event = string representing the namespaced event used for mouse tracking

      // clear any existing timeout
      if (state.timeoutId) { state.timeoutId = clearTimeout(state.timeoutId); }

      // namespaced event used to register and unregister mousemove tracking
      var mousemove = state.event = 'mousemove.hoverIntent.hoverIntent'+instanceId;

      // handle the event, based on its type
      if (e.type === 'mouseenter') {
        // do nothing if already active
        if (state.isActive) { return; }
        // set "previous" X and Y position based on initial entry point
        state.pX = ev.pageX; state.pY = ev.pageY;
        // update "current" X and Y position based on mousemove
        $el.off(mousemove,track).on(mousemove,track);
        // start polling interval (self-calling timeout) to compare mouse coordinates over time
        state.timeoutId = setTimeout( function(){compare(ev,$el,state,cfg);} , cfg.interval );
      } else { // "mouseleave"
        // do nothing if not already active
        if (!state.isActive) { return; }
        // unbind expensive mousemove event
        $el.off(mousemove,track);
        // if hoverIntent state is true, then call the mouseOut function after the specified delay
        state.timeoutId = setTimeout( function(){delay(ev,$el,state,cfg.out);} , cfg.timeout );
      }
    };

    // listen for mouseenter and mouseleave
    return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover}, cfg.selector);
  };
});
;
(function ($, Drupal) {
  Drupal.behaviors.adminToolbar = {
    attach: function (context, settings) {

      $('a.toolbar-icon', context).removeAttr('title');

      $('.toolbar-tray li.menu-item--expanded, .toolbar-tray ul li.menu-item--expanded .menu-item', context).hoverIntent({
        over: function () {
          // At the current depth, we should delete all "hover-intent" classes.
          // Other wise we get unwanted behaviour where menu items are expanded while already in hovering other ones.
          $(this).parent().find('li').removeClass('hover-intent');
          $(this).addClass('hover-intent');
        },
        out: function () {
          $(this).removeClass('hover-intent');
        },
        timeout: 250
      });

      // Make the toolbar menu navigable with keyboard.
      $('ul.toolbar-menu li.menu-item--expanded a', context).on('focusin', function () {
        $('li.menu-item--expanded', context).removeClass('hover-intent');
        $(this).parents('li.menu-item--expanded').addClass('hover-intent');
      });

      $('ul.toolbar-menu li.menu-item a', context).keydown(function (e) {
        if ((e.shiftKey && (e.keyCode || e.which) == 9)) {
          if ($(this).parent('.menu-item').prev().hasClass('menu-item--expanded')) {
            $(this).parent('.menu-item').prev().addClass('hover-intent');
          }
        }
      });

      $('.toolbar-menu:first-child > .menu-item:not(.menu-item--expanded) a, .toolbar-tab > a', context).on('focusin', function () {
        $('.menu-item--expanded').removeClass('hover-intent');
      });

      $('.toolbar-menu:first-child > .menu-item', context).on('hover', function () {
        $(this, 'a').css("background: #fff;");
      });

      $('ul:not(.toolbar-menu)', context).on({
        mousemove: function () {
          $('li.menu-item--expanded').removeClass('hover-intent');
        },
        hover: function () {
          $('li.menu-item--expanded').removeClass('hover-intent');
        }
      });

    }
  };
})(jQuery, Drupal);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  var pathInfo = drupalSettings.path;
  var escapeAdminPath = sessionStorage.getItem('escapeAdminPath');
  var windowLocation = window.location;

  if (!pathInfo.currentPathIsAdmin && !/destination=/.test(windowLocation.search)) {
    sessionStorage.setItem('escapeAdminPath', windowLocation);
  }

  Drupal.behaviors.escapeAdmin = {
    attach: function attach() {
      var $toolbarEscape = $('[data-toolbar-escape-admin]').once('escapeAdmin');
      if ($toolbarEscape.length && pathInfo.currentPathIsAdmin) {
        if (escapeAdminPath !== null) {
          $toolbarEscape.attr('href', escapeAdminPath);
        } else {
          $toolbarEscape.text(Drupal.t('Home'));
        }
      }
    }
  };
})(jQuery, Drupal, drupalSettings);;
