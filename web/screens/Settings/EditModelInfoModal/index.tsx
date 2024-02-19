import { useEffect, useState } from 'react'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalFooter,
  ModalClose,
  Button,
  Input,
  Textarea,
} from '@janhq/uikit'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'

import { Paperclip } from 'lucide-react'

import useImportModel, {
  getImportModelStageAtom,
  setImportModelStageAtom,
} from '@/hooks/useImportModel'

import { toGibibytes } from '@/utils/converter'

import { openFileTitle } from '@/utils/titleUtils'

import { importingModelsAtom, updateImportingModelAtom } from '../Models'

import { janDataFolderPathAtom } from '@/helpers/atoms/AppConfig.atom'

export const editingModelIdAtom = atom<string | undefined>(undefined)

const EditModelInfoModal: React.FC = () => {
  const importModelStage = useAtomValue(getImportModelStageAtom)
  const importingModels = useAtomValue(importingModelsAtom)
  const setImportModelStage = useSetAtom(setImportModelStageAtom)
  const [editingModelId, setEditingModelId] = useAtom(editingModelIdAtom)

  const [modelName, setModelName] = useState('')
  const [modelId, setModelId] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const janDataFolder = useAtomValue(janDataFolderPathAtom)
  const updateImportingModel = useSetAtom(updateImportingModelAtom)
  const { updateModelInfo } = useImportModel()

  const editingModel = importingModels.find(
    (model) => model.id === editingModelId
  )

  useEffect(() => {
    if (editingModel && editingModel.modelId != null) {
      setModelName(editingModel.name)
      setModelId(editingModel.modelId)
      setDescription(editingModel.description)
      setTags(editingModel.tags)
    }
  }, [editingModel])

  const onCancelClick = () => {
    setImportModelStage('IMPORTING_MODEL')
    setEditingModelId(undefined)
  }

  const onSaveClick = async () => {
    if (!editingModel || !editingModel.modelId) return

    await updateModelInfo(editingModel.modelId, modelName, description, tags)

    updateImportingModel(editingModel.id, modelName, modelId, description, tags)

    setImportModelStage('IMPORTING_MODEL')
    setEditingModelId(undefined)
  }

  if (!editingModel) {
    setImportModelStage('IMPORTING_MODEL')
    setEditingModelId(undefined)

    return null
  }

  return (
    <Modal
      open={importModelStage === 'EDIT_MODEL_INFO'}
      onOpenChange={() => onCancelClick()}
    >
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Edit Model Information</ModalTitle>
        </ModalHeader>

        <div className="flex flex-row p-4 border rounded-xl space-x-4">
          <div className="flex w-10 h-10 rounded-full bg-blue-400 items-center justify-center">
            <Paperclip />
          </div>

          <div className="flex flex-col">
            <p>{editingModel.name}</p>
            <div className="flex flex-row">
              <p>{toGibibytes(editingModel.size)}</p>
              <p>Format</p>
              <p>{editingModel.format}</p>
            </div>
            <div className="flex flex-row mt-1 space-x-2">
              <p>{janDataFolder}</p>
              <p>{openFileTitle()}</p>
            </div>
          </div>
        </div>

        <form className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="mb-1">Model Name</label>
            <Input
              value={modelName}
              onChange={(e) => {
                e.preventDefault()
                setModelName(e.target.value)
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Model ID</label>
            <Input
              disabled
              value={modelId}
              onChange={(e) => {
                e.preventDefault()
                setModelId(e.target.value)
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Description</label>
            <Textarea
              value={description}
              onChange={(e) => {
                e.preventDefault()
                setDescription(e.target.value)
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Tags</label>
            <Input />
          </div>
        </form>

        <ModalFooter>
          <div className="flex gap-x-2">
            <ModalClose asChild onClick={onCancelClick}>
              <Button themes="ghost">Cancel</Button>
            </ModalClose>
            <ModalClose asChild>
              <Button autoFocus themes="primary" onClick={onSaveClick}>
                Save
              </Button>
            </ModalClose>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditModelInfoModal
