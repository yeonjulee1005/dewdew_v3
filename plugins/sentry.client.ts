import * as Sentry from '@sentry/vue'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const app = nuxtApp.vueApp
  const router = useRouter()

  Sentry.init({
    app,
    dsn: 'https://af6e95d35134b404d6ac0d7c6c61a09e@o4506513187667968.ingest.sentry.io/4506513194287104',
    environment: process.dev ? 'development' : 'production',
    integrations: [
      new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ['usimsa.com', 'www.usimsa.com', /^\//],
        tracePropagationTargets: ['localhost', /^https:\/\/api.dewdew\.dev/]
      }),
      new Sentry.Replay(
        // {
        //   maskAllText: false,
        //   blockAllMedia: false
        // }
      )
    ],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    tracingOptions: {
      trackComponents: true
    },
    attachProps: true,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.2,
    debug: (config.SENTRY_ENABLE_DEBUG || false) as boolean,
    beforeSend (event, hint) {
      // Check if it is an exception, and if so, log it.
      if (event.exception) {
        console.error(`[Exeption handled by Sentry]: (${hint.originalException})`, { event, hint })
      }
      // Continue sending to Sentry
      return event
    }
  })

  app.mixin(Sentry.createTracingMixins({ trackComponents: true, timeout: 2000, hooks: ['activate', 'mount', 'update'] }))
  Sentry.attachErrorHandler(app, { logErrors: false, attachProps: true, trackComponents: true, timeout: 2000, hooks: ['activate', 'mount', 'update'] })

  return {
    provide: {
      sentrySetContext: (n:any, context:any) => Sentry.setContext(n, context),
      sentrySetUser: (user:any) => Sentry.setUser(user),
      sentrySetTag: (tagName:any, value:any) => Sentry.setTag(tagName, value),
      sentryAddBreadcrumb: (breadcrumb:any) => Sentry.addBreadcrumb(breadcrumb)
    }
  }
})
