/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as LayoutIndexImport } from './routes/_layout.index'
import { Route as AuthLoginImport } from './routes/auth/login'
import { Route as LayoutPurchaseMouldOrdersIndexImport } from './routes/_layout.purchase-mould-orders/index'
import { Route as LayoutPartnersIndexImport } from './routes/_layout.partners/index'
import { Route as LayoutPackagingsIndexImport } from './routes/_layout.packagings/index'
import { Route as LayoutMouldsIndexImport } from './routes/_layout.moulds/index'
import { Route as LayoutLocationsIndexImport } from './routes/_layout.locations/index'
import { Route as LayoutPartnersIdImport } from './routes/_layout.partners/$id'
import { Route as LayoutPackagingsCreateImport } from './routes/_layout.packagings/create'
import { Route as LayoutPackagingsIdImport } from './routes/_layout.packagings/$id'

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutIndexRoute = LayoutIndexImport.update({
  path: '/',
  getParentRoute: () => LayoutRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  path: '/auth/login',
  getParentRoute: () => rootRoute,
} as any)

const LayoutPurchaseMouldOrdersIndexRoute =
  LayoutPurchaseMouldOrdersIndexImport.update({
    path: '/purchase-mould-orders/',
    getParentRoute: () => LayoutRoute,
  } as any)

const LayoutPartnersIndexRoute = LayoutPartnersIndexImport.update({
  path: '/partners/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutPackagingsIndexRoute = LayoutPackagingsIndexImport.update({
  path: '/packagings/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutMouldsIndexRoute = LayoutMouldsIndexImport.update({
  path: '/moulds/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutLocationsIndexRoute = LayoutLocationsIndexImport.update({
  path: '/locations/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutPartnersIdRoute = LayoutPartnersIdImport.update({
  path: '/partners/$id',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutPackagingsCreateRoute = LayoutPackagingsCreateImport.update({
  path: '/packagings/create',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutPackagingsIdRoute = LayoutPackagingsIdImport.update({
  path: '/packagings/$id',
  getParentRoute: () => LayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_layout': {
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/auth/login': {
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof rootRoute
    }
    '/_layout/': {
      preLoaderRoute: typeof LayoutIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/packagings/$id': {
      preLoaderRoute: typeof LayoutPackagingsIdImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/packagings/create': {
      preLoaderRoute: typeof LayoutPackagingsCreateImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/partners/$id': {
      preLoaderRoute: typeof LayoutPartnersIdImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/locations/': {
      preLoaderRoute: typeof LayoutLocationsIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/moulds/': {
      preLoaderRoute: typeof LayoutMouldsIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/packagings/': {
      preLoaderRoute: typeof LayoutPackagingsIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/partners/': {
      preLoaderRoute: typeof LayoutPartnersIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/purchase-mould-orders/': {
      preLoaderRoute: typeof LayoutPurchaseMouldOrdersIndexImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  LayoutRoute.addChildren([
    LayoutIndexRoute,
    LayoutPackagingsIdRoute,
    LayoutPackagingsCreateRoute,
    LayoutPartnersIdRoute,
    LayoutLocationsIndexRoute,
    LayoutMouldsIndexRoute,
    LayoutPackagingsIndexRoute,
    LayoutPartnersIndexRoute,
    LayoutPurchaseMouldOrdersIndexRoute,
  ]),
  AuthLoginRoute,
])

/* prettier-ignore-end */
