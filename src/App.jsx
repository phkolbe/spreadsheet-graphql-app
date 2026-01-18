import { useState } from 'react'
import FileUpload from './components/FileUpload'
import DataProcessor from './components/DataProcessor'
import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const [parsedData, setParsedData] = useState(null)

  const handleFileSelect = (selectedFile, data) => {
    setFile(selectedFile)
    setParsedData(data)
  }

  const handleReset = () => {
    setFile(null)
    setParsedData(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Spreadsheet to GraphQL</h1>
        <p>Upload a spreadsheet to update data via GraphQL API</p>
      </header>
      
      <main className="app-main">
        {!parsedData ? (
          <FileUpload onFileSelect={handleFileSelect} />
        ) : (
          <DataProcessor 
            file={file}
            data={parsedData} 
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  )
}

export default App
