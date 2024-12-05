import { ChangeEvent, FormEventHandler, useCallback, useEffect, useRef, useState } from 'react'

type Args = {
  defaultValue: string | number | readonly string[]
  rows: number
  onChange?: FormEventHandler<HTMLTextAreaElement>
  maxRows?: number
}

export function useResizebleTextArea({ defaultValue, rows, onChange, maxRows }: Args) {
  const [value, setValue] = useState(defaultValue)
  const [rowsCounter, setRowsCounter] = useState(rows)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    setValue(value)
    onChange?.(event)
    const newLineCounter = value.split('\n').length
    updateRowsCounter(newLineCounter)
  }

  const updateRowsCounter = useCallback((value: number) => {
    if (maxRows && value >= maxRows) {
      setRowsCounter(maxRows)
      return
    }
  
    setRowsCounter(value)
  }, [maxRows])

  useEffect(() => {
    if (rowsCounter < rows) {
      updateRowsCounter(rows)
    }
    if (rowsCounter >= rows) {
      textareaRef.current?.setAttribute('rows', String(rowsCounter))
    }
  }, [rowsCounter, rows, updateRowsCounter])

  useEffect(() => {
    const newLineCounter = String(defaultValue).split('\n').length
    updateRowsCounter(newLineCounter)
  }, [defaultValue, updateRowsCounter])

  return {
    value,
    handleOnChange,
    textareaRef,
  }
}