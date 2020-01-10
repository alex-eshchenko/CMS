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

/* themes/gavias_monte/templates/views/video/views-view-unformatted--featured-videos.html.twig */
class __TwigTemplate_9fe015e7b098498faeb226723655a8f39f6ce4765b586434ebb708957375ccb7 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["set" => 1, "for" => 3, "if" => 7];
        $filters = ["escape" => 8, "length" => 17];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'for', 'if'],
                ['escape', 'length'],
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
        // line 1
        $context["i"] = 0;
        // line 2
        echo "<div class=\"view-featured-videos owl-carousel init-carousel-owl\" data-items='3'>
   ";
        // line 3
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["rows"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["row"]) {
            // line 4
            echo "
      ";
            // line 5
            $context["i"] = (($context["i"] ?? null) + 1);
            // line 6
            echo "
      ";
            // line 7
            if (((($context["i"] ?? null) % 3) == 1)) {
                // line 8
                echo "         <div class=\"item large-video\"> ";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["row"], "content", [])), "html", null, true);
                echo " </div>
      ";
            } else {
                // line 10
                echo "            
         ";
                // line 11
                if (((($context["i"] ?? null) % 3) == 2)) {
                    echo " 
            <div class=\"item small-videos\">
         ";
                }
                // line 13
                echo "      
            
            <div class=\"item-video\">";
                // line 15
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["row"], "content", [])), "html", null, true);
                echo "</div>

         ";
                // line 17
                if ((((($context["i"] ?? null) % 3) == 0) || (($context["i"] ?? null) == twig_length_filter($this->env, ($context["rows"] ?? null))))) {
                    // line 18
                    echo "            </div>
         ";
                }
                // line 20
                echo "
      ";
            }
            // line 21
            echo "   

   ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['row'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 24
        echo "</div>
";
    }

    public function getTemplateName()
    {
        return "themes/gavias_monte/templates/views/video/views-view-unformatted--featured-videos.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  116 => 24,  108 => 21,  104 => 20,  100 => 18,  98 => 17,  93 => 15,  89 => 13,  83 => 11,  80 => 10,  74 => 8,  72 => 7,  69 => 6,  67 => 5,  64 => 4,  60 => 3,  57 => 2,  55 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/gavias_monte/templates/views/video/views-view-unformatted--featured-videos.html.twig", "/var/www/html/drupal8/web/dnp/themes/gavias_monte/templates/views/video/views-view-unformatted--featured-videos.html.twig");
    }
}
