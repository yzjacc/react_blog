// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/bytedance/Desktop/GitHub/React-Blog/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/pages/load';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__index' */'@/layouts/index.js'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/404",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'@/pages/404.js'), loading: LoadingComponent})
      },
      {
        "path": "/about",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__about__index' */'@/pages/about/index.jsx'), loading: LoadingComponent})
      },
      {
        "path": "/archive",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__archive__index' */'@/pages/archive/index.jsx'), loading: LoadingComponent})
      },
      {
        "path": "/blog/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__blog__:id' */'@/pages/blog/:id.js'), loading: LoadingComponent})
      },
      {
        "path": "/book",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__book__index' */'@/pages/book/index.jsx'), loading: LoadingComponent})
      },
      {
        "path": "/",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__index__index' */'@/pages/index/index.jsx'), loading: LoadingComponent})
      },
      {
        "path": "/load",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__load' */'@/pages/load.tsx'), loading: LoadingComponent})
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'@/pages/404.js'), loading: LoadingComponent})
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

  return routes;
}
