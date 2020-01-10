<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* themes/gavias_monte/templates/navigation/menu--main.html.twig */
class __TwigTemplate_0a494f1df342ee97825b7b61589734c2934ea50ff8ea95abc17d10e2d6adcfc1 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["import" => 23, "macro" => 31, "if" => 33, "for" => 39, "set" => 41];
        $filters = ["escape" => 35, "join" => 47, "without" => 62];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['import', 'macro', 'if', 'for', 'set'],
                ['escape', 'join', 'without'],
                []
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->getSourceContext());

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 21
        echo "
<div class=\"gva-navigation\">
";
        // line 23
        $context["menus"] = $this;
        // line 24
        echo "
";
        // line 29
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($context["menus"]->getmenu_links(($context["items"] ?? null), ($context["attributes"] ?? null), 0));
        echo "

";
        // line 89
        echo "
</div>


<div id=\"menu-bar\" class=\"menu-bar\">
  <span class=\"one\"></span>
  <span class=\"two\"></span>
  <span class=\"three\"></span>
</div>";
    }

    // line 31
    public function getmenu_links($__items__ = null, $__attributes__ = null, $__menu_level__ = null, ...$__varargs__)
    {
        $context = $this->env->mergeGlobals([
            "items" => $__items__,
            "attributes" => $__attributes__,
            "menu_level" => $__menu_level__,
            "varargs" => $__varargs__,
        ]);

        $blocks = [];

        ob_start();
        try {
            // line 32
            echo "  ";
            $context["menus"] = $this;
            // line 33
            echo "  ";
            if (($context["items"] ?? null)) {
                // line 34
                echo "    ";
                if ((($context["menu_level"] ?? null) == 0)) {
                    // line 35
                    echo "      <ul";
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["attributes"] ?? null), "addClass", [0 => "gva_menu gva_menu_main"], "method")), "html", null, true);
                    echo ">
    ";
                } else {
                    // line 37
                    echo "      <ul class=\"menu sub-menu\">
    ";
                }
                // line 39
                echo "    ";
                $context['_parent'] = $context;
                $context['_seq'] = twig_ensure_traversable(($context["items"] ?? null));
                foreach ($context['_seq'] as $context["_key"] => $context["item"]) {
                    // line 40
                    echo "      
      ";
                    // line 41
                    $context["class_mega_menu"] = "";
                    // line 42
                    echo "      ";
                    $context["class_columns"] = "";
                    // line 43
                    echo "      ";
                    if ((($this->getAttribute($this->getAttribute($context["item"], "attributes", []), "gva_layout", []) == "menu-block") && (($context["menu_level"] ?? null) == 0))) {
                        // line 44
                        echo "        ";
                        $context["class_mega_menu"] = "gva-mega-menu mega-menu-block";
                        echo " 
      ";
                    } elseif ((($this->getAttribute($this->getAttribute(                    // line 45
$context["item"], "attributes", []), "gva_layout", []) == "menu-grid") && (($context["menu_level"] ?? null) == 0))) {
                        echo "   
        ";
                        // line 46
                        $context["class_mega_menu"] = "gva-mega-menu megamenu menu-grid";
                        echo " 
        ";
                        // line 47
                        $context["class_columns"] = twig_join_filter([0 => "menu-columns-", 1 => $this->getAttribute($this->getAttribute($context["item"], "attributes", []), "gva_layout_columns", [])], "");
                        // line 48
                        echo "      ";
                    }
                    echo "    

      ";
                    // line 51
                    $context["classes"] = [0 => "menu-item", 1 => (($this->getAttribute(                    // line 53
$context["item"], "is_expanded", [])) ? ("menu-item--expanded") : ("")), 2 => (($this->getAttribute(                    // line 54
$context["item"], "is_collapsed", [])) ? ("menu-item--collapsed") : ("")), 3 => (($this->getAttribute(                    // line 55
$context["item"], "in_active_trail", [])) ? ("menu-item--active-trail") : ("")), 4 => $this->getAttribute($this->getAttribute(                    // line 56
$context["item"], "attributes", []), "gva_class", []), 5 =>                     // line 57
($context["class_mega_menu"] ?? null), 6 =>                     // line 58
($context["class_columns"] ?? null)];
                    // line 61
                    echo "
      <li ";
                    // line 62
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->env->getExtension('Drupal\Core\Template\TwigExtension')->withoutFilter($this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($context["item"], "attributes", []), "addClass", [0 => ($context["classes"] ?? null)], "method")), "gva_icon", "gva_class", "gva_layout_columns", "gva_block", "gva_layout"), "html", null, true);
                    echo ">
        <a href=\"";
                    // line 63
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["item"], "url", [])), "html", null, true);
                    echo "\">
          ";
                    // line 64
                    if (($this->getAttribute($this->getAttribute($context["item"], "attributes", []), "gva_icon", []) != "")) {
                        // line 65
                        echo "            <i class=\"fa ";
                        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($context["item"], "attributes", []), "gva_icon", [])), "html", null, true);
                        echo "\"></i>
          ";
                    }
                    // line 67
                    echo "          ";
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["item"], "title", [])), "html", null, true);
                    echo "

          ";
                    // line 69
                    if (($this->getAttribute($context["item"], "below", []) || (($this->getAttribute($this->getAttribute($context["item"], "attributes", []), "gva_layout", []) == "menu-block") && (($context["menu_level"] ?? null) == 0)))) {
                        // line 70
                        echo "            <span class=\"icaret nav-plus fa fa-angle-down\"></span>
          ";
                    }
                    // line 71
                    echo "  
        </a>
        
        ";
                    // line 74
                    if ((($this->getAttribute($this->getAttribute($context["item"], "attributes", []), "gva_layout", []) == "menu-block") && (($context["menu_level"] ?? null) == 0))) {
                        // line 75
                        echo "          <div class=\"sub-menu\">
            ";
                        // line 76
                        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["item"], "gva_block_content", [])), "html", null, true);
                        echo "
          </div>
        ";
                    }
                    // line 78
                    echo "  

        ";
                    // line 80
                    if ($this->getAttribute($context["item"], "below", [])) {
                        // line 81
                        echo "          ";
                        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($context["menus"]->getmenu_links($this->getAttribute($context["item"], "below", []), ($context["attributes"] ?? null), (($context["menu_level"] ?? null) + 1)));
                        echo "
        ";
                    }
                    // line 83
                    echo "
      </li>
    ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['item'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 86
                echo "    </ul>
  ";
            }
        } catch (\Exception $e) {
            ob_end_clean();

            throw $e;
        } catch (\Throwable $e) {
            ob_end_clean();

            throw $e;
        }

        return ('' === $tmp = ob_get_clean()) ? '' : new Markup($tmp, $this->env->getCharset());
    }

    public function getTemplateName()
    {
        return "themes/gavias_monte/templates/navigation/menu--main.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  226 => 86,  218 => 83,  212 => 81,  210 => 80,  206 => 78,  200 => 76,  197 => 75,  195 => 74,  190 => 71,  186 => 70,  184 => 69,  178 => 67,  172 => 65,  170 => 64,  166 => 63,  162 => 62,  159 => 61,  157 => 58,  156 => 57,  155 => 56,  154 => 55,  153 => 54,  152 => 53,  151 => 51,  145 => 48,  143 => 47,  139 => 46,  135 => 45,  130 => 44,  127 => 43,  124 => 42,  122 => 41,  119 => 40,  114 => 39,  110 => 37,  104 => 35,  101 => 34,  98 => 33,  95 => 32,  81 => 31,  69 => 89,  64 => 29,  61 => 24,  59 => 23,  55 => 21,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("{#
/**
 * @file
 * Theme override to display a menu.
 *
 * Available variables:
 * - menu_name: The machine name of the menu.
 * - items: A nested list of menu items. Each menu item contains:
 *   - attributes: HTML attributes for the menu item.
 *   - below: The menu item child items.
 *   - title: The menu link title.
 *   - url: The menu link url, instance of \\Drupal\\Core\\Url
 *   - localized_options: Menu link localized options.
 *   - is_expanded: TRUE if the link has visible children within the current
 *     menu tree.
 *   - is_collapsed: TRUE if the link has children within the current menu tree
 *     that are not currently visible.
 *   - in_active_trail: TRUE if the link is in the active trail.
 */
#}

<div class=\"gva-navigation\">
{% import _self as menus %}

{#
  We call a macro which calls itself to render the full tree.
  @see http://twig.sensiolabs.org/doc/tags/macro.html
#}
{{ menus.menu_links(items, attributes, 0) }}

{% macro menu_links(items, attributes, menu_level) %}
  {% import _self as menus %}
  {% if items %}
    {% if menu_level == 0 %}
      <ul{{ attributes.addClass('gva_menu gva_menu_main') }}>
    {% else %}
      <ul class=\"menu sub-menu\">
    {% endif %}
    {% for item in items %}
      
      {% set class_mega_menu = '' %}
      {% set class_columns = '' %}
      {% if item.attributes.gva_layout == 'menu-block' and menu_level == 0 %}
        {% set class_mega_menu = 'gva-mega-menu mega-menu-block' %} 
      {% elseif item.attributes.gva_layout == 'menu-grid' and menu_level == 0 %}   
        {% set class_mega_menu = 'gva-mega-menu megamenu menu-grid' %} 
        {% set class_columns = ['menu-columns-', item.attributes.gva_layout_columns]|join('') %}
      {% endif %}    

      {%
        set classes = [
          'menu-item',
          item.is_expanded ? 'menu-item--expanded',
          item.is_collapsed ? 'menu-item--collapsed',
          item.in_active_trail ? 'menu-item--active-trail',
          item.attributes.gva_class,
          class_mega_menu,
          class_columns
        ]
      %}

      <li {{ item.attributes.addClass(classes)|without('gva_icon', 'gva_class', 'gva_layout_columns', 'gva_block', 'gva_layout') }}>
        <a href=\"{{ item.url }}\">
          {% if item.attributes.gva_icon != '' %}
            <i class=\"fa {{ item.attributes.gva_icon }}\"></i>
          {% endif %}
          {{ item.title }}

          {% if item.below or item.attributes.gva_layout == 'menu-block' and menu_level == 0 %}
            <span class=\"icaret nav-plus fa fa-angle-down\"></span>
          {% endif %}  
        </a>
        
        {% if item.attributes.gva_layout == 'menu-block' and menu_level == 0 %}
          <div class=\"sub-menu\">
            {{ item.gva_block_content }}
          </div>
        {% endif %}  

        {% if item.below %}
          {{ menus.menu_links(item.below, attributes, menu_level + 1) }}
        {% endif %}

      </li>
    {% endfor %}
    </ul>
  {% endif %}
{% endmacro %}

</div>


<div id=\"menu-bar\" class=\"menu-bar\">
  <span class=\"one\"></span>
  <span class=\"two\"></span>
  <span class=\"three\"></span>
</div>", "themes/gavias_monte/templates/navigation/menu--main.html.twig", "/var/www/html/drupal8/web/dnp2/themes/gavias_monte/templates/navigation/menu--main.html.twig");
    }
}
