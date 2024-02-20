import { useDropzone } from 'react-dropzone'

import { Modal, ModalContent, ModalHeader, ModalTitle } from '@janhq/uikit'
import { useAtomValue } from 'jotai'

import { UploadCloudIcon } from 'lucide-react'

import { v4 as uuidv4 } from 'uuid'

import { getImportModelStageAtom } from '@/hooks/useImportModel'

import { ImportingModel } from '../Models'

const SelectingModelModal: React.FC = () => {
  const importModelStage = useAtomValue(getImportModelStageAtom)
  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,

    onDrop: (acceptedFiles: File[]) => {
      // TODO: filter the files which ended with .gguf

      const importingModels: ImportingModel[] = acceptedFiles
        .filter((file) => file.path != null)
        .map((file) => {
          const fileName = file.name.replaceAll('.gguf', '')
          return {
            id: uuidv4(),
            modelId: undefined,
            name: fileName,
            description: '',
            path: file.path,
            tags: [],
            size: file.size,
            status: 'IMPORTING',
            format: 'gguf',
          }
        })
      if (importingModels.length === 0) return
    },
  })

  const borderColor = isDragActive ? 'border-primary' : 'border-[#F4F4F5]'
  const textColor = isDragActive ? 'text-primary' : 'text-[#71717A]'
  const dragAndDropBgColor = isDragActive ? 'bg-[#EFF6FF]' : 'bg-white'
  return (
    <Modal open={importModelStage === 'SELECTING_MODEL'}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Import Model</ModalTitle>

          <p className="text-[#71717A] font-medium text-sm">
            Import any model file or files. Your imported model will be private
            to you.
          </p>
        </ModalHeader>

        <div
          className={`flex w-full h-[172px] border rounded-md items-center justify-center ${borderColor} ${dragAndDropBgColor}`}
          {...getRootProps()}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-200">
              <UploadCloudIcon size={24} className="text-blue-600" />
            </div>

            <div className="mt-4">
              <span className="text-primary text-sm font-bold">
                Click to upload
              </span>
              <span className={`text-sm ${textColor} font-medium`}>
                {' '}
                or drag and drop
              </span>
            </div>
            <span className={`text-xs font-medium ${textColor}`}>
              File or Folder (GGUF)
            </span>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default SelectingModelModal
