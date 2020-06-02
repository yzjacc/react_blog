import { ApplyPluginsType } from '/Users/yuzijun/Desktop/Github/React-Blog/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/",
    "component": require('@/layouts/index.js').default,
    "routes": [
      {
        "path": "/404",
        "exact": true,
        "component": require('@/pages/404.js').default
      },
      {
        "path": "/about",
        "exact": true,
        "component": require('@/pages/about/index.jsx').default
      },
      {
        "path": "/archive",
        "exact": true,
        "component": require('@/pages/archive/index.jsx').default
      },
      {
        "path": "/blog/:id",
        "exact": true,
        "component": require('@/pages/blog/:id.js').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('@/pages/index/index.jsx').default
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
