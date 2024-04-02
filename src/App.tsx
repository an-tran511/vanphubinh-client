import './App.css'
import '@mantine/core/styles.layer.css'
import '@mantine/dropzone/styles.layer.css'
import '@mantine/dates/styles.layer.css'
import 'mantine-datatable/styles.layer.css'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from '@tanstack/react-router'

import { Toaster } from 'sonner'
import { AuthProvider } from '@/authContext'
import { useAuth } from '@/hooks/useAuth'
import { theme } from '@/theme'
import { routerClient } from '@/utils/routerClient'
import { queryClient } from '@/utils/queryClient'
import { DatesProvider } from '@mantine/dates'
import 'dayjs/locale/vi'

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    routerClient: typeof routerClient
  }
}

function InnerApp() {
  const auth = useAuth()
  return (
    <RouterProvider router={routerClient} context={{ auth, queryClient }} />
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <AuthProvider>
            <DatesProvider settings={{ locale: 'vi', consistentWeeks: true }}>
              <Toaster richColors />
              <InnerApp />
              <ReactQueryDevtools />
            </DatesProvider>
          </AuthProvider>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App
