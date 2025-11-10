# Testsprite API Key Configuration Guide

## Step 1: Get Your API Key

1. Visit https://www.testsprite.com/dashboard/settings/apikey
2. Log in to your Testsprite account
3. Create a new API key (copy it - you'll need it in the next step)

## Step 2: Configure the API Key (Windows)

### Option A: Temporary (Current Session Only)

Open PowerShell in your project directory and run:

```powershell
$env:TESTSPRITE_API_KEY="your_api_key_here"
```

Replace `your_api_key_here` with your actual API key from Step 1.

**Note:** This only works for the current PowerShell session. If you close the terminal, you'll need to set it again.

### Option B: Permanent (Recommended)

1. **Via System Properties:**
   - Press `Windows + R`, type `sysdm.cpl`, and press Enter
   - Click the "Environment Variables" button
   - Under "User variables", click "New"
   - Variable name: `TESTSPRITE_API_KEY`
   - Variable value: `your_api_key_here` (paste your API key)
   - Click "OK" on all dialogs
   - **Restart your terminal/PowerShell** for changes to take effect

2. **Via PowerShell (Run as Administrator):**
   ```powershell
   [System.Environment]::SetEnvironmentVariable('TESTSPRITE_API_KEY', 'your_api_key_here', 'User')
   ```
   Then restart your terminal.

### Option C: Create a .env file (Alternative)

Create a `.env` file in the project root:

```env
TESTSPRITE_API_KEY=your_api_key_here
```

**Note:** Make sure to add `.env` to `.gitignore` to avoid committing your API key.

## Step 3: Verify Configuration

After setting the API key, verify it's configured:

```powershell
echo $env:TESTSPRITE_API_KEY
```

This should display your API key.

## Step 4: Test the Configuration

Once configured, you can proceed with testing your app using Testsprite.

## Important Notes

- **Never commit your API key to version control**
- The `.env` file is already in `.gitignore` for this project
- If you use Option A (temporary), remember to set it each time you open a new terminal
- Option B (permanent) is recommended for ongoing development

