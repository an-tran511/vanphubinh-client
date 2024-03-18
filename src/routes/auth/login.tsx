import {
  createFileRoute,
  getRouteApi,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { Button, Card, Center, Stack, Image, Title } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { TextInput } from 'react-hook-form-mantine'
import { useMutation } from '@tanstack/react-query'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { flushSync } from 'react-dom'
import { email, minLength, object, string, parse, fallback } from 'valibot' // 1.54 kB
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { login } from '@/apis/auth'
import logo from '@/assets/logo.png'

const routeSearchSchema = object({
  redirect: fallback(string(), '/'),
})
export const Route = createFileRoute('/auth/login')({
  component: Login,
  validateSearch: (search) => parse(routeSearchSchema, search),
  beforeLoad: async ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/',
      })
    }
  },
})

const routeApi = getRouteApi('/auth/login')

const loginFormSchema = object({
  email: string([email()]),
  password: string([minLength(6)]),
})

function Login() {
  const navigate = useNavigate()
  const search = routeApi.useSearch()
  const auth = useAuth()

  const { mutate, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: (data) => {
      flushSync(() => {
        auth.setUser(
          { email: data?.user?.email, name: data?.user.name } || null,
        )
      })
      navigate({ to: search.redirect })
    },
    onError: () => {
      toast.error('Đăng nhập thất bại')
    },
  })

  const { clearErrors, handleSubmit, control } = useForm({
    resolver: valibotResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const submitHandler = (data: { email: string; password: string }) => {
    mutate(data)
  }

  return (
    <Center h="100vh">
      <Stack w={{ base: '80%', md: '35%' }} gap="xl">
        <Center>
          <Image src={logo} w={{ base: '60%', md: '35%' }} />
        </Center>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <form
            onSubmit={(e) => {
              clearErrors()
              handleSubmit(submitHandler)(e)
            }}
          >
            <Stack>
              <Center>
                <Title order={3}>Đăng nhập</Title>
              </Center>

              <TextInput
                name="email"
                type="email"
                control={control}
                label="Email"
              />
              <TextInput
                name="password"
                type="password"
                control={control}
                label="Mật khẩu"
              />
              <Button type="submit" loading={isPending}>
                Đăng nhập
              </Button>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Center>
  )
}
