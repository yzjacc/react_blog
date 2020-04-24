import { ApplyPluginsType } from '/Users/yuzijun/Desktop/Github/Blog/test/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/",
    "component": require('@/layouts/index.js').default,
    "routes": [
      {
        "path": "/about",
        "exact": true,
        "component": require('@/pages/about/index.jsx').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('@/pages/index/index.jsx').default
      },
      {
        "path": "/login",
        "exact": true,
        "component": require('@/pages/login/index.jsx').default
      }
    ]
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
