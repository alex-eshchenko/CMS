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

/* __string_template__7ee48abf12ea8ef5bd5f8b46c27f13b6175a773b6162f14ce15d1332ca9cf814 */
class __TwigTemplate_72f512351a3a9ed6dcc67f1b8e30e7977824e4a0c36ede5d4d4e6c6bbc5d82c1 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = [];
        $filters = ["escape" => 4];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                [],
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
        echo "<div class=\"gallery-post gavias-slide-bottom\">
   <div class=\"post-inner\">
\t  <div class=\"image\">
\t\t\t";
        // line 4
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["field_gallery_thumbnail"] ?? null)), "html", null, true);
        echo "
\t  </div>
\t  <div class=\"post-meta-wrap  caption-title\">
\t\t <div class=\"post-title\">
\t\t\t";
        // line 8
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title"] ?? null)), "html", null, true);
        echo "
\t\t </div>
\t  </div>
   </div>
</div>
";
    }

    public function getTemplateName()
    {
        return "__string_template__7ee48abf12ea8ef5bd5f8b46c27f13b6175a773b6162f14ce15d1332ca9cf814";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  67 => 8,  60 => 4,  55 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("{# inline_template_start #}<div class=\"gallery-post gavias-slide-bottom\">
   <div class=\"post-inner\">
\t  <div class=\"image\">
\t\t\t{{ field_gallery_thumbnail}}
\t  </div>
\t  <div class=\"post-meta-wrap  caption-title\">
\t\t <div class=\"post-title\">
\t\t\t{{ title}}
\t\t </div>
\t  </div>
   </div>
</div>
", "__string_template__7ee48abf12ea8ef5bd5f8b46c27f13b6175a773b6162f14ce15d1332ca9cf814", "");
    }
}
