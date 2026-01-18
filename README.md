# Spreadsheet to GraphQL Web Application

A modern web application that allows you to upload spreadsheets (Excel or CSV) and process each row through a GraphQL API to update data.

## Features

- 📊 **Spreadsheet Upload**: Drag-and-drop or click to upload Excel (.xlsx, .xls) or CSV files
- 🔍 **Data Preview**: Preview your data before processing
- 🔌 **GraphQL Integration**: Configure your GraphQL endpoint and mutation query
- ⚡ **Batch Processing**: Process all rows automatically with progress tracking
- 📈 **Results Dashboard**: See success/failure statistics and error details
- 🎨 **Modern UI**: Beautiful, responsive interface with dark mode support

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Usage

1. **Upload Spreadsheet**: Drag and drop or click to upload your spreadsheet file
2. **Review Data**: Check the preview to ensure your data is parsed correctly
3. **Configure GraphQL**:
   - Enter your GraphQL endpoint URL (e.g., `https://api.example.com/graphql`)
   - Enter your GraphQL mutation query (example provided)
4. **Process**: Click "Process All Rows" to send each row through the GraphQL API
5. **Review Results**: See success/failure statistics and any errors

## GraphQL Mutation Example

The application expects a mutation query that accepts variables. Here's an example:

```graphql
mutation UpdateData($input: UpdateInput!) {
  updateData(input: $input) {
    id
    success
  }
}
```

Each row from your spreadsheet will be passed as the `input` variable. Make sure your GraphQL schema matches the column headers in your spreadsheet.

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **xlsx**: Excel file parsing
- **graphql-request**: Lightweight GraphQL client

## Notes

- The first row of your spreadsheet should contain column headers
- Empty rows are automatically filtered out
- Each row is processed sequentially to avoid overwhelming the API
- You can customize the GraphQL mutation query to match your API schema

## License

MIT
