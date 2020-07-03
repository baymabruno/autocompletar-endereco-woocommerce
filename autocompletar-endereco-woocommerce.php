<?php

/**
 * Plugin Name: Autocomplete address by CEP Brazil woocommerce
 * Plugin URI:https://testeemproducao.com.br/
 * Description: Plugin autocomplete address by CEP Brazil
 * Version: 1.1
 * Author: Bayma Bruno
 * Author URI: https://testeemproducao.com.br/
 */

add_action('the_content', 'busca_cep_woocommerce');

function busca_cep_woocommerce($content)
{
    global $woocommerce;

    if (is_checkout()) {

        $script = '<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="crossorigin="anonymous"></script>';
        $script .= '<script type="text/javascript" src="https://unpkg.com/jquery-easy-loading@2.0.0-rc.2/dist/jquery.loading.min.js" ></script>';
        $script .= '<script type="text/javascript" src="' . plugin_dir_url(__FILE__) . 'script.js" ></script>';

        return $content .= $script;
    }

    return $content;
}
