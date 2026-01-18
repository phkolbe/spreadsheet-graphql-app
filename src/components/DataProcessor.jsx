import { useState } from 'react'
import { GraphQLClient } from 'graphql-request'
import './DataProcessor.css'

function DataProcessor({ file, data, onReset }) {
  const [graphqlEndpoint, setGraphqlEndpoint] = useState('')
  const [mutationQuery, setMutationQuery] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  // Example mutation template - user can customize
  const defaultMutation = `mutation UpdateData($input: UpdateInput!) {
    updateData(input: $input) {
      id
      success
    }
  }`

  const processData = async () => {
    if (!graphqlEndpoint.trim()) {
      setError('Please enter a GraphQL endpoint URL')
      return
    }

    if (!mutationQuery.trim()) {
      setError('Please enter a GraphQL mutation query')
      return
    }

    setIsProcessing(true)
    setError(null)
    
    const client = new GraphQLClient(graphqlEndpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const processedResults = {
      total: data.rows.length,
      success: 0,
      failed: 0,
      errors: [],
    }

    // Process each row
    for (let i = 0; i < data.rows.length; i++) {
      const row = data.rows[i]
      
      try {
        // Extract variables from row data
        // You may need to adjust this based on your GraphQL schema
        const variables = {
          input: row
        }

        // Execute mutation
        await client.request(mutationQuery, variables)
        
        processedResults.success++
      } catch (err) {
        processedResults.failed++
        processedResults.errors.push({
          row: i + 1,
          data: row,
          error: err.message || 'Unknown error',
        })
      }
    }

    setResults(processedResults)
    setIsProcessing(false)
  }

  return (
    <div className="data-processor">
      <div className="processor-header">
        <div>
          <h2>File: {file.name}</h2>
          <p>{data.rows.length} rows ready to process</p>
        </div>
        <button className="reset-btn" onClick={onReset}>
          Upload New File
        </button>
      </div>

      <div className="preview-section">
        <h3>Data Preview (First 5 rows)</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {data.headers.map((header, idx) => (
                  <th key={idx}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.slice(0, 5).map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {data.headers.map((header, colIdx) => (
                    <td key={colIdx}>{row[header] ?? ''}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="config-section">
        <div className="config-item">
          <label htmlFor="endpoint">GraphQL Endpoint URL:</label>
          <input
            id="endpoint"
            type="text"
            value={graphqlEndpoint}
            onChange={(e) => setGraphqlEndpoint(e.target.value)}
            placeholder="https://api.example.com/graphql"
            disabled={isProcessing}
          />
        </div>

        <div className="config-item">
          <label htmlFor="mutation">GraphQL Mutation Query:</label>
          <textarea
            id="mutation"
            value={mutationQuery || defaultMutation}
            onChange={(e) => setMutationQuery(e.target.value)}
            placeholder="Enter your GraphQL mutation query..."
            rows="8"
            disabled={isProcessing}
          />
        </div>

        <button
          className="process-btn"
          onClick={processData}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Process All Rows'}
        </button>
      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}

      {results && (
        <div className="results-section">
          <h3>Processing Results</h3>
          <div className="results-stats">
            <div className="stat-card success">
              <div className="stat-value">{results.success}</div>
              <div className="stat-label">Successful</div>
            </div>
            <div className="stat-card failed">
              <div className="stat-value">{results.failed}</div>
              <div className="stat-label">Failed</div>
            </div>
            <div className="stat-card total">
              <div className="stat-value">{results.total}</div>
              <div className="stat-label">Total</div>
            </div>
          </div>

          {results.errors.length > 0 && (
            <div className="errors-list">
              <h4>Errors:</h4>
              <div className="errors-container">
                {results.errors.slice(0, 10).map((errorItem, idx) => (
                  <div key={idx} className="error-item">
                    <strong>Row {errorItem.row}:</strong> {errorItem.error}
                  </div>
                ))}
                {results.errors.length > 10 && (
                  <p className="more-errors">
                    ... and {results.errors.length - 10} more errors
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DataProcessor
