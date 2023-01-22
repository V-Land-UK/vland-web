

(function()
{
    'use strict';

    var _config = {
        'mode':"opt-in",     //opt-in, opt-out
        'current_lang':"en",
        'autorun':true,      //run as soon as loaded
        'page_scripts':true,
        'hide_from_bots':true,
        'cookie_name':"cc_cookie",
        'cookie_expiration':182,    //default: 6 months in days
        'cookie_domain':window.location.hostname,   //default: current domain
        'cookie_path':"/",
        'cookie_same_site':"Lax",
        'use_rfc_cookies':false,
        'autoclear_cookies':true,
        'revision':0,
        'script_selector':"data-cookieCategory"

    };

    var /**
        * Object which holds the maiin methods/API (.show, .run, ...)
        */
        _cookieconsent={},

        /**
         * Global user configuration object
         */
        user_config,

        /**
         * Internal state variables
         */
        saved_cookie_content = {},
        cookie_data = null,

        /**
         * @type {Date}
         */
        consent_date,

        /**
         * @type {Date}
         */
        last_consent_update,

        /**
         * @type {string}
         */
        consent_uuid,

        /**
         * @type {boolean}
         */
        invalid_consent= true,

        consent_modal_exists = false,
        consent_modal_visible = false,

        settings_modal_visible = false,
        clicked_inside_modal = false,
        current_modal_focusable,

        //Helper callback functions

        onAccept,
        onChange,
        onFirstAction,

        revision_enabled=false,
        valid_revision=true,
        revision_message='',

        // State variables for the autoClearCookies function
        changed_settings=[],
        reload_page=false;

    /**
     * Accept type:
     * - "all"
     * - "necessary"
     * - "custom"
     * @type {string}
    */

    var accept_type;

    /**
     * Contains all non-accepted/rejected categories
     * @type {string[]}
     */

    var rejected_categories = [];

    /**
     * Contains all accepted categories
     * @type {string[]}
     */

    var accepted_categories = [];

    /**
     * Contains all categries enabled by default
     * @type {string[]}
     */

    var default_enabled_categories = [];

    //dont run (to avoid indexing text content) if bot detected
    var is_bot = false;
    
     /**
         * Save reference to the last focused element on the page
         * (used later to restore focus when both modals are closed)
         */
     var last_elem_before_modal;
     var last_consent_modal_btn_focus;

     /**
         * Both of the arrays below have the same structure:
         * [0] => holds reference to the FIRST focusable element inside modal
         * [1] => holds reference to the LAST focusable element inside modal
         */
     var consent_modal_focusable = [];
     var settings_modal_focusable = [];

      /**
         * Keep track of enabled/disabled categories
         * @type {boolean[]}
         */
    var toggle_states = [];

    /**
     * Stores all available categories
     * @type {string[]}
     */
    var all_categories = [];
      
      /** Keep track of readonly toggles
      * @type {boolean[]}
      */
    var readonly_categories = [];

    /**
     * Update config settings
     * @param {Object} user_config
     */

    var _setConfig = function(_user_config){

            /**
             * Make user configuration globally available
             */
            user_config = _user_config;

            _log("CookieConsent [CONFIG]: received_config_settings ", user_config);

            if(typeof user_config['cookie_expiration'] === "number")
                _config.cookie_expiration = user_config['cookie_expiration'];

            if(typeof user_config['cookie_necessary_only_expiration'] === "number")
                _config.cookie_necessary_only_expiration  = user_config['cookie_necessary_only_expiration'];

            if(typeof user_config['autorun'] === "boolean")
                _config.autorun = user_config['autorun'];

            if(typeof user_config['cookie_domain'] === "string")
                _config.cookie_domain = user_config['cookie_domain'];

            if(typeof user_config['cookie_same_site'] === "string")
                _config.cookie_same_site = user_config['cookie_same_site'];

            if(typeof user_config['cookie_path'] === "string")
                _config.cookie_path = user_config['cookie_path'];

            if(typeof user_config['cookie_name'] === "string")
                _config.cookie_name = user_config['cookie_name'];

            if(typeof user_config['onAccept'] === "function")
                onAccept = user_config['onAccept'];

            if(typeof user_config['onFirstAction'] === "function")
                onFirstAction = user_config['onFirstAction'];

            if(typeof user_config['onChange'] === "function")
                onChange = user_config['onChange'];

            if(user_config['mode'] === 'opt-out')
                _config.mode = 'opt-out';

            if(typeof user_config['revision'] === "number"){
                user_config['revision'] > -1 && (_config.revision = user_config['revision']);
                revision_enabled = true;
            }

            if(typeof user_config['autoclear_cookies'] === "boolean")
                _config.autoclear_cookies = user_config['autoclear_cookies'];

            if(user_config['use_rfc_cookie'] === true)
                _config.use_rfc_cookie = true;

            if(typeof user_config['hide_from_bots'] === "boolean"){
                _config.hide_from_bots = user_config['hide_from_bots'];
            }

            if(_config.hide_from_bots){
                is_bot = navigator &&
                    ((navigator.userAgent && /bot|crawl|spider|slurp|teoma/i.test(navigator.userAgent)) || navigator.webdriver);
            }

            _config.page_scripts = user_config['page_scripts'] === true;

            if (user_config['auto_language'] === 'browser' || user_config['auto_language'] === true) {
                _config.auto_language = 'browser';
            } else if (user_config['auto_language'] === 'document') {
                _config.auto_language = 'document';
            }

            _log("CookieConsent [LANG]: auto_language strategy is '" + _config.auto_language + "'");

            _config.current_lang = _resolveCurrentLang(user_config.languages, user_config['current_lang']);
    }





})