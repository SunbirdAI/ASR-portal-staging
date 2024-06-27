import React from 'react'
import { CheckCircle2, TriangleAlert } from 'lucide-react'

const FormError = ({ message }) => {
  if (!message) return null
  return (
    <div className='border border-transparent bg-red-100 w-full text-red-500 rounded-md flex items-center justify-center gap-3 p-4 mb-2'>
      <TriangleAlert size={25} className='w-5 h-5 text-danger shrink-0' />

      <span className='text-sm'>{message}</span>
    </div>
  )
}

const FormSuccess = ({ message }) => {
  if (!message) return null
  return (
    <div className='border border-transparent backdrop-blur-sm bg-emerald-100 w-full rounded-md text-emerald-500 flex items-center justify-center gap-3  p-4 mb-2'>
      <CheckCircle2 size={25} className='w-5 h-5 text-success shrink-0' />

      <span className='text-sm'>{message}</span>
    </div>
  )
}

export { FormError, FormSuccess }