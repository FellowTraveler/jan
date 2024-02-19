import React, { useCallback } from 'react'

import { ModelImportOption, OptionType } from '@janhq/core'
import {
  Button,
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@janhq/uikit'
import { atom, useAtomValue, useSetAtom } from 'jotai'

import {
  getImportModelStageAtom,
  setImportModelStageAtom,
} from '@/hooks/useImportModel'

import ImportModelOptionSelection from './ImportModelOptionSelection'

const importOptions: ModelImportOption[] = [
  {
    type: 'SYMLINK',
    title: 'Keep Original Files & Symlink',
    description:
      'You maintain your model files outside of Jan. Keeping your files where they are, and Jan will create a smart link to them.',
  },
  {
    type: 'MOVE_BINARY_FILE',
    title: 'Move model binary file',
    description:
      'Jan will move your model binary file from your current folder into Jan Data Folder.',
  },
]

export const selectedImportModelOptionTypeAtom = atom<OptionType>('SYMLINK')

const ImportModelOptionModal: React.FC = () => {
  const importStage = useAtomValue(getImportModelStageAtom)
  const setImportStage = useSetAtom(setImportModelStageAtom)

  const onCancelClick = useCallback(() => {
    setImportStage('NONE')
  }, [setImportStage])

  const onContinueClick = useCallback(() => {
    setImportStage('IMPORTING_MODEL')
  }, [setImportStage])

  return (
    <Modal open={importStage === 'MODEL_SELECTED'}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>How would you like Jan to handle your models?</ModalTitle>
        </ModalHeader>

        {importOptions.map((option) => (
          <ImportModelOptionSelection key={option.type} option={option} />
        ))}

        <ModalFooter>
          <div className="flex gap-x-2">
            <ModalClose asChild onClick={onCancelClick}>
              <Button themes="ghost">Cancel</Button>
            </ModalClose>
            <ModalClose asChild>
              <Button autoFocus themes="primary" onClick={onContinueClick}>
                Continue Importing
              </Button>
            </ModalClose>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ImportModelOptionModal
