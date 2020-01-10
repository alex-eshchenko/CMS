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

/* themes/gavias_monte/templates/page/page.html.twig */
class __TwigTemplate_05dbc935a855214369caf9a8d177dc9856812c287e280cb0ce0951844ee7a2d6 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["include" => 8, "if" => 10, "set" => 34];
        $filters = ["escape" => 14];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['include', 'if', 'set'],
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
        // line 7
        echo "<div class=\"body-page\">
   ";
        // line 8
        $this->loadTemplate((($context["directory"] ?? null) . ($context["header_skin"] ?? null)), "themes/gavias_monte/templates/page/page.html.twig", 8)->display($context);
        // line 9
        echo "\t
   ";
        // line 10
        if ($this->getAttribute(($context["page"] ?? null), "breadcrumbs", [])) {
            // line 11
            echo "\t\t<div class=\"breadcrumbs\">
\t\t\t<div class=\"container\">
\t\t\t\t<div class=\"content-inner\">
\t\t\t\t\t";
            // line 14
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "breadcrumbs", [])), "html", null, true);
            echo "
\t\t\t\t</div>\t
\t\t\t</div> 
\t\t</div>
\t";
        }
        // line 19
        echo "\t
\t";
        // line 20
        if ($this->getAttribute(($context["page"] ?? null), "help", [])) {
            // line 21
            echo "\t\t<div class=\"help\">
\t\t\t<div class=\"container\">
\t\t\t\t<div class=\"content-inner\">
\t\t\t\t\t";
            // line 24
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "help", [])), "html", null, true);
            echo "
\t\t\t\t</div>
\t\t\t</div>
\t\t</div>
\t";
        }
        // line 29
        echo "
\t<div role=\"main\" class=\"main main-page\">

\t\t";
        // line 32
        if ((($this->getAttribute(($context["page"] ?? null), "promotion", []) || $this->getAttribute(($context["page"] ?? null), "promotion_second", [])) || $this->getAttribute(($context["page"] ?? null), "promotion_first", []))) {
            // line 33
            echo "\t\t\t
\t\t\t";
            // line 34
            $context["cl_promotion"] = "col-lg-12 col-md-12 col-sm-12 col-xs-12";
            // line 35
            echo "\t\t\t
\t\t\t";
            // line 36
            $context["cl_promotion_primary"] = "col-md-12 col-xs-12";
            // line 37
            echo "\t\t\t";
            if (($this->getAttribute(($context["page"] ?? null), "promotion_second", []) && $this->getAttribute(($context["page"] ?? null), "promotion_first", []))) {
                echo "\t
\t\t\t\t";
                // line 38
                $context["cl_promotion_primary"] = "col-xs-12 col-md-6 col-md-push-3 sb-r sb-l ";
                // line 39
                echo "\t\t\t";
            } elseif (($this->getAttribute(($context["page"] ?? null), "promotion_second", []) || $this->getAttribute(($context["page"] ?? null), "promotion_first", []))) {
                echo "\t
\t\t\t\t";
                // line 40
                if ($this->getAttribute(($context["page"] ?? null), "promotion_second", [])) {
                    // line 41
                    echo "\t\t\t\t \t";
                    $context["cl_promotion_primary"] = "col-xs-12 col-md-8 sb-r ";
                    // line 42
                    echo "\t\t\t\t";
                }
                echo " \t\t
\t\t\t\t";
                // line 43
                if ($this->getAttribute(($context["page"] ?? null), "promotion_first", [])) {
                    // line 44
                    echo "\t\t\t\t\t";
                    $context["cl_promotion_primary"] = "col-xs-12 col-md-8 col-md-push-4 sb-l ";
                    // line 45
                    echo "\t\t\t\t";
                }
                echo "\t\t\t\t
         ";
            }
            // line 46
            echo " 

\t\t\t<div class=\"promotion area\">
\t\t\t\t<div class=\"container\">
\t\t\t\t\t
\t\t\t\t\t<div class=\"area-inner\">
\t\t\t\t\t\t<div class=\"row\">
\t\t\t\t\t\t\t<div class=\"promotion-primary ";
            // line 53
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["cl_promotion_primary"] ?? null)), "html", null, true);
            echo "\">
\t\t\t\t\t\t\t\t";
            // line 54
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "promotion", [])), "html", null, true);
            echo "
\t\t\t\t\t\t\t</div>

