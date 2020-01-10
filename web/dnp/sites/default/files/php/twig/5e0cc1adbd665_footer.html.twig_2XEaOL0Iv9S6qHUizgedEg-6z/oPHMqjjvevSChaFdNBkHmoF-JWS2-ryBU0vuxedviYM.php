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

/* themes/gavias_monte/templates/page/footer.html.twig */
class __TwigTemplate_38b50137c4b693f8164385d05627756e4113d47a7fb5a0aeda6f700284e25be8 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["if" => 3, "set" => 20];
        $filters = ["escape" => 9];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['if', 'set'],
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
        // line 1
        echo "<footer id=\"footer\" class=\"footer\">
  
  ";
        // line 3
        if ($this->getAttribute(($context["page"] ?? null), "before_footer", [])) {
            // line 4
            echo "   <div class=\"footer-top\">
      <div class=\"container\">
        <div class=\"row\">
          <div class=\"col-xs-12\">
            <div class=\"before_footer area\">
                ";
            // line 9
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "before_footer", [])), "html", null, true);
            echo "
            </div>
          </div>
        </div>     
      </div>   
    </div> 
   ";
        }
        // line 16
        echo "   
   <div class=\"footer-center\">
      <div class=\"container\">      
         <div class=\"row\">
            ";
        // line 20
        $context["footer_count"] = 0;
        // line 21
        echo "              
              ";
        // line 22
        if ($this->getAttribute(($context["page"] ?? null), "footer_first", [])) {
            // line 23
            echo "                ";
            $context["footer_count"] = (($context["footer_count"] ?? null) + 1);
            // line 24
            echo "              ";
        }
        echo "  
              
              ";
        // line 26
        if ($this->getAttribute(($context["page"] ?? null), "footer_second", [])) {
            // line 27
            echo "                ";
            $context["footer_count"] = (($context["footer_count"] ?? null) + 1);
            // line 28
            echo "              ";
        }
        echo "  
              
              ";
        // line 30
        if ($this->getAttribute(($context["page"] ?? null), "footer_third", [])) {
            // line 31
            echo "                ";
            $context["footer_count"] = (($context["footer_count"] ?? null) + 1);
            // line 32
            echo "              ";
        }
        echo "  
              
              ";
        // line 34
        if ($this->getAttribute(($context["page"] ?? null), "footer_four", [])) {
            // line 35
            echo "                ";
            $context["footer_count"] = (($context["footer_count"] ?? null) + 1);
            // line 36
            echo "              ";
        }
        echo "   

              ";
        // line 38
        $context["col_class"] = "footer-1col col-lg-12 col-md-12 col-md-12 col-xs-12";
        // line 39
        echo "
              ";
        // line 40
        if ((($context["footer_count"] ?? null) == 2)) {
            // line 41
            echo "                  ";
            $context["col_class"] = "footer-2col col-lg-6 col-md-6 col-md-6 col-xs-12";
            // line 42
            echo "              ";
        } elseif ((($context["footer_count"] ?? null) == 3)) {
            echo "  
                  ";
            // line 43
            $context["col_class"] = "footer-3col col-lg-4 col-md-4 col-md-1 col-xs-12";
            // line 44
            echo "              ";
        } elseif ((($context["footer_count"] ?? null) == 4)) {
            // line 45
            echo "                   ";
            $context["col_class"] = "footer-4col col-lg-3 col-md-3 col-md-6 col-xs-12";
            // line 46
            echo "              ";
        }
        // line 47
        echo "              
              ";
        // line 48
        if ($this->getAttribute(($context["page"] ?? null), "footer_first", [])) {
            // line 49
            echo "                <div class=\"";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["col_class"] ?? null)), "html", null, true);
            echo " column\">
                  ";
            // line 50
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "footer_first", [])), "html", null, true);
            echo "
                </div> 
              ";
        }
        // line 53
        echo "
              ";
        // line 54
        if ($this->getAttribute(($context["page"] ?? null), "footer_second", [])) {
            // line 55
            echo "                <div class=\"";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["col_class"] ?? null)), "html", null, true);
            echo " column\">
                  ";
            // line 56
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "footer_second", [])), "html", null, true);
            echo "
                </div> 
              ";
        }
        // line 59
        echo "
              ";
        // line 60
        if ($this->getAttribute(($context["page"] ?? null), "footer_third", [])) {
            // line 61
            echo "                <div class=\"";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["col_class"] ?? null)), "html", null, true);
            echo " column\">
                  ";
            // line 62
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "footer_third", [])), "html", null, true);
            echo "
                </div> 
              ";
        }
        // line 65
        echo "
              ";
        // line 66
        if ($this->getAttribute(($context["page"] ?? null), "footer_four", [])) {
            // line 67
            echo "                <div class=\"";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["col_class"] ?? null)), "html", null, true);
            echo " column\">
                  ";
            // line 68
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "footer_four", [])), "html", null, true);
            echo "
                </div> 
              ";
        }
        // line 71
        echo "         </div>   
      </div>
   </div>   

   ";
        // line 75
        if ($this->getAttribute(($context["page"] ?? null), "copyright", [])) {
            // line 76
            echo "   <div class=\"copyright\">
      <div class=\"container\">
        <div class=\"copyright-inner\">
            ";
            // line 79
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "copyright", [])), "html", null, true);
            echo "
        </div>   
      </div>   
   </div>
 ";
        }
        // line 84
        echo "
</footer>

";
    }

    public function getTemplateName()
    {
        return "themes/gavias_monte/templates/page/footer.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  244 => 84,  236 => 79,  231 => 76,  229 => 75,  223 => 71,  217 => 68,  212 => 67,  210 => 66,  207 => 65,  201 => 62,  196 => 61,  194 => 60,  191 => 59,  185 => 56,  180 => 55,  178 => 54,  175 => 53,  169 => 50,  164 => 49,  162 => 48,  159 => 47,  156 => 46,  153 => 45,  150 => 44,  148 => 43,  143 => 42,  140 => 41,  138 => 40,  135 => 39,  133 => 38,  127 => 36,  124 => 35,  122 => 34,  116 => 32,  113 => 31,  111 => 30,  105 => 28,  102 => 27,  100 => 26,  94 => 24,  91 => 23,  89 => 22,  86 => 21,  84 => 20,  78 => 16,  68 => 9,  61 => 4,  59 => 3,  55 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/gavias_monte/templates/page/footer.html.twig", "/var/www/html/drupal8/web/dnp/themes/gavias_monte/templates/page/footer.html.twig");
    }
}
