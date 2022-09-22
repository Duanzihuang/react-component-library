import React from 'react'
import axios from 'axios'

const Index: React.FC = () => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const file = files[0]

      const formData = new FormData()
      formData.append(file.name, file)

      axios
        .post('/api/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(res)
        })
    }
  }

  return (
    <div style={{ marginTop: '100px', marginLeft: '100px' }}>
      <input type='file' onChange={handleFileChange} />
    </div>
  )
}

export default Index
