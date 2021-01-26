// @ts-nocheck
import { ApplyPluginsType, dynamic } from '/Users/bytedance/Desktop/GitHub/React-Blog/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__index' */'@/layouts/index.js'), loading: require('@/pages/load').default}),
    "routes": [
      {
        "path": "/404",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'@/pages/404.js'), loading: require('@/pages/load').default})
      },
      {
        "path": "/about",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__about__index' */'@/pages/about/index.jsx'), loading: require('@/pages/load').default})
      },
      {
        "path": "/archive",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__archive__index' */'@/pages/archive/index.jsx'), loading: require('@/pages/load').default})
      },
      {
        "path": "/blog/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__blog__:id' */'@/pages/blog/:id.js'), loading: require('@/pages/load').default})
      },
      {
        "path": "/book",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__book__index' */'@/pages/book/index.jsx'), loading: require('@/pages/load').default})
      },
      {
        "path": "/",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__index__index' */'@/pages/index/index.jsx'), loading: require('@/pages/load').default})
      },
      {
        "path": "/load",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__load' */'@/pages/load.tsx'), loading: require('@/pages/load').default})
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
