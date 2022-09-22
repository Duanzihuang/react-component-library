import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload, UploadFile } from './upload'

const defaultFileList: UploadFile[] = [
  {
    uid: '123',
    size: 1234,
    name: 'hello.md',
    status: 'uploading',
    percent: 30
  },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('file too big')
    return false
  }

  return true
}

const filePromise = (file: File) => {
  // const newFile = new File([file], 'new_name.docx', { type: file.type })
  const newFile = new File([file], file.name, { type: file.type })

  return Promise.resolve(newFile)
}

const SimpleUpload = () => {
  return (
    <Upload
      action='https://toutiao.itheima.net/v1_0/upload'
      onChange={action('changed')}
      // beforeUpload={checkFileSize}
      beforeUpload={filePromise}
      defaultFileList={defaultFileList}
      onRemove={action('remove')}
      name='image'
      data={{ key: 'value' }}
      headers={{ 'X-Powered-By': 'vikingship' }}
      accept='.jpg'
      multiple
      drag
    />
  )
}

storiesOf('Upload component', module).add('Upload', SimpleUpload)