\t\t\t\t\t\t\t";
            // line 57
            if ($this->getAttribute(($context["page"] ?? null), "promotion_first", [])) {
                // line 58
                echo "\t\t\t\t\t\t\t\t";
                $context["cl_promotion_first"] = "col-md-4 col-md-pull-8 col-sm-12 col-xs-12";
                // line 59
                echo "\t\t\t\t\t\t\t\t";
                if ($this->getAttribute(($context["page"] ?? null), "promotion_second", [])) {
                    // line 60
                    echo "\t\t\t\t\t\t\t\t \t";
                    $context["cl_promotion_first"] = "col-md-3 col-md-pull-6 col-sm-12 col-xs-12";
                    // line 61
                    echo "\t\t\t\t\t\t\t\t";
                }
                echo " 
\t\t\t\t\t\t\t\t<div class=\"promotion-first ";
                // line 62
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["cl_promotion_first"] ?? null)), "html", null, true);
                echo "\">
\t\t\t\t\t\t\t\t\t";
                // line 63
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "promotion_first", [])), "html", null, true);
                echo "
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t";
            }
            // line 65
            echo "\t

\t\t\t\t\t\t\t";
            // line 67
            if ($this->getAttribute(($context["page"] ?? null), "promotion_second", [])) {
                // line 68
                echo "\t\t\t\t\t\t\t\t";
                $context["cl_promotion_second"] = "col-md-4 col-sm-12 col-xs-12";
                // line 69
                echo "\t\t\t\t\t\t\t\t";
                if ($this->getAttribute(($context["page"] ?? null), "promotion_first", [])) {
                    // line 70
                    echo "\t\t\t\t\t\t\t\t \t";
                    $context["cl_promotion_second"] = "col-md-3 col-sm-12 col-xs-12";
                    // line 71
                    echo "\t\t\t\t\t\t\t\t";
                }
                echo " 
\t\t\t\t\t\t\t\t<div class=\"promotion-second ";
                // line 72
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["cl_promotion_second"] ?? null)), "html", null, true);
                echo "\">
\t\t\t\t\t\t\t\t\t";
                // line 73
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "promotion_second", [])), "html", null, true);
                echo "
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t";
            }
            // line 75
            echo "\t\t

\t\t\t\t\t\t</div>
\t\t\t\t\t</div>

\t\t\t\t</div>
\t\t\t</div>
\t\t";
        }
        // line 83
        echo "
\t\t<div class=\"clearfix\"></div>
\t\t";
        // line 85
        if ($this->getAttribute(($context["page"] ?? null), "before_content", [])) {
            // line 86
            echo "\t\t\t<div class=\"before_content area\">
\t\t\t\t<div class=\"container\">
\t\t\t\t\t<div class=\"row\">
\t\t\t\t\t\t<div class=\"col-xs-12\">
\t\t\t\t\t\t\t";
            // line 90
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "before_content", [])), "html", null, true);
            echo "
\t\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</div>
\t\t";
        }
        // line 96
        echo "\t<div class=\"clearfix\"></div>
\t\t<div id=\"content\" class=\"content content-full\">
\t\t\t<div class=\"container\">
\t\t\t\t<div class=\"content-main-inner\">
\t\t\t\t\t<div class=\"row\">
\t\t\t\t\t\t
\t\t\t\t\t\t";
        // line 102
        $context["cl_main"] = "col-md-12 col-xs-12";
        // line 103
        echo "\t\t\t\t\t\t";
        if (($this->getAttribute(($context["page"] ?? null), "sidebar_right", []) && $this->getAttribute(($context["page"] ?? null), "sidebar_left", []))) {
            echo "\t
\t\t\t\t\t\t\t";
            // line 104
            $context["cl_main"] = "col-xs-12 col-md-6 col-md-push-3 sb-r sb-l ";
            // line 105
            echo "\t\t\t\t\t\t";
        } elseif (($this->getAttribute(($context["page"] ?? null), "sidebar_right", []) || $this->getAttribute(($context["page"] ?? null), "sidebar_left", []))) {
            echo "\t
\t\t\t\t\t\t\t";
            // line 106
            if ($this->getAttribute(($context["page"] ?? null), "sidebar_right", [])) {
                // line 107
                echo "\t\t\t\t\t\t\t \t";
                $context["cl_main"] = "col-xs-12 col-md-8 sb-r ";
                // line 108
                echo "\t\t\t\t\t\t\t";
            }
            echo " \t\t
\t\t\t\t\t\t\t";
            // line 109
            if ($this->getAttribute(($context["page"] ?? null), "sidebar_left", [])) {
                // line 110
                echo "\t\t\t\t\t\t\t\t";
                $context["cl_main"] = "col-xs-12 col-md-8 col-md-push-4 sb-l ";
                // line 111
                echo "\t\t\t\t\t\t\t";
            }
            echo "\t\t\t\t
                  ";
        }
        // line 112
        echo " 

\t\t\t\t\t\t<div id=\"page-main-content\" class=\"main-content ";
        // line 114
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["cl_main"] ?? null)), "html", null, true);
        echo "\">

