/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

(function (Drupal, DrupalGutenberg, drupalSettings, wp, $) {
  Drupal.isMediaEnabled = function () {
    return (drupalSettings.gutenberg || false) && drupalSettings.gutenberg['media-enabled'];
  };

  Drupal.isMediaLibraryEnabled = function () {
    return (drupalSettings.gutenberg || false) && drupalSettings.gutenberg['media-library-enabled'];
  };

  Drupal.toggleGutenbergLoader = function (state) {
    var $gutenbergLoader = $('#gutenberg-loading');
    switch (state) {
      case 'show':
        $gutenbergLoader.removeClass('hide');
        break;
      case 'hide':
        $gutenbergLoader.addClass('hide');
        break;
    }
  };

  Drupal.notifyError = function (message) {
    return wp.data.dispatch('core/notices').createErrorNotice(message, {
      isDismissible: true
    });
  };

  Drupal.notifySuccess = function (message) {
    return wp.data.dispatch('core/notices').createSuccessNotice(message, {
      isDismissible: true
    });
  };

  Drupal.editors.gutenberg = {
    attach: function attach(element, format) {
      var _this = this;

      return _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var _format$editorSetting, contentType, allowedBlocks, blackList, data, blocks, hooks, dispatch, addFilter, unregisterBlockType, registerBlockType, getBlockType, registerDrupalStore, registerDrupalBlocks, registerDrupalMedia, coreBlock, key, value, categories, metaboxesContainer, metaboxForm, isFormValid, formSubmitted;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!drupalSettings.gutenbergLoaded) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return', false);

              case 2:
                drupalSettings.gutenbergLoaded = true;

                _format$editorSetting = format.editorSettings, contentType = _format$editorSetting.contentType, allowedBlocks = _format$editorSetting.allowedBlocks, blackList = _format$editorSetting.blackList;
                data = wp.data, blocks = wp.blocks, hooks = wp.hooks;
                dispatch = data.dispatch;
                addFilter = hooks.addFilter;
                unregisterBlockType = blocks.unregisterBlockType, registerBlockType = blocks.registerBlockType, getBlockType = blocks.getBlockType;
                registerDrupalStore = DrupalGutenberg.registerDrupalStore, registerDrupalBlocks = DrupalGutenberg.registerDrupalBlocks, registerDrupalMedia = DrupalGutenberg.registerDrupalMedia;
                _context2.next = 11;
                return addFilter('blocks.registerBlockType', 'drupalgutenberg/custom-attributes', function (settings) {
                  settings.attributes = Object.assign(settings.attributes, {
                    mappingField: {
                      type: 'string',
                      default: ''
                    },
                    mappingAttribute: {
                      type: 'string',
                      default: ''
                    }
                  });
                  return settings;
                });

              case 11:
                _context2.next = 13;
                return registerDrupalStore(data);

              case 13:
                _context2.next = 15;
                return registerDrupalBlocks(contentType);

              case 15:
                _context2.next = 17;
                return registerDrupalMedia();

              case 17:
                _context2.next = 19;
                return _this._initGutenberg(element);

              case 19:

                if (drupalSettings.gutenberg._listeners.init) {
                  drupalSettings.gutenberg._listeners.init.forEach(function (callback) {
                    callback();
                  });
                }

                if (drupalSettings.gutenberg.messages) {
                  Object.keys(drupalSettings.gutenberg.messages).forEach(function (key) {
                    drupalSettings.gutenberg.messages[key].forEach(function (message) {
                      switch (key) {
                        case 'error':
                          dispatch('core/notices').createErrorNotice(message);
                          break;
                        case 'warning':
                          dispatch('core/notices').createWarningNotice(message);
                          break;
                        case 'success':
                          dispatch('core/notices').createSuccessNotice(message);
                          break;
                        default:
                          dispatch('core/notices').createWarningNotice(message);
                          break;
                      }
                    });
                  });
                }

                $('div.messages--error').each(function (index, el) {
                  dispatch('core/notices').createErrorNotice($(el).html(), {
                    __unstableHTML: $(el).html()
                  });
                  $(el).remove();
                });

                $('div.messages--warning').each(function (index, el) {
                  dispatch('core/notices').createWarningNotice($(el).html(), {
                    __unstableHTML: $(el).html()
                  });
                  $(el).remove();
                });

                $('div.messages--success').each(function (index, el) {
                  dispatch('core/notices').createSuccessNotice($(el).html(), {
                    __unstableHTML: $(el).html()
                  });
                  $(el).remove();
                });

                blackList.filter(function (value) {
                  return !value.includes('drupalblock/');
                }).forEach(function (value) {
                  unregisterBlockType(value);
                });

                coreBlock = getBlockType('core/block');

                unregisterBlockType('core/block');
                coreBlock.attributes = {
                  ref: {
                    type: 'number'
                  }
                };
                registerBlockType('core/block', coreBlock);

                for (key in allowedBlocks) {
                  if (allowedBlocks.hasOwnProperty(key)) {
                    value = allowedBlocks[key];

                    if (!value && !key.includes('/all') && !blackList.includes(key)) {
                      unregisterBlockType(key);
                    }
                  }
                }

                categories = data.select('core/blocks').getCategories().filter(function (item) {
                  if (item.slug === 'widgets') {
                    return false;
                  }
                  return true;
                });


                data.dispatch('core/blocks').setCategories(categories);

                data.dispatch('core/edit-post').openGeneralSidebar('edit-post/document');

                data.dispatch('core/nux').disableTips();

                data.dispatch('core/edit-post').setAvailableMetaBoxesPerLocation({
                  advanced: ['drupalSettings']
                });


                setTimeout(function () {
                  drupalSettings.gutenberg.metaboxes.forEach(function (id) {
                    $('#' + id).appendTo($('.edit-post-meta-boxes-area__container'));
                  });
                }, 0);

                metaboxesContainer = $(document.createElement('div'));

                metaboxesContainer.attr('id', 'metaboxes');
                $('body').append(metaboxesContainer);
                metaboxForm = $(document.createElement('form'));

                metaboxForm.addClass('metabox-location-advanced');
                metaboxesContainer.append(metaboxForm);

                $(document.forms[0]).attr('novalidate', true);

                setTimeout(function () {
                  $('.edit-post-header__settings').append($('.gutenberg-header-settings'));
                  $('.gutenberg-full-editor').addClass('ready');
                  Drupal.toggleGutenbergLoader('hide');
                }, 0);

                isFormValid = false;


                $('#edit-submit, #edit-preview').on('click', function (e) {
                  $(e.currentTarget).attr('active', true);

                  data.dispatch('core/edit-post').openGeneralSidebar('edit-post/document');

                  $('#edit-additional-fields').attr('open', '');

                  $(element.form).removeAttr('novalidate');

                  setTimeout(function () {
                    isFormValid = element.form.reportValidity();

                    if (isFormValid) {
                      $(e.currentTarget).click();
                    } else {
                      $(e.currentTarget).removeAttr('active');
                    }

                    $(element.form).attr('novalidate', true);
                  });

                  if (!isFormValid) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  }
                });

                formSubmitted = false;

                $(element.form).on('submit', function (e) {
                  var $source = $('input[active="true"]');

                  $source.removeAttr('active');

                  if ($source.attr('id') !== 'edit-submit' && $source.attr('id') !== 'edit-preview' && $source.attr('id') !== 'edit-delete') {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  }

                  $(element).val(data.select('core/editor').getEditedPostContent());

                  $(element).data({ 'editor-value-is-changed': true });
                  $(element).attr('data-editor-value-is-changed', true);

                  data.dispatch('core/edit-post').openGeneralSidebar('edit-post/document');

                  if (!formSubmitted) {
                    _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.next = 2;
                              return data.dispatch('core/editor').savePost();

                            case 2:

                              formSubmitted = true;

                              $source.click();

                            case 4:
                            case 'end':
                              return _context.stop();
                          }
                        }
                      }, _callee, _this);
                    }))();

                    e.preventDefault();
                    e.stopPropagation();
                  }
                });

                return _context2.abrupt('return', true);

              case 49:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }))();
    },
    attachInlineEditor: function attachInlineEditor(element, format, mainToolbarId, floatedToolbarId) {
      return false;
    },
    detach: function detach(element, format, trigger) {
      return true;
    },
    onChange: function onChange(element, callback) {
      return true;
    },
    _initGutenberg: function _initGutenberg(element) {
      var _this2 = this;

      return _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var editPost, data, $textArea, target, $editor, editorSettings, colors, fontSizes, hasOpenedSidebar, hasClosedSidebar;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                hasClosedSidebar = function hasClosedSidebar() {
                  if (!$(document.body).hasClass('gutenberg-sidebar-open')) {
                    return;
                  }

                  $(document.body).removeClass('gutenberg-sidebar-open');

                  $('.gutenberg-sidebar').append($('.edit-post-sidebar .components-panel .tab'));
                };

                hasOpenedSidebar = function hasOpenedSidebar(sidebarName) {
                  if ($(document.body).hasClass('gutenberg-sidebar-open')) {
                    return;
                  }

                  var tab = sidebarName.replace(/edit-post\//g, '');
                  tab = tab.replace(/drupal\//g, '');

                  var $tabG = $('.edit-post-sidebar .components-panel .tab');
                  $('.gutenberg-sidebar').append($tabG);

                  setTimeout(function () {
                    var $tabD = $('.gutenberg-sidebar .tab.' + tab);
                    $('.edit-post-sidebar .components-panel').append($tabD);
                  }, 0);

                  $(document.body).addClass('gutenberg-sidebar-open');
                };

                editPost = wp.editPost, data = wp.data;
                $textArea = $(element);
                target = 'editor-' + $textArea.data('drupal-selector');
                $editor = $('<div id="' + target + '" class="gutenberg__editor"></div>');

                $editor.insertAfter($textArea);
                $textArea.hide();

                wp.node = {
                  categories: [],
                  content: {
                    block_version: 0,
                    protected: false,
                    raw: $(element).val(),
                    rendered: ''
                  },
                  featured_media: 0,
                  id: 1,
                  parent: 0,
                  permalink_template: '',
                  revisions: { count: 0, last_id: 1 },
                  status: 'auto-draft',
                  theme_style: true,
                  type: 'page',
                  slug: ''
                };

                editorSettings = {
                  alignWide: true,
                  availableTemplates: [],
                  allowedBlockTypes: true,
                  disableCustomColors: false,
                  disablePostFormats: false,
                  mediaLibrary: true,

                  imageSizes: drupalSettings.gutenberg['image-sizes'],
                  titlePlaceholder: Drupal.t('Add title'),
                  bodyPlaceholder: Drupal.t('Add text or type / to add content'),
                  isRTL: false,
                  localAutosaveInterval: 0,
                  autosaveInterval: 0,
                  template: drupalSettings.gutenberg.template || '',
                  templateLock: drupalSettings.gutenberg['template-lock'] === 'none' ? false : drupalSettings.gutenberg['template-lock'] || false
                };
                colors = drupalSettings.gutenberg && drupalSettings.gutenberg['theme-support'] && drupalSettings.gutenberg['theme-support'].colors ? [].concat(_toConsumableArray(drupalSettings.gutenberg['theme-support'].colors)) : null;
                fontSizes = drupalSettings.gutenberg && drupalSettings.gutenberg['theme-support'] && drupalSettings.gutenberg['theme-support'].fontSizes ? [].concat(_toConsumableArray(drupalSettings.gutenberg['theme-support'].fontSizes)) : null;


                if (colors) {
                  editorSettings.colors = colors;
                }

                if (fontSizes) {
                  editorSettings.fontSizes = fontSizes;
                }

                data.subscribe(function () {
                  var isOpen = data.select('core/edit-post').isEditorSidebarOpened();
                  var sidebar = data.select('core/edit-post').getActiveGeneralSidebarName();

                  if (isOpen && sidebar === 'edit-post/document') {
                    hasOpenedSidebar(sidebar);
                  } else {
                    hasClosedSidebar();
                  }

                  if (!data.select('core/block-editor').isValidTemplate()) {
                    data.dispatch('core/block-editor').setTemplateValidity(true);
                  }
                });

                sessionStorage.removeItem('wp-autosave-block-editor-post-1');
                localStorage.removeItem('wp-autosave-block-editor-post-1');

                _context3.next = 19;
                return editPost.initializeEditor(target, 'page', 1, editorSettings);

              case 19:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }))();
    }
  };

  Drupal.behaviors.gutenbergMediaLibrary = {
    attach: function attach() {
      var $form = $('#media-entity-browser-modal .media-library-add-form');

      if (!$form.length) {
        return;
      }

      $form.find('[data-drupal-selector="edit-save-insert"]').css('display', 'none');
    }
  };
})(Drupal, DrupalGutenberg, drupalSettings, window.wp, jQuery);