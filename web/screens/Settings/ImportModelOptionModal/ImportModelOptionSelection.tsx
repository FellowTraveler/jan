import { ModelImportOption } from '@janhq/core'

import { useAtom } from 'jotai'

import { selectedImportModelOptionTypeAtom } from '.'

type Props = {
  option: ModelImportOption
}

const ImportModelOptionSelection: React.FC<Props> = ({ option }) => {
  const [selectedOptionType, setSelectedOptionType] = useAtom(
    selectedImportModelOptionTypeAtom
  )

  const onCheckedChange = () => {
    if (selectedOptionType !== option.type) {
      setSelectedOptionType(option.type)
    }
  }

  const checked = selectedOptionType === option.type

  return (
    <div className="flex flex-row cursor-pointer" onClick={onCheckedChange}>
      <div className="flex w-5 h-5 rounded-full border border-[#2563EB] items-center justify-center">
        {checked && <div className="w-2 h-2 bg-primary rounded-full" />}
      </div>

      <div className="ml-2 flex-1">
        <p className="mb-2 font-medium text-sm text-[#09090B]">
          {option.title}
        </p>
        <p className="font-normal text-sm text-[#71717A]">
          {option.description}
        </p>
      </div>
    </div>
  )
}

export default ImportModelOptionSelection
