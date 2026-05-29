import { NextResponse } from 'next/server'

// Simple in-memory storage for contact submissions
// In production, this would be a database
const contactSubmissions: Array<{
  id: string
  timestamp: string
  data: any
}> = []

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields = ['name', 'email', 'message']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
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
      id: `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      data,
    }

    // Store submission
    contactSubmissions.push(submission)

    // Log submission (in production, send email here)
    console.log('New contact submission:', submission)

    // Simulate sending emails
    console.log('Email sent to: hello@xmaticdigital.com')
    console.log('Email sent to: xmaticdigital@gmail.com')

    return NextResponse.json(
      { 
        message: 'Thank you for your message! We will get back to you soon.',
        submissionId: submission.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error processing contact submission:', error)
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve submissions (for admin)
export async function GET(request: Request) {
  // In production, add authentication check here
  return NextResponse.json(contactSubmissions)
}