\t\t\t\t\t\t\t<div class=\"main-content-inner\">
\t\t\t\t\t\t\t\t
\t\t\t\t\t\t\t\t";
        // line 118
        if ($this->getAttribute(($context["page"] ?? null), "content_top", [])) {
            // line 119
            echo "\t\t\t\t\t\t\t\t\t<div class=\"content-top\">
\t\t\t\t\t\t\t\t\t\t";
            // line 120
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "content_top", [])), "html", null, true);
            echo "
\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t";
        }
        // line 123
        echo "
\t\t\t\t\t\t\t\t";
        // line 124
        if ($this->getAttribute(($context["page"] ?? null), "content", [])) {
            // line 125
            echo "\t\t\t\t\t\t\t\t\t<div class=\"content-main\">
\t\t\t\t\t\t\t\t\t\t";
            // line 126
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "content", [])), "html", null, true);
            echo "
\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t";
        }
        // line 129
        echo "
\t\t\t\t\t\t\t\t";
        // line 130
        if ($this->getAttribute(($context["page"] ?? null), "content_bottom", [])) {
            // line 131
            echo "\t\t\t\t\t\t\t\t\t<div class=\"content-bottom\">
\t\t\t\t\t\t\t\t\t\t";
            // line 132
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "content_bottom", [])), "html", null, true);
            echo "
\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t";
        }
        // line 135
        echo "\t\t\t\t\t\t\t</div>

\t\t\t\t\t\t</div>

\t\t\t\t\t\t<!-- Sidebar Left -->
\t\t\t\t\t\t";
        // line 140
        if ($this->getAttribute(($context["page"] ?? null), "sidebar_left", [])) {
            // line 141
            echo "\t\t\t\t\t\t\t
\t\t\t\t\t\t\t";
            // line 142
            $context["cl_left"] = "col-md-4 col-md-pull-8 col-sm-12 col-xs-12";
            // line 143
            echo "\t\t\t\t\t\t\t";
            if ($this->getAttribute(($context["page"] ?? null), "sidebar_right", [])) {
                // line 144
                echo "\t\t\t\t\t\t\t \t";
                $context["cl_left"] = "col-md-3 col-md-pull-6 col-sm-12 col-xs-12";
                // line 145
                echo "\t\t\t\t\t\t\t";
            }
            echo " \t\t
\t\t\t\t\t\t\t
\t\t\t\t\t\t\t<div class=\"";
            // line 147
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["cl_left"] ?? null)), "html", null, true);
            echo " sidebar sidebar-left\">
\t\t\t\t\t\t\t\t<div class=\"sidebar-inner\">
\t\t\t\t\t\t\t\t\t";
            // line 149
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "sidebar_left", [])), "html", null, true);
            echo "
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t";
        }
        // line 153
        echo "\t\t\t\t\t\t<!-- End Sidebar Left -->

\t\t\t\t\t\t<!-- Sidebar Right -->
\t\t\t\t\t\t";
        // line 156
        if ($this->getAttribute(($context["page"] ?? null), "sidebar_right", [])) {
            // line 157
            echo "\t\t\t\t\t\t\t
\t\t\t\t\t\t\t";
            // line 158
            $context["cl_right"] = "col-lg-4 col-md-4 col-sm-12 col-xs-12";
            // line 159
            echo "\t\t\t\t\t\t\t";
            if ($this->getAttribute(($context["page"] ?? null), "sidebar_left", [])) {
                // line 160
                echo "\t\t\t\t\t\t\t\t";
                $context["cl_right"] = "col-lg-3 col-md-3 col-sm-12 col-xs-12";
                // line 161
                echo "\t\t\t\t\t\t\t";
            }
            echo "\t 

\t\t\t\t\t\t\t<div class=\"";
            // line 163
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["cl_right"] ?? null)), "html", null, true);
            echo " sidebar sidebar-right theiaStickySidebar\">
\t\t\t\t\t\t\t\t<div class=\"sidebar-inner\">
\t\t\t\t\t\t\t\t\t";
            // line 165
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "sidebar_right", [])), "html", null, true);
            echo "
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t";
        }
        // line 169
        echo "\t\t\t\t\t\t<!-- End Sidebar Right -->
\t\t\t\t\t\t
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</div>
\t\t</div>

\t\t";
        // line 176
        if ($this->getAttribute(($context["page"] ?? null), "highlighted", [])) {
            // line 177
            echo "\t\t\t<div class=\"highlighted area\">
\t\t\t\t<div class=\"container\">
\t\t\t\t\t";
            // line 179
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "highlighted", [])), "html", null, true);
            echo "
\t\t\t\t</div>
\t\t\t</div>
\t\t";
        }
        // line 183
        echo "
