import { ModelImportOption } from '@janhq/core'
import { Checkbox } from '@janhq/uikit'

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

  return (
    <div className="flex flex-row" onClick={onCheckedChange}>
      <Checkbox
        checked={selectedOptionType === option.type}
        onCheckedChange={onCheckedChange}
      />
      <div className="ml-2 cursor-pointer">
        <p className="mb-2 font-medium text-sm">{option.title}</p>
        <p className="font-normal text-sm">{option.description}</p>
      </div>
    </div>
  )
}

export default ImportModelOptionSelection
