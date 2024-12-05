import { ResizebleTextArea } from './resizeble-textarea/resizeble-textarea'

const defaulTValue = 
`string1
          
string3

string5`

function App() {
  return (
    <>
      <ResizebleTextArea
        rows={5}
        cols={40}
        defaultValue={defaulTValue}
        maxRows={20}
      />
    </>
  )
}

export default App