\t\t";
        // line 184
        if ($this->getAttribute(($context["page"] ?? null), "after_content", [])) {
            // line 185
            echo "\t\t\t<div class=\"area after_content\">
\t\t\t\t<div class=\"container-fw\">
\t          \t<div class=\"content-inner\">
\t\t\t\t\t\t ";
            // line 188
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "after_content", [])), "html", null, true);
            echo "
\t          \t</div>
        \t\t</div>
\t\t\t</div>
\t\t";
        }
        // line 193
        echo "\t\t
\t\t";
        // line 194
        if ($this->getAttribute(($context["page"] ?? null), "before_panel", [])) {
            // line 195
            echo "\t\t\t<div class=\"area before-panel\">
\t\t\t\t<div class=\"container\">
\t          \t<div class=\"content-inner\">
\t\t\t\t\t\t ";
            // line 198
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "before_panel", [])), "html", null, true);
            echo "
\t          \t</div>
        \t\t</div>
\t\t\t</div>
\t\t";
        }
        // line 203
        echo "

\t\t";
        // line 205
        if (((($this->getAttribute(($context["page"] ?? null), "panel_first", []) || ($context["panel_second"] ?? null)) || ($context["panel_third"] ?? null)) || ($context["panel_four"] ?? null))) {
            // line 206
            echo "\t\t\t";
            $context["cl_panel"] = "col-lg-3 col-md-3 col-sm-3 col-xs-3";
            // line 207
            echo "\t\t\t";
            $context["nub_panel"] = 0;
            // line 208
            echo "\t\t\t";
            if ($this->getAttribute(($context["page"] ?? null), "panel_first", [])) {
                echo "\t
\t\t\t\t";
                // line 209
                $context["nub_panel"] = (($context["nub_panel"] ?? null) + 1);
                // line 210
                echo "\t\t\t";
            }
            // line 211
            echo "\t\t\t";
            if ($this->getAttribute(($context["page"] ?? null), "panel_second", [])) {
                echo "\t
\t\t\t\t";
                // line 212
                $context["nub_panel"] = (($context["nub_panel"] ?? null) + 1);
                // line 213
                echo "\t\t\t";
            }
            // line 214
            echo "\t\t\t";
            if ($this->getAttribute(($context["page"] ?? null), "panel_third", [])) {
                echo "\t
\t\t\t\t";
                // line 215
                $context["nub_panel"] = (($context["nub_panel"] ?? null) + 1);
                // line 216
                echo "\t\t\t";
            }
            // line 217
            echo "\t\t\t";
            if ($this->getAttribute(($context["page"] ?? null), "panel_four", [])) {
                echo "\t
\t\t\t\t";
                // line 218
                $context["nub_panel"] = (($context["nub_panel"] ?? null) + 1);
                // line 219
                echo "\t\t\t";
            }
            // line 220
            echo "\t\t\t";
            if ((($context["nub_panel"] ?? null) == "1")) {
                // line 221
                echo "\t\t\t   ";
                $context["cl_panel"] = "col-lg-12 col-md-12 col-sm-12 col-xs-12";
                // line 222
                echo "\t\t\t";
            } elseif ((($context["nub_panel"] ?? null) == "2")) {
                // line 223
                echo "\t\t\t   ";
                $context["cl_panel"] = "col-lg-6 col-md-6 col-sm-6 col-xs-12";
                // line 224
                echo "\t\t\t";
            } elseif ((($context["nub_panel"] ?? null) == "3")) {
                // line 225
                echo "\t\t\t   ";
                $context["cl_panel"] = "col-lg-4 col-md-4 col-sm-4 col-xs-12";
                // line 226
                echo "\t\t\t";
            } elseif ((($context["nub_panel"] ?? null) == "4")) {
                // line 227
                echo "\t\t\t   ";
                $context["cl_panel"] = "col-lg-3 col-md-3 col-sm-6 col-xs-12";
                // line 228
                echo "\t\t\t";
            }
            echo "  

\t\t\t<div class=\"area area-panel\">
\t\t\t\t<div class=\"container\">
\t\t\t\t\t<div class=\"row\">\t
\t\t\t\t\t\t";
            // line 233
            if ($this->getAttribute(($context["page"] ?? null), "panel_first", [])) {
                // line 234
                echo "\t\t\t\t\t\t\t<div class=\"panel_first ";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["cl_panel"] ?? null)), "html", null, true);
                echo "\">
\t\t\t\t\t\t\t\t<div class=\"panel-inner\">
\t\t\t\t\t\t\t\t\t";
                // line 236
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "panel_first", [])), "html", null, true);
                echo "
\t\t\t\t\t\t\t\t</div>\t
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t";
            }
            // line 239
            echo "\t
