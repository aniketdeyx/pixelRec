'use client'

import FormField from '@/components/FormField'
import  FileInput  from '@/components/FileInput'
import React, { useState, ChangeEvent } from 'react'

const Page = () => {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    visibility: 'public'
  })
  const [error, setError] = useState(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (
      {...prev, [name]: value }
    ))

  }

  return (

    <div className='mt-9 max-w-[95%] mx-auto'>

        <h1 className='text-2xl font-bold'>Upload</h1>
        {error && <div className="error-field">{error}</div>}
        <div className='shadow-md p-5 max-w-[55vw] mx-auto mt-3'>
            <FormField
                id="title"
                label="Title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter title"
            />
            <FormField
          id="description"
          label="Description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Briefly describe what this video is about"
          as="textarea"
        />
            <FileInput />
        </div>
    </div>
  )
}

export default Page