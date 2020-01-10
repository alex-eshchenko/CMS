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

/* themes/gavias_monte/templates/views/slideshows/views-view-unformatted--slider-v3.html.twig */
class __TwigTemplate_e9da195f782a41ca4379bfcf3e57fc68e308d7cbdbe9bdb726563df413b78a58 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["set" => 3, "for" => 4, "if" => 6];
        $filters = ["escape" => 8, "length" => 20];
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
        echo "<div class=\"owl-carousel init-carousel-owl slidershow-v3\" data-items=\"2\">
   
   ";
        // line 3
        $context["i"] = 0;
        // line 4
        echo "   ";
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["rows"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["row"]) {
            // line 5
            echo "      ";
            $context["i"] = (($context["i"] ?? null) + 1);
            // line 6
            echo "      ";
            if (((($context["i"] ?? null) % 5) == 1)) {
                // line 7
                echo "         <div class=\"post-large carousel-item\">
            <div class=\"item content\">";
                // line 8
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["row"], "content", [])), "html", null, true);
                echo "</div>
         </div>
      ";
            } else {
                // line 11
                echo "         
         ";
                // line 12
                if (((($context["i"] ?? null) % 5) == 2)) {
                    // line 13
                    echo "            <div>
         ";
                }
                // line 14
                echo "   
         
            ";
                // line 16
                if ((((($context["i"] ?? null) % 5) == 2) || ((($context["i"] ?? null) % 5) == 4))) {
                    // line 17
                    echo "              <div class=\"post-small carousel-item\">
            ";
                }
                // line 19
                echo "               <div class=\"item content post-small-item\">";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["row"], "content", [])), "html", null, true);
                echo "</div>
            ";
                // line 20
                if (((((($context["i"] ?? null) % 5) == 3) || ((($context["i"] ?? null) % 5) == 0)) || (($context["i"] ?? null) == twig_length_filter($this->env, ($context["rows"] ?? null))))) {
                    // line 21
                    echo "               </div>
            ";
                }
                // line 22
                echo "   

         ";
                // line 24
                if ((((($context["i"] ?? null) % 5) == 0) || (($context["i"] ?? null) == twig_length_filter($this->env, ($context["rows"] ?? null))))) {
                    // line 25
                    echo "            </div>
         ";
                }
                // line 26
                echo "    
            
      ";
            }
            // line 28
            echo " 
   ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['row'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 29
        echo "   
</div>

";
    }

    public function getTemplateName()
    {
        return "themes/gavias_monte/templates/views/slideshows/views-view-unformatted--slider-v3.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  133 => 29,  126 => 28,  121 => 26,  117 => 25,  115 => 24,  111 => 22,  107 => 21,  105 => 20,  100 => 19,  96 => 17,  94 => 16,  90 => 14,  86 => 13,  84 => 12,  81 => 11,  75 => 8,  72 => 7,  69 => 6,  66 => 5,  61 => 4,  59 => 3,  55 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/gavias_monte/templates/views/slideshows/views-view-unformatted--slider-v3.html.twig", "/var/www/html/drupal8/web/dnp/themes/gavias_monte/templates/views/slideshows/views-view-unformatted--slider-v3.html.twig");
    }
}
