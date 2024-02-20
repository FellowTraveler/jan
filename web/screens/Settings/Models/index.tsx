import { useCallback, useState } from 'react'

import { useDropzone } from 'react-dropzone'

import { Button, Input, ScrollArea } from '@janhq/uikit'

import { atom, useAtomValue, useSetAtom } from 'jotai'
import { Plus, SearchIcon, UploadCloudIcon } from 'lucide-react'

import { twMerge } from 'tailwind-merge'

import { v4 as uuidv4 } from 'uuid'

import {
  getImportModelStageAtom,
  setImportModelStageAtom,
} from '@/hooks/useImportModel'

import CancelModelImportModal from '../CancelModelImportModal'
import EditModelInfoModal from '../EditModelInfoModal'
import ImportModelOptionModal from '../ImportModelOptionModal'

import ImportingModelModal from '../ImportingModelModal'

import SelectingModelModal from '../SelectingModelModal'

import RowModel from './Row'

import { downloadedModelsAtom } from '@/helpers/atoms/Model.atom'

const Column = ['Name', 'Model ID', 'Size', 'Version', 'Status', '']

export type ImportingModelStatus = 'IMPORTING' | 'IMPORTED' | 'FAILED'

export type ImportingModel = {
  id: string
  modelId: string | undefined
  name: string
  description: string
  path: string
  tags: string[]
  size: number
  status: ImportingModelStatus
  format: string
}

// store the paths of the models that are being imported
export const importingModelsAtom = atom<ImportingModel[]>([])

export const updateImportingModelStatusAtom = atom(
  null,
  (
    get,
    set,
    importId: string,
    modelId: string,
    status: ImportingModelStatus
  ) => {
    const model = get(importingModelsAtom).find((x) => x.id === importId)
    if (!model) return
    const newModel: ImportingModel = {
      ...model,
      modelId,
      status,
    }
    const newList = get(importingModelsAtom).map((x) =>
      x.id === importId ? newModel : x
    )
    set(importingModelsAtom, newList)
  }
)

export const updateImportingModelAtom = atom(
  null,
  (
    get,
    set,
    importId: string,
    name: string,
    id: string,
    description: string,
    tags: string[]
  ) => {
    const model = get(importingModelsAtom).find((x) => x.id === importId)
    if (!model) return
    const newModel: ImportingModel = {
      ...model,
      name,
      id,
      description,
      tags,
    }
    const newList = get(importingModelsAtom).map((x) =>
      x.id === importId ? newModel : x
    )
    set(importingModelsAtom, newList)
  }
)

const Models: React.FC = () => {
  const downloadedModels = useAtomValue(downloadedModelsAtom)
  const setImportModelStage = useSetAtom(setImportModelStageAtom)
  const setImportingModels = useSetAtom(importingModelsAtom)
  const [searchValue, setsearchValue] = useState('')

  const importModelStage = useAtomValue(getImportModelStageAtom)

  const filteredDownloadedModels = downloadedModels
    .filter((x) => x.name?.toLowerCase().includes(searchValue.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name))

  const { getRootProps, isDragActive } = useDropzone({
    noClick: true,
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

      setImportingModels(importingModels)
      setImportModelStage('MODEL_SELECTED')
    },
  })

  const onImportModelClick = useCallback(() => {
    setImportModelStage('SELECTING_MODEL')
  }, [setImportModelStage])

  return (
    <ScrollArea className="w-full h-full" {...getRootProps()}>
      {isDragActive && (
        <div className="absolute z-50 mx-auto h-full w-full bg-background/50 p-8 backdrop-blur-lg">
          <div
            className={twMerge(
              'flex h-full w-full items-center justify-center rounded-lg border border-dashed border-blue-500'
            )}
          >
            <div className="mx-auto w-1/2 text-center">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-200">
                <UploadCloudIcon size={24} className="text-blue-600" />
              </div>
              <div className="mt-4 text-blue-600">
                <h6 className="font-bold">Drop file here</h6>
                <p className="mt-2">File (GGUF) or folder</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="rounded-xl border border-border shadow-sm m-4">
        <div className="flex flex-row px-6 py-5 justify-between">
          <div className="relative w-1/3">
            <SearchIcon
              size={20}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search"
              className="pl-8"
              onChange={(e) => {
                setsearchValue(e.target.value)
              }}
            />
          </div>

          <Button
            themes={'outline'}
            className="space-x-2"
            onClick={onImportModelClick}
          >
            <Plus className="w-3 h-3" />
            <p>Import Model</p>
          </Button>
        </div>
        <table className="relative w-full px-8">
          <thead className="w-full border-b border-border bg-secondary">
            <tr>
              {Column.map((col) => (
                <th
                  key={col}
                  className="px-6 py-2 text-left font-normal last:text-center"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredDownloadedModels
              ? filteredDownloadedModels.map((x) => (
                  <RowModel key={x.id} data={x} />
                ))
              : null}
          </tbody>
        </table>

        {importModelStage === 'SELECTING_MODEL' && <SelectingModelModal />}
        {importModelStage === 'MODEL_SELECTED' && <ImportModelOptionModal />}
        {importModelStage === 'IMPORTING_MODEL' && <ImportingModelModal />}
        {importModelStage === 'EDIT_MODEL_INFO' && <EditModelInfoModal />}
        {importModelStage === 'CONFIRM_CANCEL' && <CancelModelImportModal />}
      </div>
    </ScrollArea>
  )
}

export default Models
