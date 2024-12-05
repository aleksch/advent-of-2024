import './resizeble-textarea.css'
import { useResizebleTextArea } from './use-resizeble-textarea'

type Props = React.HTMLProps<HTMLTextAreaElement> & {
  maxRows?: number
}

export function ResizebleTextArea({ maxRows, rows = 2, defaultValue = '', onChange, ...props }: Props) {
  const {
    value,
    handleOnChange,
    textareaRef,
  } = useResizebleTextArea({ rows, defaultValue, onChange, maxRows })

  return (
    <textarea
      className='resizeble-textarea'
      ref={textareaRef}
      value={value}
      onChange={handleOnChange}
      {...props}
    ></textarea>
  )
}
