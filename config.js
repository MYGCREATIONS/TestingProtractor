const ModuleLoaderType = require('./e2e-config-constants').ModuleLoaderType;
const EnvironmentType = require('./e2e-config-constants').EnvironmentType;
const path = require('path');

/**
 * This is the protractor suite configuration file.
 *
 * It contains all possible e2e suites and the basic protractor configuration. It is possible to specify global
 * configurations which are used for all suites and also suite specific configurations.
 *
 * The configuration is divided into g3-basics specific parameters like screen size and log level and protractor
 * specific ones like page timeouts and selenium address.
 *
 * All configuration parts will be partially merged together in order to create a protractor configuration file. The
 * suite specific configuration will always win. The protractor specific ones will always win over the g3-basics
 * specific ones if they have influence on each other => e.g. the parameter "moduleLoader" in the g3-basics
 * configuration has influence on the parameter "baseUrl" in the protractor configuration section, but if you specify
 * the "baseUrl" directly in the protractor section it will always be preferred.
 *
 * The basic structure of the suite configuration looks like below:
 *
 *  {
 *      config: {                       // global configuration used for all suites
 *          g3basics: {},               // g3-basics specific configuration parameters
 *          protractor: {}              // protractor specific configuration parameters
 *      },
 *      suites: {                       // contains all possible suites
 *          suite1: {                   // the name of the suite: "suite1"
 *              config: {               // optional suite specific configuration (overrides global configuration)
 *                  g3basics: {},       // suites specific g3-basics configuration parameters
 *                  protractor: {}      // suites specific protractor configuration parameters
 *              },
 *              specs: []               // the paths to the spec files which should be executed by this suite
 *          },
 *          suite2: {},
 *          suiteN: {},
 *      }
 *  }
 *
 * @author Andreas Rothmund
 * @since 5.2
 */
