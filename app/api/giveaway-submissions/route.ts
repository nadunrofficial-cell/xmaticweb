import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

const SUBMISSIONS_FILE = join(process.cwd(), '.data', 'giveaway-submissions.json')

async function loadSubmissions() {
  try {
    if (existsSync(SUBMISSIONS_FILE)) {
      const content = await readFile(SUBMISSIONS_FILE, 'utf-8')
      return JSON.parse(content)
    }
  } catch (error) {
    console.error('Error loading submissions:', error)
  }
  return []
}

async function saveSubmissions(submissions: any[]) {
  try {
    const dir = join(process.cwd(), '.data')
    if (!existsSync(dir)) {
      await import('fs').then(fs => fs.promises.mkdir(dir, { recursive: true }))
    }
    await writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2))
  } catch (error) {
    console.error('Error saving submissions:', error)
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields = ['fullName', 'businessName', 'email', 'phoneNumber', 'businessType', 'businessGoals', 'termsAgreed']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Validate termsAgreed
    if (data.termsAgreed !== true) {
      return NextResponse.json(
        { error: 'You must agree to the terms and conditions' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Create submission object
    const submission = {
      id: `submission-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      data,
    }

    // Load existing submissions
    const submissions = await loadSubmissions()

    // Add new submission
    submissions.push(submission)

    // Save to file
    await saveSubmissions(submissions)

    console.log('New giveaway submission saved:', submission)

    return NextResponse.json(
      { 
        message: 'Thank you for your submission!',
        submissionId: submission.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error processing submission:', error)
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve submissions (for admin)
export async function GET(request: Request) {
  // In production, add authentication check here
  const submissions = await loadSubmissions()
  return NextResponse.json(submissions)
}
