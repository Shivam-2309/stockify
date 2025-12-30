import {Label} from "@/components/ui/label"
import { Controller } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const SelectField = ({name, label, placeholder, options, control, error, required = false} : SelectFieldProps) => {
  return (
    <div className='space-y-2'>
        <Label htmlFor = {name} className='form-label'>
            {label}
        </Label>
        <Controller
            name={name}
            control={control}
            rules={{
                required: required ? `Please select ${label.toLowerCase()}` : false,
            }}
            render={({ field }) => (
                    <Select 
                        // value = { field.value }
                        onValueChange={(value) => {
                            field.onChange(value); 
                        }
                    }
                    >
                        <SelectTrigger className="select-trigger">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem 
                                    value={option.value} 
                                    key={option.value} 
                                    className='focus:bg-gray-500 focus:text-white'
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    )}
                />
    </div>
  )
}

export default SelectField