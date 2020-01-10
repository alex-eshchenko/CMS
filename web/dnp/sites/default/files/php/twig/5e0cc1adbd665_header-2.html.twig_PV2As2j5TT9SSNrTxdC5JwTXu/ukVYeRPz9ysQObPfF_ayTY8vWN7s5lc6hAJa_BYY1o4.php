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

/* themes/gavias_monte/templates/page/header-2.html.twig */
class __TwigTemplate_21299b16d6f467e4a1083c2443530426055c9dd85cbc55e13befa4ed2f5e6743 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["if" => 4];
        $filters = ["escape" => 6];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['if'],
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
        echo "<header id=\"header\" class=\"header-v2\">
  
  <div class=\"topbar\">
    ";
        // line 4
        if ($this->getAttribute(($context["page"] ?? null), "topbar", [])) {
            // line 5
            echo "        <div class=\"topbar\">
          ";
            // line 6
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "topbar", [])), "html", null, true);
            echo "
        </div>
    ";
        }
        // line 9
        echo "  </div>

   <div class=\"header-main\">
      <div class=\"container\">
         <div class=\"header-main-inner\">
            <div class=\"row\">
               <div class=\"col-lg-3 col-md-3 col-sm-12 col-xs-12 block-logo\">
               ";
        // line 16
        if ($this->getAttribute(($context["page"] ?? null), "branding", [])) {
            // line 17
            echo "                  ";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "branding", [])), "html", null, true);
            echo "
               ";
        }
        // line 19
        echo "               </div>

               <div class=\"col-lg-9 col-md-9 col-sm-12 col-xs-12 header-right\">
                  ";
        // line 22
        if ($this->getAttribute(($context["page"] ?? null), "header_right", [])) {
            // line 23
            echo "                     <div class=\"header-right-inner\">
                        ";
            // line 24
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "header_right", [])), "html", null, true);
            echo "
                     </div>
                   ";
        }
        // line 27
        echo "               </div>
            </div>
         </div>
      </div>
   </div>

    <div class=\"header-bottom\">
      <div class=\"main-menu ";
        // line 34
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["sticky_menu"] ?? null)), "html", null, true);
        echo "\">
          <div class=\"container\">
             <div class=\"row\">
                <div class=\"col-xs-12 area-main-menu\">
                  <div class=\"area-inner\">
                    ";
        // line 39
        if ($this->getAttribute(($context["page"] ?? null), "main_menu", [])) {
            // line 40
            echo "                      ";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "main_menu", [])), "html", null, true);
            echo "
                    ";
        }
        // line 41
        echo "  
                    ";
        // line 42
        if ($this->getAttribute(($context["page"] ?? null), "search", [])) {
            // line 43
            echo "                      <div class=\"gva-search-region search-region\">
                        <span class=\"icon\"><i class=\"fa fa-search\"></i></span>
                        <div class=\"search-content\">  
                          ";
            // line 46
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "search", [])), "html", null, true);
            echo "
                        </div>  
                      </div>
                    ";
        }
        // line 50
        echo "                  </div>   
                </div>
             </div>
          </div>
       </div>

      ";
        // line 56
        if ($this->getAttribute(($context["page"] ?? null), "breaking_news", [])) {
            // line 57
            echo "        <div class=\"breaking-news\">
          <div class=\"container\">
            <div class=\"content-inner clearfix\">
              <div class=\"title\">
                 Breaking news
              </div>
              <div class=\"content\">";
            // line 63
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "breaking_news", [])), "html", null, true);
            echo "</div> 
            </div>   
          </div>
        </div>
      ";
        }
        // line 68
        echo "      
    </div>  

</header>
";
    }

    public function getTemplateName()
    {
        return "themes/gavias_monte/templates/page/header-2.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  172 => 68,  164 => 63,  156 => 57,  154 => 56,  146 => 50,  139 => 46,  134 => 43,  132 => 42,  129 => 41,  123 => 40,  121 => 39,  113 => 34,  104 => 27,  98 => 24,  95 => 23,  93 => 22,  88 => 19,  82 => 17,  80 => 16,  71 => 9,  65 => 6,  62 => 5,  60 => 4,  55 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/gavias_monte/templates/page/header-2.html.twig", "/var/www/html/drupal8/web/dnp/themes/gavias_monte/templates/page/header-2.html.twig");
    }
}
