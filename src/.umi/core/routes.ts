import { ApplyPluginsType } from '/Users/yuzijun/Desktop/test/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/",
    "component": require('@/layouts/index.js').default,
    "routes": [
      {
        "path": "/Blog/:id",
        "exact": true,
        "component": require('@/pages/Blog/:id.js').default
      },
      {
        "path": "/archive",
        "exact": true,
        "component": require('@/pages/archive/index.jsx').default
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
