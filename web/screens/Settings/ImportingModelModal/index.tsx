import { useCallback, useEffect, useRef } from 'react'

import { ModelEvent, events } from '@janhq/core'
import {
  Button,
  Modal,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from '@janhq/uikit'
import { useAtomValue, useSetAtom } from 'jotai'

import useImportModel, {
  getImportModelStageAtom,
  setImportModelStageAtom,
} from '@/hooks/useImportModel'

import { openFileTitle } from '@/utils/titleUtils'

import { selectedImportModelOptionTypeAtom } from '../ImportModelOptionModal'
import { importingModelsAtom, updateImportingModelStatusAtom } from '../Models'

import ImportingModelItem from './ImportingModelItem'

import { janDataFolderPathAtom } from '@/helpers/atoms/AppConfig.atom'

const ImportingModelModal: React.FC = () => {
  const importingModels = useAtomValue(importingModelsAtom)
  const importModelStage = useAtomValue(getImportModelStageAtom)
  const setImportModelStage = useSetAtom(setImportModelStageAtom)
  const janDataFolder = useAtomValue(janDataFolderPathAtom)

  const { importModel } = useImportModel()
  const updateImportingModelStatus = useSetAtom(updateImportingModelStatusAtom)
  const importOption = useAtomValue(selectedImportModelOptionTypeAtom)
  const isImportingModel = useRef(false) // TODO: might need to delete this, using WAITING status instead

  useEffect(() => {
    const startImportingModels = async () => {
      if (!isImportingModel.current) {
        isImportingModel.current = true

        const unimportedModels = importingModels.filter(
          (model) => model.status === 'IMPORTING'
        )
        if (unimportedModels.length === 0) return

        console.log('importingModels', importingModels)
        for (const importingModel of unimportedModels) {
          try {
            const modelInfo = await importModel(
              importingModel.path,
              importOption
            )
            if (!modelInfo) {
              continue
            }
            updateImportingModelStatus(
              importingModel.id,
              modelInfo.id,
              'IMPORTED'
            )
          } catch (error) {
            console.error('Error importing model', error)
          }
        }
      }
    }

    startImportingModels()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const finishedImportModel = importingModels.filter(
    (model) => model.status === 'IMPORTED'
  ).length

  const onCancelClick = useCallback(() => {
    setImportModelStage('CONFIRM_CANCEL')
  }, [setImportModelStage])

  const isImportSuccessAllModels = importingModels.every(
    (model) => model.status === 'IMPORTED'
  )

  const onImportSuccessConfirmClick = () => {
    if (isImportSuccessAllModels) {
      // reload
      events.emit(ModelEvent.OnModelsUpdate, {})
      setImportModelStage('NONE')
    }
    // TODO: handle failed case
  }

  return (
    <Modal
      open={importModelStage === 'IMPORTING_MODEL'}
      onOpenChange={() => {}}
    >
      <ModalContent>
        <ModalHeader>
          <ModalTitle>
            Importing model ({finishedImportModel} / {importingModels.length})
          </ModalTitle>
          <div className="flex flex-row space-x-2">
            <p>{janDataFolder}</p>
            <p>{openFileTitle()}</p>
          </div>
        </ModalHeader>
        {!isImportSuccessAllModels && (
          <div className="flex flex-row justify-between">
            <p>Importing...</p>
            <p onClick={onCancelClick}>Cancel</p>
          </div>
        )}

        <div className="space-y-3">
          {importingModels.map((model) => (
            <ImportingModelItem
              isFinished={model.status === 'IMPORTED'}
              key={model.id}
              {...model}
            />
          ))}
        </div>

        {isImportSuccessAllModels && (
          <ModalClose asChild>
            <Button themes="primary" onClick={onImportSuccessConfirmClick}>
              OK
            </Button>
          </ModalClose>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ImportingModelModal
