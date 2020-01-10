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

/* themes/gavias_monte/templates/views/views-view-unformatted--taxonomy-term.html.twig */
class __TwigTemplate_d661c64bb74ffa746d91c8d501479899c36a2249864f3c048fbb9be0e384d2e0 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["if" => 20, "set" => 24, "for" => 31];
        $filters = ["escape" => 21, "length" => 49];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['if', 'set', 'for'],
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
        // line 20
        if (($context["title"] ?? null)) {
            // line 21
            echo "  <h3>";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title"] ?? null)), "html", null, true);
            echo "</h3>
";
        }
        // line 23
        echo "
";
        // line 24
        $context["i"] = 0;
        // line 25
        echo "<div class=\"categories-view-content view-content-wrap layout-";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["gva_layout"] ?? null)), "html", null, true);
        echo "\">
  
  ";
        // line 27
        if ((($context["gva_layout"] ?? null) == "masonry")) {
            // line 28
            echo "    <div class=\"post-masonry-style row\">
  ";
        }
        // line 29
        echo "  

    ";
        // line 31
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["rows"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["row"]) {
            // line 32
            echo "      
      ";
            // line 33
            $context["i"] = (($context["i"] ?? null) + 1);
            // line 34
            echo "       ";
            // line 35
            $context["row_classes"] = [0 => ((            // line 36
($context["default_row_class"] ?? null)) ? ("item") : ("")), 1 =>             // line 37
($context["gva_item_class"] ?? null)];
            // line 40
            echo "
      ";
            // line 41
            if (((($context["gva_layout"] ?? null) == "grid") && ((($context["i"] ?? null) % ($context["gva_columns"] ?? null)) == 1))) {
                echo " 
        <div class=\"row\">
      ";
            }
            // line 43
            echo " 
      
        <div";
            // line 45
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($context["row"], "attributes", []), "addClass", [0 => ($context["row_classes"] ?? null)], "method")), "html", null, true);
            echo ">
          ";
            // line 46
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["row"], "content", [])), "html", null, true);
            echo "
        </div>
     
      ";
            // line 49
            if (((($context["gva_layout"] ?? null) == "grid") && (((($context["i"] ?? null) % ($context["gva_columns"] ?? null)) == 0) || (($context["i"] ?? null) == twig_length_filter($this->env, ($context["rows"] ?? null)))))) {
                echo " 
        </div>
      ";
            }
            // line 51
            echo " 

    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['row'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 54
        echo "
  ";
        // line 55
        if ((($context["gva_layout"] ?? null) == "masonry")) {
            // line 56
            echo "    </div>
  ";
        }
        // line 57
        echo " 
   
</div>
";
    }

    public function getTemplateName()
    {
        return "themes/gavias_monte/templates/views/views-view-unformatted--taxonomy-term.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  145 => 57,  141 => 56,  139 => 55,  136 => 54,  128 => 51,  122 => 49,  116 => 46,  112 => 45,  108 => 43,  102 => 41,  99 => 40,  97 => 37,  96 => 36,  95 => 35,  93 => 34,  91 => 33,  88 => 32,  84 => 31,  80 => 29,  76 => 28,  74 => 27,  68 => 25,  66 => 24,  63 => 23,  57 => 21,  55 => 20,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/gavias_monte/templates/views/views-view-unformatted--taxonomy-term.html.twig", "/var/www/html/drupal8/web/dnp/themes/gavias_monte/templates/views/views-view-unformatted--taxonomy-term.html.twig");
    }
}
