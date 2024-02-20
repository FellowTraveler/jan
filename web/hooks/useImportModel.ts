import { useCallback } from 'react'

import {
  ExtensionTypeEnum,
  Model,
  ModelExtension,
  OptionType,
} from '@janhq/core'

import { atom } from 'jotai'

import { extensionManager } from '@/extension'

export type ImportModelStage =
  | 'NONE'
  | 'SELECTING_MODEL'
  | 'MODEL_SELECTED'
  | 'IMPORTING_MODEL'
  | 'EDIT_MODEL_INFO'
  | 'CONFIRM_CANCEL'

const importModelStageAtom = atom<ImportModelStage>('NONE')

export const getImportModelStageAtom = atom((get) => get(importModelStageAtom))

export const setImportModelStageAtom = atom(
  null,
  (_get, set, stage: ImportModelStage) => {
    set(importModelStageAtom, stage)
  }
)

export type ModelUpdate = {
  name: string
  description: string
  tags: string[]
}

const useImportModel = () => {
  /**
   * Used to import a single model.
   *
   * @param path - The path to the model (gguf file).
   */
  const importModel = useCallback(
    async (path: string, optionType: OptionType) =>
      localImportModel(path, optionType),
    []
  )

  const updateModelInfo = useCallback(
    async (
      modelId: string,
      modelName: string,
      modelDescription: string,
      modelTags: string[]
    ) => localUpdateModelInfo(modelId, modelName, modelDescription, modelTags),
    []
  )

  return { importModel, updateModelInfo }
}

const localImportModel = async (
  path: string,
  optionType: OptionType
): Promise<Model | undefined> =>
  extensionManager
    .get<ModelExtension>(ExtensionTypeEnum.Model)
    ?.importModel(path, optionType)

const localUpdateModelInfo = async (
  modelId: string,
  modelName: string,
  modelDescription: string,
  modelTags: string[]
): Promise<Model | undefined> =>
  extensionManager
    .get<ModelExtension>(ExtensionTypeEnum.Model)
    ?.updateModelInfo(modelId, modelName, modelDescription, modelTags)

export default useImportModel