\t\t\t\t\t\t";
            // line 240
            if ($this->getAttribute(($context["page"] ?? null), "panel_second", [])) {
                // line 241
                echo "\t\t\t\t\t\t\t<div class=\"panel_second ";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["cl_panel"] ?? null)), "html", null, true);
                echo "\">
\t\t\t\t\t\t\t\t<div class=\"panel-inner\">
\t\t\t\t\t\t\t\t\t";
                // line 243
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "panel_second", [])), "html", null, true);
                echo "
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t";
            }
            // line 246
            echo "\t
\t\t\t\t\t\t";
            // line 247
            if ($this->getAttribute(($context["page"] ?? null), "panel_third", [])) {
                // line 248
                echo "\t\t\t\t\t\t\t<div class=\"panel_third ";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["cl_panel"] ?? null)), "html", null, true);
                echo "\">
\t\t\t\t\t\t\t\t<div class=\"panel-inner\">
\t\t\t\t\t\t\t\t\t";
                // line 250
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "panel_third", [])), "html", null, true);
                echo "
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t";
            }
            // line 253
            echo "\t
\t\t\t\t\t\t";
            // line 254
            if ($this->getAttribute(($context["page"] ?? null), "panel_four", [])) {
                // line 255
                echo "\t\t\t\t\t\t\t<div class=\"panel_four ";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["cl_panel"] ?? null)), "html", null, true);
                echo "\">
\t\t\t\t\t\t\t\t<div class=\"panel-inner\">
\t\t\t\t\t\t\t\t\t";
                // line 257
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "panel_four", [])), "html", null, true);
                echo "
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t";
            }
            // line 260
            echo "\t
\t\t\t\t\t</div>
\t\t\t\t</div>\t
\t\t\t</div>
\t\t";
        }
        // line 264
        echo "\t

\t\t";
        // line 266
        if ($this->getAttribute(($context["page"] ?? null), "after_panel", [])) {
            // line 267
            echo "\t\t\t<div class=\"area after-panel\">
\t\t\t\t<div class=\"container\">
\t          \t<div class=\"content-inner\">
\t\t\t\t\t\t ";
            // line 270
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "after_panel", [])), "html", null, true);
            echo "
\t          \t</div>
        \t\t</div>
\t\t\t</div>
\t\t";
        }
        // line 275
        echo "
\t</div>

\t";
        // line 278
        $this->loadTemplate((($context["directory"] ?? null) . "/templates/page/footer.html.twig"), "themes/gavias_monte/templates/page/page.html.twig", 278)->display($context);
        // line 279
        echo "
</div>