module.exports = {
    config: {
        g3basics: {
            environment: EnvironmentType.DEFAULT,
            moduleLoader: ModuleLoaderType.SERVER,
            moduleName: process.env['PROTRACTOR_MODULE_NAME'] || 'G3BasicsDemo',
            speedDelay: 8, // ms
            logLevel: process.env['PROTRACTOR_LOG_LEVEL'] || 'DEBUG',
            screenSize: {width: 1366, height: 768},
            loginPage: undefined, // is determined by parameter "moduleLoader", but can be overridden if needed
            beforeStart: undefined, // a function which is called before the e2e tests are executed
            downloadFolderPath: path.join(__dirname, 'downloads'),
            serverModuleLoader: {
                // mib
                host: process.env['PROTRACTOR_IP'] || '127.0.0.1',
                port: process.env['PROTRACTOR_PORT'] || 8080,
            },
            clientModuleLoader: {
                // grunt dev
                host: '127.0.0.1',
                port: 32728,
            },
        },
        protractor: {
            keepAlive: false, // if false, the grunt process stops when the test fails.
            noColor: true, // if true, protractor will not use colors in its output.
            debug: false,
            framework: 'jasmine2',
            directConnect: true,
            seleniumAddress: 'http://cgm-7015.iaas.cgm.ag:4444/wd/hub',
            allScriptsTimeout: 130000,
            getPageTimeout: 130000,
            jasmineNodeOpts: {
                isVerbose: true,
                defaultTimeoutInterval: 130000,
            },
            //Holds test data
            params: {
                suiteConfig: {
                    loginLanguage: 'en_US', // Login Language set to english by default, if the suite needs to run in German then set in suite config loginLanguage = 'de_DE'
                    urlParams: {
                        saveState: false,
                        saveStateIntervalTime: undefined,
                        limitWindows: 100,
                    }
                },
            },
            capabilities: {
                browserName: 'chrome',
                chromeOptions: {
                    args: ['--no-sandbox'],
                },
            },
        },
    },
    suites: {
        smoke: {
            specs: ['module-test/smoke/smoke-test-spec.js'],
        },
        touch: {
            config: {
                g3basics: {
                    environment: EnvironmentType.TOUCH,
                },
            },
            specs: [
                'module-test/environment/touch-environment-spec.js',
                'module-test/controls/table/ui-table-filter-list.spec.js',
                'module-test/controls/bottomPanel/*spec.js',
            ],
        },
        singlecompany: {
            specs: ['module-test/singleCompany/**/*.js'],
        },
        multirole: {
            specs: ['module-test/multiRole/**/*.js'],
        },
        toolsModuleLoader: {
            config: {
                g3basics: {
                    environment: EnvironmentType.DEV,
                    moduleLoader: ModuleLoaderType.CLIENT,
                },
            },
            specs: [
                'module-test/environment/dev-environment-spec.js',
                'module-test/basCore/open-core-features-spec.js',
                'module-test/moduleLoader/hx-include-with-module-loader.js',
            ],
        },
        suite_coreTools_basCatalog_shell: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: [
                'module-test/basCatalog/**/*.js',
                'module-test/coreTools/**/*.js',
                'module-test/shellCore/**/*.js',
                'module-test/shellSecurity/**/*.js',
                'module-test/hx-navigation/**/*.js',
            ],
        },
        suite_basCore1: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: [
                'module-test/basCore/open-core-features-spec.js',
                'module-test/basCore/catalog-searchfield-spec.js',
                'module-test/basCore/country-searchfield-spec.js',
                'module-test/basCore/currency-searchfield-spec.js',
                'module-test/basCore/language-searchfield-spec.js',
                'module-test/basCore/locale-searchfield-spec.js',
            ],
        },
        suite_basCore2: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: [
                'module-test/basCore/masterdatas/country-masterdata-spec.js',
                'module-test/basCore/masterdatas/currency-masterdata-audit-trail.spec.js',
                'module-test/basCore/masterdatas/currency-masterdata-spec.js',
                'module-test/basCore/masterdatas/language-masterdata-audit-trail-spec.js',
                'module-test/basCore/masterdatas/language-masterdata-spec.js',
            ],
        },
        suite_basCore3: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: [
                'module-test/basCore/masterdatas/unit-groups-masterdata-audit-trail-spec.js',
                'module-test/basCore/masterdatas/unit-groups-masterdata-spec.js',
                'module-test/basCore/masterdatas/unit-masterdata-audit-trail-spec.js',
                'module-test/basCore/masterdatas/units-masterdata-spec.js',
                'module-test/basCore/number-range-spec.js',
                'module-test/basCore/code-selection-hitlists-spec.js',
                'module-test/basCore/array-datasource-hitlists-spec.js',
                'module-test/basCore/procedure-datasource-hitlists-spec.js',
            ],
        },
        suite_basCore4: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: [
                'module-test/basCore/show-history-extension-spec.js',
                'module-test/basCore/enumeration-radio-group-spec.js',
                'module-test/basCore/enumeration-searchfield-spec.js',
                'module-test/basCore/enumeration-type-searchfield-spec.js',
                'module-test/basCore/enumeration-value-list-spec.js',
                'module-test/basCore/masterdatas/enumeration-masterdata-spec.js',
                'module-test/basCore/enumeration-value-with-icon-spec.js'
            ],
        },
        suite_basOrg1: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: [
                'module-test/basOrg/masterdatas/building-unit-audit-trail-spec.js',
                'module-test/basOrg/masterdatas/building-unit-master-data-spec.js',
                'module-test/basOrg/masterdatas/employee-function-masterdata-spec.js'
                // 'module-test/baseController/master-data-save-draft-spec.js'
            ],
        },
        suite_basOrg2: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: [
                'module-test/basOrg/open-org-features-spec.js',
                'module-test/basOrg/masterdatas/employee-masterdata-spec.js',
            ],
        },
        suite_basOrg3: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: [
                'module-test/basOrg/masterdatas/banks-master-data-spec.js',
                'module-test/basOrg/masterdatas/org-unit-audit-trail-spec.js',
                'module-test/basOrg/masterdatas/org-unit-masterdata-spec.js',
                'module-test/basOrg/masterdatas/org-unit-type-audit-trail-spec.js',
                'module-test/basOrg/masterdatas/org-unit-type-master-data-spec.js',
            ],
        },
        suite_basOrg4: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: [
                'module-test/basOrg/masterdatas/postal-code-audit-trail-spec.js',
                'module-test/basOrg/masterdatas/postal-code-masterdata-spec.js',
                'module-test/basOrg/bank-account-spec.js',
                'module-test/basOrg/citizenships-spec.js',
                'module-test/basOrg/citizenship-single-spec.js',
                'module-test/basOrg/employers-spec.js',
            ],
        },
        suite_basOrg5: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: [
                'module-test/basOrg/address-simple-spec.js',
                'module-test/basOrg/languages-spec.js',
                'module-test/basOrg/person-demo-spec.js',
                'module-test/basOrg/telecoms-spec.js',
            ],
        },
        suite_basOrg6: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: [
                'module-test/baseController/setting-example-spec.js',
                'module-test/baseController/client-message-bus-spec.js',
                'module-test/baseController/command-example-spec.js',
                'module-test/baseController/multi-window-spec.js',
                'module-test/baseController/multi-window-performance-spec.js',
                'module-test/dynamicCache/hxDynamicCacheExampleSpec.js',
            ],
        },
        suite_basSec1: {
            config: {
                protractor: {
                    allScriptsTimeout: 600000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 600000,
                    },
                },
            },
            specs: [
                'module-test/basSecurity/masterdatas/permission-definition-spec.js',
                'module-test/basSecurity/masterdatas/permission-object-masterdata-spec.js',
                //'module-test/basSecurity/permissions/permission-object-extensions-spec.js',
                //'module-test/basSecurity/dynamic-permission-spec.js',
            ]
        },
        suite_basSec2: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: [
                'module-test/basSecurity/about-cgm-clinical-spec.js',
                'module-test/basSecurity/login-back-button-spec.js',
                'module-test/basSecurity/redirect-spec.js',
                'module-test/basSecurity/open-security-features-spec.js',
            ],
        },
        suite_scriptEditor: {
            specs: ['module-test/scriptEditor/script-editor-spec.js'],
        },
        suite_basSec3: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: ['module-test/saveOnLayer/saveOnLayer-spec.js', 'module-test/basSecurity/transportSystem/**/*.js'],
        },
        suite_basSec4: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: [
                'module-test/basSecurity/masterdatas/user-management-audit-trail-spec.js',
                'module-test/basSecurity/masterdatas/user-management-activity-audit-trail-spec.js',
                'module-test/basSecurity/masterdatas/roles-masterdata-spec.js',
                'module-test/basSecurity/masterdatas/ldap-configuration-spec.js',
                'module-test/basSecurity/masterdatas/simplified-user-management-spec.js',
            ],
        },
        suite_basSec5: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: [
                'module-test/basSecurity/roleSwitching-spec.js',
                'module-test/basSecurity/role-and-company-change-spec.js',
                'module-test/basSecurity/orgUnitSwitching-spec.js',
                'module-test/basSecurity/specialCharactersLoginSpec.js',
                'module-test/basSecurity/logout-spec.js',
                'module-test/basSecurity/permission-check-spec.js',
            ],
        },
        suite_basSec6: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: [
                'module-test/basSecurity/masterdatas/user-management-spec.js',
                'module-test/basSecurity/masterdatas/user-management-role-spec.js',
                'module-test/basSecurity/permissions/permission-calculation-spec.js',
                'module-test/basSecurity/masterdatas/permission-assignment.spec.js'
            ],
        },
        suite_cdm1: {
            specs: [
                'module-test/cdm/baseTypes/**/*.js',
                'module-test/cdm/editor/**/*.js',
                'module-test/cdm/formsMaturityGrading/**/*.js',
                'module-test/cdm/cdm-configuration-spec.js',
                'module-test/cdm/cdm-configuration-usage-spec.js',
                'module-test/cdm/cdm-security-spec.js',
                'module-test/cdm/complex-type-definition-spec.js',
                'module-test/cdm/form-creation-spec.js',
            ],
        },
        suite_cdm2: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: [
                'module-test/cdm/required-property-record-demo/**/*.js',
                'module-test/cdm/record-demo-spec.js',
                'module-test/cdm/string-representation-spec.js',
                'module-test/cdm/template-configuration-spec.js',
                'module-test/cdm/value-set.spec.js',
                'module-test/cdm/unit-set-spec.js',
                'module-test/cdm/string-representation-demo-spec.js',
                'module-test/cdm/saved-records-spec.js',
                'module-test/cdm/stateful-required-spec.js',
            ],
        },
        suite_cdm3: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: [
                // order of specs affects import packages order and can overriding data imported earlier
                'module-test/cdm/cdm-plus/profiles-spec.js',
                'module-test/cdm/cdm-plus/cdm-types-spec.js',
                'module-test/cdm/cdm-plus/types-spec.js',
                'module-test/cdm/profile-duplication/duplication-spec.js',
            ],
        },
        suite_cdm4: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: ['module-test/cdm/profiles/**/*.js'],
        },
        suite_cdm5: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: ['module-test/cdm/regression/**/*.js'],
        },
        suite_cdm6: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: ['module-test/cdm/assessment/**/*.js'],
        },
        suite_forms1: {
            specs: [
                'module-test/forms-master-data/specs/common/*.spec.js',
                'module-test/forms-master-data/specs/plugins/a-c/**/*.spec.js',
            ],
        },
        suite_forms2: {
            specs: ['module-test/forms-master-data/specs/plugins/c-f/**/*.spec.js'],
        },
        suite_forms3: {
            specs: ['module-test/forms-master-data/specs/plugins/g-o/**/*.spec.js'],
        },
        suite_forms4: {
            specs: ['module-test/forms-master-data/specs/plugins/p-z/panel/*.spec.js',
                'module-test/forms-master-data/specs/plugins/p-z/person-identification-list/*.spec.js',
                'module-test/forms-master-data/specs/plugins/p-z/proportion/*.spec.js',
                'module-test/forms-master-data/specs/plugins/p-z/radio-button/*.spec.js',
                'module-test/forms-master-data/specs/plugins/p-z/radio-button-group/*.spec.js',
                'module-test/forms-master-data/specs/plugins/p-z/reference-range/*.spec.js']
        },
        suite_forms5: {
            specs: ['module-test/forms-master-data/specs/plugins/p-z/scale-component-horizontal/*.spec.js',
                'module-test/forms-master-data/specs/plugins/p-z/scale-component-total/*.spec.js',
                'module-test/forms-master-data/specs/plugins/p-z/scale-component-vertical/*.spec.js',
                'module-test/forms-master-data/specs/plugins/p-z/tabbed-pane/*.spec.js',
                'module-test/forms-master-data/specs/plugins/p-z/table/*.spec.js',
                'module-test/forms-master-data/specs/plugins/p-z/tag-enum-value-list/*.spec.js']
        },
        suite_forms6: {
            specs: ['module-test/forms-master-data/specs/plugins/p-z/telecoms-list/*.spec.js',
                'module-test/forms-master-data/specs/plugins/p-z/terminology-id/*.spec.js',
                'module-test/forms-master-data/specs/plugins/p-z/text-input-field/*.spec.js',
                'module-test/forms-master-data/specs/plugins/p-z/time-field/*.spec.js',
                'module-test/forms-master-data/specs/plugins/p-z/toggle-button/*.spec.js',
                'module-test/forms-master-data/specs/plugins/p-z/types-list/*.spec.js']
        },
        suite_qa1: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: ['module-test/qa/hx/**/*.js'],
        },
        suite_qa2: {
            config: {
                protractor: {
                    allScriptsTimeout: 600000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 600000,
                    },
                },
            },
            specs: ['module-test/qa/cgmUiControls/**/*.js'],
        },
        suite_qa3: {
            specs: [
                'module-test/qa/basCore/**/*.js',
                'module-test/qa/basOrg/**/*.js',
                'module-test/qa/basRuntime/**/*.js',
            ],
        },
        suite_qa4: {
            specs: [
                'module-test/qa/shellCore/**/*.js',
                'module-test/qa/masterdata/**/*.js',
                'module-test/qa/cgmCommonComponents/**/*.js',
                'module-test/qa/cgmForms/**/*.js',
            ],
        },
        suite_shortcuts: {
            specs: ['module-test/shortcuts/shortcuts-tooltip-spec.js'],
        },
        suite_configTest: {
            specs: ['config-test/**/*.js'],
        },
        suite_fndn_printout: {
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                },
            },
            specs: [
                'module-test/fndn/printout/printout-configuration-permisson-check.spec.js',
                'module-test/fndn/printout/document-formats-management.spec.js',
                'module-test/fndn/printout/printout-configuration-group-crud.spec.js',
                'module-test/fndn/printout/printout-configuration-printouttype-crud.spec.js',
                'module-test/fndn/printout/printout-configuration-printout-conf-management.spec.js',
                'module-test/fndn/printout/printer-management.spec.js',
                'module-test/fndn/printout/printout-save-on-layer.spec.js',
                'module-test/fndn/printout/printout-dialog.spec.js',
                'module-test/fndn/printout/jasper-resource-management.spec.js',
            ],
        },

        suite_GermanLanguage: {
            //Runs test in German Language in browser
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                    params: {
                        suiteConfig: {
                            loginLanguage: 'de_DE', // Login Language as German
                        },
                    },
                },
            },
            specs: ['module-test/locale/de_DE-spec.js'],
        },
        suite_helixTsAdvancedConcepts: {
            // runs tests for advanced features like multi-window and save-state
            config: {
                protractor: {
                    allScriptsTimeout: 300000,
                    jasmineNodeOpts: {
                        defaultTimeoutInterval: 300000,
                    },
                    params: {
                        suiteConfig: {
                            // params are used for the navigation helper to activate save state with url params
                            urlParams: {
                                saveState: true, // activates save state
                                saveStateIntervalTime: 15, // sets interval to save state to 1 seconds
                                limitWindows: 10,
                            },
                        },
                    },
                },
            },
            specs: [
                'module-test/helixTsAdvancedConcepts/save-state-role-change.js',
                'module-test/helixTsAdvancedConcepts/save-state-spec.js',
                'module-test/helixTsAdvancedConcepts/restore-dialog-spec.js',
                'module-test/helixTsAdvancedConcepts/multiWindow/limit-windows-spec.js'
            ],
        },
        surface: {
            config: {
                g3basics: {
                    environment: EnvironmentType.TOUCH,
                    screenSize: {width: 1366 * 2, height: 768 * 2},
                    serverModuleLoader: {
                        // mib
                        host: process.env['HOST_IP'] || 'cgm-17180.iaas.cgm.ag',
                        port: process.env['PROTRACTOR_PORT'] || 8081,
                    },
                },
                protractor: {
                    // seleniumAddress: process.env['SELENIUM_ADDRESS'] || 'http://10.167.129.88:4444/wd/hub',
                    seleniumAddress: process.env['SELENIUM_ADDRESS'] || 'http://192.168.100.22:4444/wd/hub',
                    capabilities: {
                        browserName: 'MicrosoftEdge',
                    },
                    directConnect: false,
                },
            },
            specs: [
                'module-test/environment/touch-environment-spec.js',
                'module-test/controls/table/ui-table-filter-list.spec.js',
                'module-test/controls/bottomPanel/*spec.js',
                'module-test/controls/sidePanel/*spec.js',
                'module-test/controls/sideBar/*spec.js',
            ],
        },
        android: {
            baseUrl: 'http://demo.g3basics.cgm.ag/daily/indexTouch.html',
            config: {
                g3basics: {
                    environment: EnvironmentType.TOUCH,
                    serverModuleLoader: {
                        // mib
                        host: process.env['HOST_IP'] || '10.142.32.94',
                        port: process.env['PROTRACTOR_PORT'] || 8080,
                    },
                },
                protractor: {
                    // appium
                    seleniumAddress: process.env['SELENIUM_ADDRESS'] || 'http://localhost:4723/wd/hub',
                    capabilities: {
                        browserName: 'chrome',
                        showChromedriverLog: 'true',

                        // Samsung tablet via USB
                        platformName: 'Android',
                        platformVersion: '7.0',
                        deviceName: '52003aa9ea8ec463',
                        //automationName: "UiAutomator2"

                        //deviceType: 'android',
                    },
                    directConnect: false,
                },
            },
            specs: [
                'module-test/environment/touch-environment-spec.js',
                //,'module-test/basCore/masterdatas/currency-masterdata-spec.js'
            ],
        },
        ipad: {
            config: {
                g3basics: {
                    beforeStart: () => {
                        const wd = require('wd'),
                            protractor = require('protractor'),
                            wdBridge = require('wd-bridge')(protractor, wd);

                        wdBridge.initFromProtractor(exports.config);

                        //To navigate using file:// rather than http://
                        /*var defer = protractor.promise.defer();

                        browser.ignoreSynchronization = true;

                        browser.executeScript('return window.location;').then( function(location){
                            browser.resetUrl = 'file://';
                            browser.baseUrl = location.origin + location.pathname;
                            defer.fulfill();
                        });

                        return defer.promise;*/
                    },
                },
                protractor: {
                    // Reference: https://github.com/appium/sample-code/blob/master/sample-code/examples/node/helpers/caps.js
                    seleniumAddress: 'http://127.0.0.1:4723/wd/hub',
                    baseUrl: 'http://10.142.35.52:8080/G3BasicsDemo/indexTouch.html',
                    //baseUrl: 'http://demo.g3basics.cgm.ag/daily//indexTouch.html',
                    capabilities: {
                        app: 'SafariLauncher',
                        browserName: 'Safari',
                        platformName: 'iOS',
                        deviceName: 'G3PAD',
                        automationName: 'XCUITest',
                        udid: '5d5dfa250754a6acec57bb0a79d4407e6d4209c9',
                        orientation: 'LANDSCAPE',
                        safariInitialUrl: 'http://10.142.35.52:8080/G3BasicsDemo/indexTouch.html',
                        appName: 'G3BasicsDemo',
                    },
                    /*
                    capabilities: {
                        browserName: 'safari',
                        platformName: 'iOS',
                        platformVersion: '10.2',
                        deviceName: 'iPad Simulator',
                        automationName: "XCUITest"
                    }*/
                },
            },
            specs: [],
        },
    },
};
