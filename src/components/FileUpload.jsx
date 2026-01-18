import { useState, useRef } from 'react'
import * as XLSX from 'xlsx'
import './FileUpload.css'

function FileUpload({ onFileSelect }) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const parseFile = (file) => {
    setError(null)
    
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        
        // Get the first sheet
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        
        // Convert to JSON with header row
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
        
        if (jsonData.length === 0) {
          setError('Spreadsheet is empty')
          return
        }
        
        // First row is headers
        const headers = jsonData[0]
        const rows = jsonData.slice(1).filter(row => row.some(cell => cell !== undefined && cell !== ''))
        
        // Convert to array of objects
        const dataObjects = rows.map(row => {
          const obj = {}
          headers.forEach((header, index) => {
            obj[header] = row[index] !== undefined ? row[index] : null
          })
          return obj
        })
        
        onFileSelect(file, {
          headers,
          rows: dataObjects,
          originalData: jsonData
        })
      } catch (err) {
        setError(`Error parsing file: ${err.message}`)
      }
    }
    
    reader.onerror = () => {
      setError('Error reading file')
    }
    
    reader.readAsArrayBuffer(file)
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      parseFile(selectedFile)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.name.endsWith('.xlsx') || droppedFile.name.endsWith('.xls') || droppedFile.name.endsWith('.csv'))) {
      parseFile(droppedFile)
    } else {
      setError('Please upload a valid Excel file (.xlsx, .xls) or CSV file')
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="file-upload-container">
      <div
        className={`file-upload-area ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <div className="upload-content">
          <svg
            className="upload-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <h3>Drop your spreadsheet here</h3>
          <p>or click to browse</p>
          <p className="file-types">Supports: .xlsx, .xls, .csv</p>
        </div>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  )
}

export default FileUpload
