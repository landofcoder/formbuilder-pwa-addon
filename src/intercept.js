// const componentOverrideMapping = require('./componentOverrideMapping');
// const moduleOverridePlugin = require('./moduleOverrideWebpackPlugin');

/**
 * Custom intercept file for the extension
 * By default you can only use target of @magento/pwa-buildpack.
 *
 * If do want extend @magento/peregrine or @magento/venia-ui
 * you should add them to peerDependencies to your package.json
 *
 * If you want to add overwrites for @magento/venia-ui components you can use
 * moduleOverrideWebpackPlugin and componentOverrideMapping
 */
module.exports = targets => {
  // Wrap the talon with this extension

//   const peregrineTargets = targets.of('@magento/venia-ui');
//   const talonsTarget = peregrineTargets.talons;

  // Set the buildpack features required by this extension
  const builtins = targets.of('@magento/pwa-buildpack');
  builtins.specialFeatures.tap(featuresByModule => {
    featuresByModule['@landofcoder/formbuilder-module'] = {
      cssModules: true,
      esModules: true
    };
  });


  targets.of('@magento/venia-ui').routes.tap(routes => {
    routes.push({
      name: 'FormbuilderHome',
      pattern: '/forms.html',
      path: require.resolve('./components/home/index.js')
    });
    routes.push({
      name: 'FormbuilderView',
      pattern: '/form/view/:formUrl?',
      path: require.resolve('./components/form/index.js')
    });
    return routes;
  });
};
