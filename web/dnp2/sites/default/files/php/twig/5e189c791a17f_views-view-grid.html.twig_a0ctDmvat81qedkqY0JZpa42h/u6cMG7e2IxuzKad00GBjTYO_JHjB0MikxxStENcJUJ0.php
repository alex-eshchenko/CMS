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

/* themes/gavias_monte/templates/views/views-view-grid.html.twig */
class __TwigTemplate_fe41c7c96a58a80a49d4354f68e40510910987da20f14b49f0b87beac278837b extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["set" => 30, "if" => 39, "for" => 74];
        $filters = ["escape" => 70];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if', 'for'],
                ['escape'],
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
        // line 30
        $context["classes"] = [0 => "views-view-grid", 1 => $this->getAttribute(        // line 32
($context["gva_masonry"] ?? null), "class", []), 2 => $this->getAttribute(        // line 33
($context["options"] ?? null), "alignment", []), 3 => ("cols-" . $this->sandbox->ensureToStringAllowed($this->getAttribute(        // line 34
($context["options"] ?? null), "columns", []))), 4 => "clearfix"];
        // line 38
        echo "
  ";
        // line 39
        if (($this->getAttribute(($context["options"] ?? null), "columns", []) == "1")) {
            // line 40
            echo "    ";
            $context["xclass"] = [0 => "col-lg-12 col-md-12 col-sm-12 col-xs-12"];
            // line 41
            echo "  ";
        } elseif (($this->getAttribute(($context["options"] ?? null), "columns", []) == "2")) {
            // line 42
            echo "    ";
            $context["xclass"] = [0 => "col-lg-6 col-md-6 col-sm-6 col-xs-12"];
            // line 43
            echo "  ";
        } elseif (($this->getAttribute(($context["options"] ?? null), "columns", []) == "3")) {
            // line 44
            echo "    ";
            $context["xclass"] = [0 => "col-lg-4 col-md-4 col-sm-4 col-xs-12"];
            // line 45
            echo "  ";
        } elseif (($this->getAttribute(($context["options"] ?? null), "columns", []) == "4")) {
            // line 46
            echo "    ";
            $context["xclass"] = [0 => "col-lg-3 col-md-3 col-sm-6 col-xs-12"];
            // line 47
            echo "  ";
        } elseif (($this->getAttribute(($context["options"] ?? null), "columns", []) == "6")) {
            // line 48
            echo "    ";
            $context["xclass"] = [0 => "col-lg-2 col-md-2 col-sm-6 col-xs-12"];
            // line 49
            echo "  ";
        } else {
            // line 50
            echo "    ";
            $context["xclass"] = [0 => "col-lg-4 col-md-4 col-sm-4 col-xs-12"];
            // line 51
            echo "  ";
        }
        echo "    

