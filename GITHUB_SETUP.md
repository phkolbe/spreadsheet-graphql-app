# How to Push This Project to GitHub

## Step 1: Install Git

If Git is not installed on your Windows machine:

1. **Download Git for Windows**: Visit https://git-scm.com/download/win
2. **Install Git**: Run the installer and follow the setup wizard
   - Use default settings (recommended)
   - Make sure to select "Git from the command line and also from 3rd-party software"
3. **Restart your terminal/IDE** after installation

To verify installation, open a new terminal and run:
```bash
git --version
```

## Step 2: Create a GitHub Account (if you don't have one)

1. Visit https://github.com
2. Sign up for a free account
3. Verify your email address

## Step 3: Create a New Repository on GitHub

1. Log in to GitHub
2. Click the **+** icon in the top right corner
3. Select **"New repository"**
4. Enter a repository name (e.g., `spreadsheet-graphql-app`)
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

## Step 4: Initialize Git and Push to GitHub

Open a terminal in your project directory (`spreadsheet-graphql-app`) and run these commands:

```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Create your first commit
git commit -m "Initial commit: Spreadsheet to GraphQL web application"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/spreadsheet-graphql-app.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note**: When you run `git push`, GitHub will ask for your credentials:
- Username: Your GitHub username
- Password: Use a **Personal Access Token** (not your GitHub password)
  - To create one: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token
  - Select scopes: `repo` (all checkboxes under repo)
  - Copy the token and use it as your password

## Alternative: Using GitHub Desktop (Easier)

If you prefer a graphical interface:

1. Download **GitHub Desktop**: https://desktop.github.com/
2. Install and sign in with your GitHub account
3. In GitHub Desktop: File → Add Local Repository
4. Browse to your project folder
5. Click "Publish repository" button
6. Choose a name and visibility
7. Click "Publish Repository"

## Troubleshooting

- **"git is not recognized"**: Make sure Git is installed and you've restarted your terminal
- **Authentication failed**: Make sure you're using a Personal Access Token, not your password
- **Remote already exists**: Run `git remote remove origin` first, then add it again
- **Branch name issues**: If your default branch is `master`, use `git branch -M main` to rename it

## After Pushing

Once pushed, your project will be available at:
`https://github.com/YOUR_USERNAME/spreadsheet-graphql-app`

You can share this URL with others or use it for deployment services like Vercel, Netlify, etc.
