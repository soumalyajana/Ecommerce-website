import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(`${backendUrl}api/user/admin-login`, {
        email,
        password,
      })

      if (response.data.success) {
        setToken(response.data.token)
        toast.success('Login successful!')
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.error('❌ Login failed:', err.response?.data || err.message)
      toast.error(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-[90%] max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <p className="mb-1 text-gray-700">Email Address</p>
            <input
              type="email"
              placeholder="your@email.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="mb-6">
            <p className="mb-1 text-gray-700">Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
