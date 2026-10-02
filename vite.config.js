import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function portfolioApiPlugin() {
  return {
    name: 'portfolio-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : ''

        if (url === '/api/portfolio-data') {
          const dataDir = path.resolve(__dirname, 'src/data')
          const dataFilePath = path.resolve(dataDir, 'portfolioData.json')

          if (req.method === 'GET') {
            if (fs.existsSync(dataFilePath)) {
              try {
                const content = fs.readFileSync(dataFilePath, 'utf-8')
                res.setHeader('Content-Type', 'application/json')
                res.end(content)
                return
              } catch (e) {
                res.statusCode = 500
                res.end(JSON.stringify({ error: e.message }))
                return
              }
            } else {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ notFound: true }))
              return
            }
          } else if (req.method === 'POST') {
            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', () => {
              try {
                if (!fs.existsSync(dataDir)) {
                  fs.mkdirSync(dataDir, { recursive: true })
                }
                const parsed = JSON.parse(body)
                fs.writeFileSync(dataFilePath, JSON.stringify(parsed, null, 2), 'utf-8')
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ success: true, message: 'Saved successfully to src/data/portfolioData.json' }))
              } catch (e) {
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: e.message }))
              }
            })
            return
          }
        }

        if (url === '/api/upload' && req.method === 'POST') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try {
              const { fileName, fileData, isResume } = JSON.parse(body)
              const uploadsDir = path.resolve(__dirname, 'public/uploads')
              if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true })
              }

              // Extract raw base64
              const base64Data = fileData.replace(/^data:[^;]+;base64,/, '')
              const buffer = Buffer.from(base64Data, 'base64')

              const safeName = (Date.now() + '-' + (fileName || 'file')).replace(/[^a-zA-Z0-9.-]/g, '_')
              const filePath = path.resolve(uploadsDir, safeName)
              fs.writeFileSync(filePath, buffer)

              // If updating resume, also overwrite public/Rajan_Resume.pdf
              if (isResume) {
                const defaultResumePath = path.resolve(__dirname, 'public/Rajan_Resume.pdf')
                try {
                  fs.writeFileSync(defaultResumePath, buffer)
                } catch (err) {
                  console.error('Could not overwrite default resume:', err)
                }
              }

              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({
                success: true,
                url: `/uploads/${safeName}`,
                fileName: safeName
              }))
            } catch (e) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: e.message }))
            }
          })
          return
        }

        next()
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), portfolioApiPlugin()],
})

