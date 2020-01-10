<?php
    $customize = (array)json_decode($json, true);
    if($customize):
    ?>
<style>
    body{}
    <?php //================= Theme color primary ================== ?>
    <?php if(isset($customize['theme_color']) && $customize['theme_color']){ ?>
        a:hover, a:focus,
        .btn-link:hover, .btn-link:focus,
        .pagination > li > a:hover, .pagination > li > a:focus, .pagination > li > span:hover, .pagination > li > span:focus,
        .footer a:hover, .footer.footer-v2 a:hover,
        .post-block .post-categories a,
        .video-block .post-image a:before,
        .video-block .post-title a:hover,
        .style-dark .post-block .post-title a:hover,
        .post-slider.post-block.v2 .post-meta-wrap .post-title a:hover,
        .post-style-stick.v3 .item-list > ul > li:first-child .post-block .post-title a:hover,
        .list-highlight-post .item-list ul li .post-block .post-meta-wrap * a:hover,
        .post-style-list.bg-black .post-block .post-title a:hover,
        .nav-tabs > li > a:hover, .nav-tabs > li > a:focus,
        .bean-tab .nav-tabs > li.active > a,
        .block .block-title,
        .block .block-title > span,
        .block.style-higlight .more-link a:hover,
        .block.block-blocktabs .ui-tabs-nav > li.ui-tabs-active > a,
        nav.breadcrumb ol > li a:hover,
        .navigation .gva_menu > li > a:hover,
        .navigation .gva_menu > li > a.is-active,
        .navigation .gva_menu .sub-menu li a:hover,
        .gva-navigation .gva_menu li a:hover,
        .gva-mega-menu .block-blocktabs .ui-tabs-nav > li.ui-tabs-active > a,
        .view-featured-videos .video-block .video-content .video-title a:hover,
        .view-featured-videos .video-block .video-content .icon a:hover
        {
          color: <?php echo $customize['theme_color'] ?>!important;
        }


        .pager .paginations a.active,
        .view-featured-videos .video-block .video-content .icon a:hover
        {
          border-color: <?php echo $customize['theme_color'] ?>!important;
        }

        .nav-tabs > li.active > a,
        .nav-tabs > li.active > a:hover, .nav-tabs > li.active > a:focus
        {
            border-bottom-color: <?php echo $customize['theme_color'] ?>!important;
        }

        .pager .paginations a.active,
        #edit-preview, #edit-submit,
        header.header-v2 .gva_menu,
        header.header-v3 .topbar,
        .breaking-news .title,
        .contact-message-form .form-actions #edit-preview, .contact-message-form .form-actions #edit-submit,
        #node-single-comment h2:before,
        .block .block-title > span:before,
        .block.block-simplenews input#edit-subscribe,
        .block.block-simplenews input#edit-subscribe:hover,
        .list-tags .view-list ul > li:hover,
        .poll .poll-item .bar .foreground,
        .gavias-skins-panel .control-panel,
        .gavias-skins-panel .panel-skins-content .layout.active
        {
          background-color: <?php echo $customize['theme_color'] ?>!important;
        }
    <?php } ?>     


    <?php //================= Body page ===================== ?>
    <?php if(isset($customize['text_color']) && $customize['text_color']){ ?>
        body .main-page, .ui-widget-content{
            color: <?php echo $customize['text_color'] ?>!important;
        }
    <?php } ?>

    <?php if(isset($customize['link_color']) && $customize['link_color']){ ?>
        body .main-page a{
            color: <?php echo $customize['link_color'] ?>!important;
        }
    <?php } ?>

    <?php if(isset($customize['link_hover_color']) && $customize['link_hover_color']){ ?>
        body .main-page a:hover{
            color: <?php echo $customize['link_hover_color']?>!important;
        }
    <?php } ?>

    <?php //===================Header=================== ?>
    <?php if(isset($customize['header_bg']) && $customize['header_bg']){ ?>
        header .header-main{
            background: <?php echo $customize['header_bg'] ?>!important;
        }
    <?php } ?>

    <?php if(isset($customize['header_color_link']) && $customize['header_color_link']){ ?>
        header .header-main a{
            background: <?php echo $customize['header_color_link'] ?>!important;
        }
    <?php } ?>

    <?php if(isset($customize['header_color_link_hover']) && $customize['header_color_link_hover']){ ?>
        header .header-main a:hover{
            background: <?php echo $customize['header_color_link_hover'] ?>!important;
        }
    <?php } ?>

    <?php //===================Menu=================== ?>
    <?php if(isset($customize['menu_bg']) && $customize['menu_bg']){ ?>
        .main-menu, ul.gva_menu{
            background: <?php echo $customize['menu_bg'] ?>!important;
        }
    <?php } ?> 

    <?php if(isset($customize['menu_color_link']) && $customize['menu_color_link']){ ?>
        .main-menu ul.gva_menu > li > a{
            color: <?php echo $customize['menu_color_link'] ?>!important;
        }
    <?php } ?> 

    <?php if(isset($customize['menu_color_link_hover']) && $customize['menu_color_link_hover']){ ?>
        .main-menu ul.gva_menu > li > a:hover{
            color: <?php echo $customize['menu_color_link_hover'] ?>!important;
        }
    <?php } ?> 

    <?php if(isset($customize['submenu_background']) && $customize['submenu_background']){ ?>
        .main-menu .sub-menu{
            background: <?php echo $customize['submenu_background'] ?>!important;
            color: <?php echo $customize['submenu_color'] ?>!important;
        }
    <?php } ?> 

    <?php if(isset($customize['submenu_color']) && $customize['submenu_color']){ ?>
        .main-menu .sub-menu{
            color: <?php echo $customize['submenu_color'] ?>!important;
        }
    <?php } ?> 

    <?php if(isset($customize['submenu_color_link']) && $customize['submenu_color_link']){ ?>
        .main-menu .sub-menu a{
            color: <?php echo $customize['submenu_color_link'] ?>!important;
        }
    <?php } ?> 

    <?php if(isset($customize['submenu_color_link_hover']) && $customize['submenu_color_link_hover']){ ?>
        .main-menu .sub-menu a:hover{
            color: <?php echo $customize['submenu_color_link_hover'] ?>!important;
        }
    <?php } ?> 

    <?php //===================Footer=================== ?>
    <?php if(isset($customize['footer_bg']) && $customize['footer_bg']){ ?>
        .footer{
            background: <?php echo $customize['footer_bg'] ?>!important;
        }
    <?php } ?>

     <?php if(isset($customize['footer_color']) && $customize['footer_color']){ ?>
        .footer{
            color: <?php echo $customize['footer_color'] ?> !important;
        }
    <?php } ?>

    <?php if(isset($customize['footer_color_link']) && $customize['footer_color_link']){ ?>
        .footer ul.menu > li a::after, .footer a{
            color: <?php echo $customize['footer_color_link'] ?>!important;
        }
    <?php } ?>    

    <?php if(isset($customize['footer_color_link_hover']) && $customize['footer_color_link_hover']){ ?>
        .footer a:hover{
            color: <?php echo $customize['footer_color_link_hover'] ?> !important;
        }
    <?php } ?>    

    <?php //===================Copyright======================= ?>
    <?php if(isset($customize['copyright_bg']) && $customize['copyright_bg']){ ?>
        .copyright{
            background: <?php echo $customize['copyright_bg'] ?> !important;
        }
    <?php } ?>

     <?php if(isset($customize['copyright_color']) && $customize['copyright_color']){ ?>
        .copyright{
            color: <?php echo $customize['copyright_color'] ?> !important;
        }
    <?php } ?>

    <?php if(isset($customize['copyright_color_link']) && $customize['copyright_color_link']){ ?>
        .copyright a{
            color: <?php echo $customize['copyright_color_link'] ?>!important;
        }
    <?php } ?>    

    <?php if(isset($customize['copyright_color_link_hover']) && $customize['copyright_color_link_hover']){ ?>
        .copyright a:hover{
            color: <?php echo $customize['copyright_color_link_hover'] ?> !important;
        }
    <?php } ?>    
</style>
<?php 
  
    // \Drupal::configFactory()->getEditable('gavias_monte.setting')
    // ->set('gavias_monte_customize_json', $json)
    // ->save();
endif ?>