";
    }

    public function getTemplateName()
    {
        return "themes/gavias_monte/templates/page/page.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  664 => 279,  662 => 278,  657 => 275,  649 => 270,  644 => 267,  642 => 266,  638 => 264,  631 => 260,  624 => 257,  618 => 255,  616 => 254,  613 => 253,  606 => 250,  600 => 248,  598 => 247,  595 => 246,  588 => 243,  582 => 241,  580 => 240,  577 => 239,  570 => 236,  564 => 234,  562 => 233,  553 => 228,  550 => 227,  547 => 226,  544 => 225,  541 => 224,  538 => 223,  535 => 222,  532 => 221,  529 => 220,  526 => 219,  524 => 218,  519 => 217,  516 => 216,  514 => 215,  509 => 214,  506 => 213,  504 => 212,  499 => 211,  496 => 210,  494 => 209,  489 => 208,  486 => 207,  483 => 206,  481 => 205,  477 => 203,  469 => 198,  464 => 195,  462 => 194,  459 => 193,  451 => 188,  446 => 185,  444 => 184,  441 => 183,  434 => 179,  430 => 177,  428 => 176,  419 => 169,  412 => 165,  407 => 163,  401 => 161,  398 => 160,  395 => 159,  393 => 158,  390 => 157,  388 => 156,  383 => 153,  376 => 149,  371 => 147,  365 => 145,  362 => 144,  359 => 143,  357 => 142,  354 => 141,  352 => 140,  345 => 135,  339 => 132,  336 => 131,  334 => 130,  331 => 129,  325 => 126,  322 => 125,  320 => 124,  317 => 123,  311 => 120,  308 => 119,  306 => 118,  299 => 114,  295 => 112,  289 => 111,  286 => 110,  284 => 109,  279 => 108,  276 => 107,  274 => 106,  269 => 105,  267 => 104,  262 => 103,  260 => 102,  252 => 96,  243 => 90,  237 => 86,  235 => 85,  231 => 83,  221 => 75,  215 => 73,  211 => 72,  206 => 71,  203 => 70,  200 => 69,  197 => 68,  195 => 67,  191 => 65,  185 => 63,  181 => 62,  176 => 61,  173 => 60,  170 => 59,  167 => 58,  165 => 57,  159 => 54,  155 => 53,  146 => 46,  140 => 45,  137 => 44,  135 => 43,  130 => 42,  127 => 41,  125 => 40,  120 => 39,  118 => 38,  113 => 37,  111 => 36,  108 => 35,  106 => 34,  103 => 33,  101 => 32,  96 => 29,  88 => 24,  83 => 21,  81 => 20,  78 => 19,  70 => 14,  65 => 11,  63 => 10,  60 => 9,  58 => 8,  55 => 7,);
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
 * Gavias's theme implementation to display a single Drupal page.
 */
#}
<div class=\"body-page\">
   {% include directory ~ header_skin %}
\t
   {% if page.breadcrumbs %}
\t\t<div class=\"breadcrumbs\">
\t\t\t<div class=\"container\">
\t\t\t\t<div class=\"content-inner\">
\t\t\t\t\t{{ page.breadcrumbs }}
\t\t\t\t</div>\t
\t\t\t</div> 
\t\t</div>
\t{% endif %}
\t
\t{% if page.help %}
\t\t<div class=\"help\">
\t\t\t<div class=\"container\">
\t\t\t\t<div class=\"content-inner\">
\t\t\t\t\t{{ page.help }}
\t\t\t\t</div>
\t\t\t</div>
\t\t</div>
\t{% endif %}

\t<div role=\"main\" class=\"main main-page\">

\t\t{% if page.promotion or page.promotion_second or page.promotion_first %}
\t\t\t
\t\t\t{% set cl_promotion = 'col-lg-12 col-md-12 col-sm-12 col-xs-12' %}
\t\t\t
\t\t\t{% set cl_promotion_primary = 'col-md-12 col-xs-12' %}
\t\t\t{% if page.promotion_second and page.promotion_first %}\t
\t\t\t\t{% set cl_promotion_primary = 'col-xs-12 col-md-6 col-md-push-3 sb-r sb-l ' %}
\t\t\t{% elseif page.promotion_second or page.promotion_first %}\t
\t\t\t\t{% if page.promotion_second %}
\t\t\t\t \t{% set cl_promotion_primary = 'col-xs-12 col-md-8 sb-r ' %}
\t\t\t\t{% endif %} \t\t
\t\t\t\t{% if page.promotion_first %}
\t\t\t\t\t{% set cl_promotion_primary = 'col-xs-12 col-md-8 col-md-push-4 sb-l ' %}
\t\t\t\t{% endif %}\t\t\t\t
         {% endif %} 

\t\t\t<div class=\"promotion area\">
\t\t\t\t<div class=\"container\">
\t\t\t\t\t
\t\t\t\t\t<div class=\"area-inner\">
\t\t\t\t\t\t<div class=\"row\">
\t\t\t\t\t\t\t<div class=\"promotion-primary {{ cl_promotion_primary }}\">
\t\t\t\t\t\t\t\t{{ page.promotion }}
\t\t\t\t\t\t\t</div>

\t\t\t\t\t\t\t{% if page.promotion_first %}
\t\t\t\t\t\t\t\t{% set cl_promotion_first = 'col-md-4 col-md-pull-8 col-sm-12 col-xs-12' %}
\t\t\t\t\t\t\t\t{%\tif page.promotion_second %}
\t\t\t\t\t\t\t\t \t{% set cl_promotion_first = 'col-md-3 col-md-pull-6 col-sm-12 col-xs-12' %}
\t\t\t\t\t\t\t\t{% endif %} 
\t\t\t\t\t\t\t\t<div class=\"promotion-first {{ cl_promotion_first }}\">
\t\t\t\t\t\t\t\t\t{{ page.promotion_first }}
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t{% endif %}\t

\t\t\t\t\t\t\t{% if page.promotion_second %}
\t\t\t\t\t\t\t\t{% set cl_promotion_second = 'col-md-4 col-sm-12 col-xs-12' %}
\t\t\t\t\t\t\t\t{%\tif page.promotion_first %}
\t\t\t\t\t\t\t\t \t{% set cl_promotion_second = 'col-md-3 col-sm-12 col-xs-12' %}
\t\t\t\t\t\t\t\t{% endif %} 
\t\t\t\t\t\t\t\t<div class=\"promotion-second {{ cl_promotion_second }}\">
\t\t\t\t\t\t\t\t\t{{ page.promotion_second }}
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t{% endif %}\t\t

\t\t\t\t\t\t</div>
\t\t\t\t\t</div>

\t\t\t\t</div>
\t\t\t</div>
\t\t{% endif %}

\t\t<div class=\"clearfix\"></div>
\t\t{% if page.before_content %}
\t\t\t<div class=\"before_content area\">
\t\t\t\t<div class=\"container\">
\t\t\t\t\t<div class=\"row\">
\t\t\t\t\t\t<div class=\"col-xs-12\">
\t\t\t\t\t\t\t{{ page.before_content }}
\t\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</div>
\t\t{% endif %}
\t<div class=\"clearfix\"></div>
\t\t<div id=\"content\" class=\"content content-full\">
\t\t\t<div class=\"container\">
\t\t\t\t<div class=\"content-main-inner\">
\t\t\t\t\t<div class=\"row\">
\t\t\t\t\t\t
\t\t\t\t\t\t{% set cl_main = 'col-md-12 col-xs-12' %}
\t\t\t\t\t\t{% if page.sidebar_right and page.sidebar_left %}\t
\t\t\t\t\t\t\t{% set cl_main = 'col-xs-12 col-md-6 col-md-push-3 sb-r sb-l ' %}
\t\t\t\t\t\t{% elseif page.sidebar_right or page.sidebar_left %}\t
\t\t\t\t\t\t\t{% if page.sidebar_right %}
\t\t\t\t\t\t\t \t{% set cl_main = 'col-xs-12 col-md-8 sb-r ' %}
\t\t\t\t\t\t\t{% endif %} \t\t
\t\t\t\t\t\t\t{% if page.sidebar_left %}
\t\t\t\t\t\t\t\t{% set cl_main = 'col-xs-12 col-md-8 col-md-push-4 sb-l ' %}
\t\t\t\t\t\t\t{% endif %}\t\t\t\t
                  {% endif %} 

\t\t\t\t\t\t<div id=\"page-main-content\" class=\"main-content {{ cl_main }}\">

\t\t\t\t\t\t\t<div class=\"main-content-inner\">
\t\t\t\t\t\t\t\t
\t\t\t\t\t\t\t\t{% if page.content_top %}
\t\t\t\t\t\t\t\t\t<div class=\"content-top\">
\t\t\t\t\t\t\t\t\t\t{{ page.content_top }}
\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t{% endif %}

\t\t\t\t\t\t\t\t{% if page.content %}
\t\t\t\t\t\t\t\t\t<div class=\"content-main\">
\t\t\t\t\t\t\t\t\t\t{{ page.content }}
\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t{% endif %}

\t\t\t\t\t\t\t\t{% if page.content_bottom %}
\t\t\t\t\t\t\t\t\t<div class=\"content-bottom\">
\t\t\t\t\t\t\t\t\t\t{{ page.content_bottom }}
\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t{% endif %}
\t\t\t\t\t\t\t</div>

\t\t\t\t\t\t</div>

\t\t\t\t\t\t<!-- Sidebar Left -->
\t\t\t\t\t\t{% if page.sidebar_left %}
\t\t\t\t\t\t\t
\t\t\t\t\t\t\t{% set cl_left = 'col-md-4 col-md-pull-8 col-sm-12 col-xs-12' %}
\t\t\t\t\t\t\t{%\tif page.sidebar_right %}
\t\t\t\t\t\t\t \t{% set cl_left = 'col-md-3 col-md-pull-6 col-sm-12 col-xs-12' %}
\t\t\t\t\t\t\t{% endif %} \t\t
\t\t\t\t\t\t\t
\t\t\t\t\t\t\t<div class=\"{{ cl_left }} sidebar sidebar-left\">
\t\t\t\t\t\t\t\t<div class=\"sidebar-inner\">
\t\t\t\t\t\t\t\t\t{{ page.sidebar_left }}
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t{% endif %}
\t\t\t\t\t\t<!-- End Sidebar Left -->

\t\t\t\t\t\t<!-- Sidebar Right -->
\t\t\t\t\t\t{% if page.sidebar_right %}
\t\t\t\t\t\t\t
\t\t\t\t\t\t\t{% set cl_right = 'col-lg-4 col-md-4 col-sm-12 col-xs-12'  %}
\t\t\t\t\t\t\t{% if page.sidebar_left %}
\t\t\t\t\t\t\t\t{% set cl_right = 'col-lg-3 col-md-3 col-sm-12 col-xs-12' %}
\t\t\t\t\t\t\t{% endif %}\t 

\t\t\t\t\t\t\t<div class=\"{{ cl_right }} sidebar sidebar-right theiaStickySidebar\">
\t\t\t\t\t\t\t\t<div class=\"sidebar-inner\">
\t\t\t\t\t\t\t\t\t{{ page.sidebar_right }}
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t{% endif %}
\t\t\t\t\t\t<!-- End Sidebar Right -->
\t\t\t\t\t\t
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</div>
\t\t</div>

\t\t{% if page.highlighted %}
\t\t\t<div class=\"highlighted area\">
\t\t\t\t<div class=\"container\">
\t\t\t\t\t{{ page.highlighted }}
\t\t\t\t</div>
\t\t\t</div>
\t\t{% endif %}

\t\t{% if page.after_content %}
\t\t\t<div class=\"area after_content\">
\t\t\t\t<div class=\"container-fw\">
\t          \t<div class=\"content-inner\">
\t\t\t\t\t\t {{ page.after_content }}
\t          \t</div>
        \t\t</div>
\t\t\t</div>
\t\t{% endif %}
\t\t
\t\t{% if page.before_panel %}
\t\t\t<div class=\"area before-panel\">
\t\t\t\t<div class=\"container\">
\t          \t<div class=\"content-inner\">
\t\t\t\t\t\t {{ page.before_panel }}
\t          \t</div>
        \t\t</div>
\t\t\t</div>
\t\t{% endif %}


\t\t{% if page.panel_first or panel_second or panel_third or panel_four %}
\t\t\t{% set cl_panel = 'col-lg-3 col-md-3 col-sm-3 col-xs-3' %}
\t\t\t{% set nub_panel = 0  %}
\t\t\t{% if page.panel_first %}\t
\t\t\t\t{% set nub_panel = nub_panel + 1  %}
\t\t\t{% endif %}
\t\t\t{% if page.panel_second %}\t
\t\t\t\t{% set nub_panel = nub_panel + 1  %}
\t\t\t{% endif %}
\t\t\t{% if page.panel_third %}\t
\t\t\t\t{% set nub_panel = nub_panel + 1  %}
\t\t\t{% endif %}
\t\t\t{% if page.panel_four %}\t
\t\t\t\t{% set nub_panel = nub_panel + 1  %}
\t\t\t{% endif %}
\t\t\t{% if nub_panel == '1' %}
\t\t\t   {% set cl_panel = 'col-lg-12 col-md-12 col-sm-12 col-xs-12' %}
\t\t\t{% elseif nub_panel == '2' %}
\t\t\t   {% set cl_panel = 'col-lg-6 col-md-6 col-sm-6 col-xs-12' %}
\t\t\t{% elseif nub_panel == '3' %}
\t\t\t   {% set cl_panel = 'col-lg-4 col-md-4 col-sm-4 col-xs-12' %}
\t\t\t{% elseif nub_panel == '4' %}
\t\t\t   {% set cl_panel = 'col-lg-3 col-md-3 col-sm-6 col-xs-12' %}
\t\t\t{% endif %}  

\t\t\t<div class=\"area area-panel\">
\t\t\t\t<div class=\"container\">
\t\t\t\t\t<div class=\"row\">\t
\t\t\t\t\t\t{% if page.panel_first %}
\t\t\t\t\t\t\t<div class=\"panel_first {{ cl_panel }}\">
\t\t\t\t\t\t\t\t<div class=\"panel-inner\">
\t\t\t\t\t\t\t\t\t{{ page.panel_first }}
\t\t\t\t\t\t\t\t</div>\t
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t{% endif %}\t
\t\t\t\t\t\t{% if page.panel_second %}
\t\t\t\t\t\t\t<div class=\"panel_second {{ cl_panel }}\">
\t\t\t\t\t\t\t\t<div class=\"panel-inner\">
\t\t\t\t\t\t\t\t\t{{ page.panel_second }}
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t{% endif %}\t
\t\t\t\t\t\t{% if page.panel_third %}
\t\t\t\t\t\t\t<div class=\"panel_third {{ cl_panel }}\">
\t\t\t\t\t\t\t\t<div class=\"panel-inner\">
\t\t\t\t\t\t\t\t\t{{ page.panel_third }}
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t{% endif %}\t
\t\t\t\t\t\t{% if page.panel_four %}
\t\t\t\t\t\t\t<div class=\"panel_four {{ cl_panel }}\">
\t\t\t\t\t\t\t\t<div class=\"panel-inner\">
\t\t\t\t\t\t\t\t\t{{ page.panel_four }}
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t{% endif %}\t
\t\t\t\t\t</div>
\t\t\t\t</div>\t
\t\t\t</div>
\t\t{% endif %}\t

\t\t{% if page.after_panel %}
\t\t\t<div class=\"area after-panel\">
\t\t\t\t<div class=\"container\">
\t          \t<div class=\"content-inner\">
\t\t\t\t\t\t {{ page.after_panel }}
\t          \t</div>
        \t\t</div>
\t\t\t</div>
\t\t{% endif %}

\t</div>

\t{% include directory ~ '/templates/page/footer.html.twig' %}

</div>

", "themes/gavias_monte/templates/page/page.html.twig", "/var/www/html/drupal8/web/dnp2/themes/gavias_monte/templates/page/page.html.twig");
    }
}
