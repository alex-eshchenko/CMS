<?php
/**
 * Helper function for including theme files.
 *
 * @param string $theme
 *   Name of the theme to use for base path.
 * @param string $path
 *   Path relative to $theme.
 */
function gavias_monte_include($theme, $path) {
  static $themes = array();
  if (!isset($themes[$theme])) {
    $themes[$theme] = drupal_get_path('theme', $theme);
  }
  if ($themes[$theme] && ($file = DRUPAL_ROOT . '/' . $themes[$theme] . '/' . $path) && file_exists($file)) {
    include_once $file;
  }
}

function gavias_monte_render_block($key) {
  $block = \Drupal\block\Entity\Block::load($key);
  if(isset($block) && $block){
  $block_content = \Drupal::entityManager()
    ->getViewBuilder('block')
    ->view($block);
    if(isset($block_content) && $block_content){
      return drupal_render($block_content);
    }else{
      return '';
    }
  }  
  return '';
}


