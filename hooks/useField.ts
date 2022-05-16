import React, { useState } from 'react'

interface UseFieldReturn {
    type: string;
    placeholder: string;
    value: string;
    onChange: (arg: React.SyntheticEvent) => void;
    reset: () => void;
}

type UseFieldFunction = (arg1: string, arg2: string) => UseFieldReturn;

export const useField: UseFieldFunction = (type, placeholder) => {
  const [value, setValue] = useState('')

  const onChange = (e: React.SyntheticEvent) => {
    var target = e.target as HTMLInputElement;
    setValue(target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    placeholder,
    value,
    onChange,
    reset
  }
}