";
        // line 53
        if ($this->getAttribute(($context["options"] ?? null), "row_class_default", [])) {
            // line 54
            echo "  ";
            // line 55
            $context["row_classes"] = [0 => "views-row row", 1 => ((($this->getAttribute(            // line 57
($context["options"] ?? null), "alignment", []) == "horizontal")) ? ("clearfix") : (""))];
        }
        // line 61
        if ($this->getAttribute(($context["options"] ?? null), "col_class_default", [])) {
            // line 62
            echo "  ";
            // line 63
            $context["col_classes"] = [0 => "views-col", 1 => ((($this->getAttribute(            // line 65
($context["options"] ?? null), "alignment", []) == "vertical")) ? ("clearfix") : (""))];
        }
        // line 69
        if (($context["title"] ?? null)) {
            // line 70
            echo "  <h3>";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title"] ?? null)), "html", null, true);
            echo "</h3>
";
        }
        // line 72
        echo "<div";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["attributes"] ?? null), "addClass", [0 => ($context["classes"] ?? null)], "method")), "html", null, true);
        echo ">
  ";
        // line 73
        if (($this->getAttribute(($context["options"] ?? null), "alignment", []) == "horizontal")) {
            // line 74
            echo "    ";
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable(($context["items"] ?? null));
            $context['loop'] = [
              'parent' => $context['_parent'],
              'index0' => 0,
              'index'  => 1,
              'first'  => true,
            ];
            if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof \Countable)) {
                $length = count($context['_seq']);
                $context['loop']['revindex0'] = $length - 1;
                $context['loop']['revindex'] = $length;
                $context['loop']['length'] = $length;
                $context['loop']['last'] = 1 === $length;
            }
            foreach ($context['_seq'] as $context["_key"] => $context["row"]) {
                // line 75
                echo "      
      ";
                // line 76
                if (($this->getAttribute(($context["gva_masonry"] ?? null), "class", []) == "")) {
                    // line 77
                    echo "        <div";
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($context["row"], "attributes", []), "addClass", [0 => ($context["row_classes"] ?? null), 1 => (($this->getAttribute(($context["options"] ?? null), "row_class_default", [])) ? (("row-" . $this->sandbox->ensureToStringAllowed($this->getAttribute($context["loop"], "index", [])))) : (""))], "method")), "html", null, true);
                    echo ">
      ";
                }
                // line 78
                echo "  

        ";
                // line 80
                $context['_parent'] = $context;
                $context['_seq'] = twig_ensure_traversable($this->getAttribute($context["row"], "content", []));
                $context['loop'] = [
                  'parent' => $context['_parent'],
                  'index0' => 0,
                  'index'  => 1,
                  'first'  => true,
                ];
                if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof \Countable)) {
                    $length = count($context['_seq']);
                    $context['loop']['revindex0'] = $length - 1;
                    $context['loop']['revindex'] = $length;
                    $context['loop']['length'] = $length;
                    $context['loop']['last'] = 1 === $length;
                }
                foreach ($context['_seq'] as $context["_key"] => $context["column"]) {
                    // line 81
                    echo "          <div";
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($context["column"], "attributes", []), "addClass", [0 => ($context["col_classes"] ?? null), 1 => (($this->getAttribute(($context["options"] ?? null), "col_class_default", [])) ? (("col-" . $this->sandbox->ensureToStringAllowed($this->getAttribute($context["loop"], "index", [])))) : ("")), 2 => ($context["xclass"] ?? null), 3 => $this->getAttribute(($context["gva_masonry"] ?? null), "class_item", [])], "method")), "html", null, true);
                    echo ">
            ";
                    // line 82
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["column"], "content", [])), "html", null, true);
                    echo "
          </div>
        ";
                    ++$context['loop']['index0'];
                    ++$context['loop']['index'];
                    $context['loop']['first'] = false;
                    if (isset($context['loop']['length'])) {
                        --$context['loop']['revindex0'];
                        --$context['loop']['revindex'];
                        $context['loop']['last'] = 0 === $context['loop']['revindex0'];
                    }
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['column'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 85
                echo "      
      ";
                // line 86
                if (($this->getAttribute(($context["gva_masonry"] ?? null), "class", []) == "")) {
                    // line 87
                    echo "        </div>
      ";
                }
                // line 88
                echo "  

    ";
                ++$context['loop']['index0'];
                ++$context['loop']['index'];
                $context['loop']['first'] = false;
                if (isset($context['loop']['length'])) {
                    --$context['loop']['revindex0'];
                    --$context['loop']['revindex'];
                    $context['loop']['last'] = 0 === $context['loop']['revindex0'];
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['row'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 91
            echo "  ";
        } else {
            // line 92
            echo "    ";
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable(($context["items"] ?? null));
            $context['loop'] = [
              'parent' => $context['_parent'],
              'index0' => 0,
              'index'  => 1,
              'first'  => true,
            ];
            if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof \Countable)) {
                $length = count($context['_seq']);
                $context['loop']['revindex0'] = $length - 1;
                $context['loop']['revindex'] = $length;
                $context['loop']['length'] = $length;
                $context['loop']['last'] = 1 === $length;
            }
            foreach ($context['_seq'] as $context["_key"] => $context["column"]) {
                // line 93
                echo "      <div";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($context["column"], "attributes", []), "addClass", [0 => ($context["col_classes"] ?? null), 1 => (($this->getAttribute(($context["options"] ?? null), "col_class_default", [])) ? (("col-" . $this->sandbox->ensureToStringAllowed($this->getAttribute($context["loop"], "index", [])))) : ("")), 2 => ($context["xclass"] ?? null)], "method")), "html", null, true);
                echo ">
        ";
                // line 94
                $context['_parent'] = $context;
                $context['_seq'] = twig_ensure_traversable($this->getAttribute($context["column"], "content", []));
                $context['loop'] = [
                  'parent' => $context['_parent'],
                  'index0' => 0,
                  'index'  => 1,
                  'first'  => true,
                ];
                if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof \Countable)) {
                    $length = count($context['_seq']);
                    $context['loop']['revindex0'] = $length - 1;
                    $context['loop']['revindex'] = $length;
                    $context['loop']['length'] = $length;
                    $context['loop']['last'] = 1 === $length;
                }
                foreach ($context['_seq'] as $context["_key"] => $context["row"]) {
                    // line 95
                    echo "          <div";
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($context["row"], "attributes", []), "addClass", [0 => ($context["row_classes"] ?? null), 1 => (($this->getAttribute(($context["options"] ?? null), "row_class_default", [])) ? (("row-" . $this->sandbox->ensureToStringAllowed($this->getAttribute($context["loop"], "index", [])))) : (""))], "method")), "html", null, true);
                    echo ">
            ";
                    // line 96
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["row"], "content", [])), "html", null, true);
                    echo "
          </div>
        ";
                    ++$context['loop']['index0'];
                    ++$context['loop']['index'];
                    $context['loop']['first'] = false;
                    if (isset($context['loop']['length'])) {
                        --$context['loop']['revindex0'];
                        --$context['loop']['revindex'];
                        $context['loop']['last'] = 0 === $context['loop']['revindex0'];
                    }
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['row'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 99
                echo "      </div>
    ";
                ++$context['loop']['index0'];
                ++$context['loop']['index'];
                $context['loop']['first'] = false;
                if (isset($context['loop']['length'])) {
                    --$context['loop']['revindex0'];
                    --$context['loop']['revindex'];
                    $context['loop']['last'] = 0 === $context['loop']['revindex0'];
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['column'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 101
            echo "  ";
        }
        // line 102
        echo "</div>
";
    }

    public function getTemplateName()
    {
        return "themes/gavias_monte/templates/views/views-view-grid.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  315 => 102,  312 => 101,  297 => 99,  280 => 96,  275 => 95,  258 => 94,  253 => 93,  235 => 92,  232 => 91,  216 => 88,  212 => 87,  210 => 86,  207 => 85,  190 => 82,  185 => 81,  168 => 80,  164 => 78,  158 => 77,  156 => 76,  153 => 75,  135 => 74,  133 => 73,  128 => 72,  122 => 70,  120 => 69,  117 => 65,  116 => 63,  114 => 62,  112 => 61,  109 => 57,  108 => 55,  106 => 54,  104 => 53,  98 => 51,  95 => 50,  92 => 49,  89 => 48,  86 => 47,  83 => 46,  80 => 45,  77 => 44,  74 => 43,  71 => 42,  68 => 41,  65 => 40,  63 => 39,  60 => 38,  58 => 34,  57 => 33,  56 => 32,  55 => 30,);
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
 * Default theme implementation for views to display rows in a grid.
 *
 * Available variables:
 * - attributes: HTML attributes for the wrapping element.
 * - title: The title of this group of rows.
 * - view: The view object.
 * - rows: The rendered view results.
 * - options: The view plugin style options.
 *   - row_class_default: A flag indicating whether default classes should be
 *     used on rows.
 *   - col_class_default: A flag indicating whether default classes should be
 *     used on columns.
 * - items: A list of grid items. Each item contains a list of rows or columns.
 *   The order in what comes first (row or column) depends on which alignment
 *   type is chosen (horizontal or vertical).
 *   - attributes: HTML attributes for each row or column.
 *   - content: A list of columns or rows. Each row or column contains:
 *     - attributes: HTML attributes for each row or column.
 *     - content: The row or column contents.
 *
 * @see template_preprocess_views_view_grid()
 *
 * @ingroup themeable
 */
#}
{%
  set classes = [
    'views-view-grid',
    gva_masonry.class,
    options.alignment,
    'cols-' ~ options.columns,
    'clearfix',
  ]
%}

  {% if options.columns == '1' %}
    {% set xclass = ['col-lg-12 col-md-12 col-sm-12 col-xs-12'] %}
  {% elseif options.columns == '2' %}
    {% set xclass = ['col-lg-6 col-md-6 col-sm-6 col-xs-12'] %}
  {% elseif options.columns == '3' %}
    {% set xclass = ['col-lg-4 col-md-4 col-sm-4 col-xs-12'] %}
  {% elseif options.columns == '4' %}
    {% set xclass = ['col-lg-3 col-md-3 col-sm-6 col-xs-12'] %}
  {% elseif options.columns == '6' %}
    {% set xclass = ['col-lg-2 col-md-2 col-sm-6 col-xs-12'] %}
  {% else %}
    {% set xclass = ['col-lg-4 col-md-4 col-sm-4 col-xs-12'] %}
  {% endif %}    

{% if options.row_class_default %}
  {%
    set row_classes = [
      'views-row row',
      options.alignment == 'horizontal' ? 'clearfix',
    ]
  %}
{% endif %}
{% if options.col_class_default %}
  {%
    set col_classes = [
      'views-col',
      options.alignment == 'vertical' ? 'clearfix',
    ]
  %}
{% endif %}
{% if title %}
  <h3>{{ title }}</h3>
{% endif %}
<div{{ attributes.addClass(classes) }}>
  {% if options.alignment == 'horizontal' %}
    {% for row in items %}
      
      {% if gva_masonry.class == '' %}
        <div{{ row.attributes.addClass(row_classes, options.row_class_default ? 'row-' ~ loop.index) }}>
      {% endif %}  

        {% for column in row.content %}
          <div{{ column.attributes.addClass(col_classes, options.col_class_default ? 'col-' ~ loop.index, xclass, gva_masonry.class_item) }}>
            {{ column.content }}
          </div>
        {% endfor %}
      
      {% if gva_masonry.class == '' %}
        </div>
      {% endif %}  

    {% endfor %}
  {% else %}
    {% for column in items %}
      <div{{ column.attributes.addClass(col_classes, options.col_class_default ? 'col-' ~ loop.index, xclass) }}>
        {% for row in column.content %}
          <div{{ row.attributes.addClass(row_classes, options.row_class_default ? 'row-' ~ loop.index) }}>
            {{ row.content }}
          </div>
        {% endfor %}
      </div>
    {% endfor %}
  {% endif %}
</div>
", "themes/gavias_monte/templates/views/views-view-grid.html.twig", "/var/www/html/drupal8/web/dnp2/themes/gavias_monte/templates/views/views-view-grid.html.twig");
    }
}
