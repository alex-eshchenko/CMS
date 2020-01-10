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

/* core/modules/responsive_image/templates/responsive-image.html.twig */
class __TwigTemplate_114d0698f65cd5e70ee6353bffe90819917e2b441808b61e0f906d1108689bec extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["if" => 18, "for" => 28];
        $filters = ["escape" => 19];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['if', 'for'],
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
        // line 18
        if (($context["output_image_tag"] ?? null)) {
            // line 19
            echo "  ";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["img_element"] ?? null)), "html", null, true);
            echo "
";
        } else {
            // line 21
            echo "  <picture>
    ";
            // line 22
            if (($context["sources"] ?? null)) {
                // line 23
                echo "      ";
                // line 27
                echo "      <!--[if IE 9]><video style=\"display: none;\"><![endif]-->
      ";
                // line 28
                $context['_parent'] = $context;
                $context['_seq'] = twig_ensure_traversable(($context["sources"] ?? null));
                foreach ($context['_seq'] as $context["_key"] => $context["source_attributes"]) {
                    // line 29
                    echo "        <source";
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($context["source_attributes"]), "html", null, true);
                    echo "/>
      ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['source_attributes'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 31
                echo "      <!--[if IE 9]></video><![endif]-->
    ";
            }
            // line 33
            echo "    ";
            // line 34
            echo "    ";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["img_element"] ?? null)), "html", null, true);
            echo "
  </picture>
";
        }
    }

    public function getTemplateName()
    {
        return "core/modules/responsive_image/templates/responsive-image.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  92 => 34,  90 => 33,  86 => 31,  77 => 29,  73 => 28,  70 => 27,  68 => 23,  66 => 22,  63 => 21,  57 => 19,  55 => 18,);
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
 * Default theme implementation of a responsive image.
 *
 * Available variables:
 * - sources: The attributes of the <source> tags for this <picture> tag.
 * - img_element: The controlling image, with the fallback image in srcset.
 * - output_image_tag: Whether or not to output an <img> tag instead of a
 *   <picture> tag.
 *
 * @see template_preprocess()
 * @see template_preprocess_responsive_image()
 *
 * @ingroup themeable
 */
#}
{% if output_image_tag %}
  {{ img_element }}
{% else %}
  <picture>
    {% if sources %}
      {#
      Internet Explorer 9 doesn't recognise source elements that are wrapped in
      picture tags. See http://scottjehl.github.io/picturefill/#ie9
      #}
      <!--[if IE 9]><video style=\"display: none;\"><![endif]-->
      {% for source_attributes in sources %}
        <source{{ source_attributes }}/>
      {% endfor %}
      <!--[if IE 9]></video><![endif]-->
    {% endif %}
    {# The controlling image, with the fallback image in srcset. #}
    {{ img_element }}
  </picture>
{% endif %}
", "core/modules/responsive_image/templates/responsive-image.html.twig", "/var/www/html/drupal8/web/dnp2/core/modules/responsive_image/templates/responsive-image.html.twig");
    }
}
