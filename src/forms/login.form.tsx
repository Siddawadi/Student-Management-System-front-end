
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../components/common/inputs/input'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { LoginSchema } from '../schemas/auth.schema'
import type { LoginInput } from '../types/login.types'
import { login } from '../api/auth.api'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import { useState } from 'react'

export const Loginform = () => {
  const navigate = useNavigate()
  const [accessDenied, setAccessDenied] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(LoginSchema),
  })

  const { mutate, isPending, isError } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const role = response?.data?.role
      console.log(role)
      if (role === "ADMIN") {
        navigate("/admin/dashboard")
      } else {
        setAccessDenied(true)  // ✅ show message via state
      }
    },
    onError: (error) => {
      console.log("login error", error)
    }
  })

  const onSubmit: SubmitHandler<LoginInput> = (FormData) => {
    setAccessDenied(false)  // reset on new submit
    mutate(FormData)
  }

  return (
    <div className='flex flex-col items-center gap-2 p-2'>
      {isError && <p className='text-red-500 text-sm'>Invalid credentials</p>}
      {accessDenied && <p className='text-red-500 text-sm'>Access denied. Admins only.</p>}

      <p className="font-semibold text-2xl">Login page</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col w-80'>
          <Input label='email' register={register} type="text"
            placeholder="enter your email here" name="email" id="email" error={errors?.email?.message} />
          <Input label='Password' register={register} type="password"
            placeholder="enter your password here" name="password" id="password" error={errors?.password?.message} />
        </div>
        <div className='min-h-10 min-w-full p-5'>
          <button type='submit' disabled={isPending}
            className="min-h-10 bg-green-900 min-w-full rounded-2xl hover:border-2 px-3 text-white hover:border-amber-50">
            {isPending ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
       <span> <Link to="/register" className="text-xs flex justify-center items-center hover:underline">Don't have an account?</Link></span>
    </div>
  )
}