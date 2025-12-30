"use client"

import React, { useMemo, useState } from "react"
import countryList from "react-select-country-list"
import { Controller } from "react-hook-form"
import { Label } from "@/components/ui/label"
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CountryOption = {
  label: string
  value: string
}

const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

const CountrySelectField = ({ name, label, control, required = false }: CountrySelectProps) => {
  const options = useMemo<CountryOption[]>(() => countryList().getData(), [])
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>

      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please select ${label.toLowerCase()}` : false,
        }}
        render={({ field }) => {
          const selected = options.find(o => o.value === field.value)

          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn("w-full justify-between")}
                >
                  <span className="mr-2">
                {selected ? getFlagEmoji(selected.value) : null}
                </span>
                  {selected ? selected.label : `Select ${label.toLowerCase()}`}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search for your country" />
                  <CommandList>
                    {options.map(option => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(currentValue) => {
                          field.onChange(currentValue)
                          setOpen(false)
                        }}
                      >
                        <span className="mr-2">
                        {getFlagEmoji(option.value)}
                        </span>
                        <span>
                        {option.label}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )
        }}
      />
    </div>
  )
}

export default CountrySelectField
