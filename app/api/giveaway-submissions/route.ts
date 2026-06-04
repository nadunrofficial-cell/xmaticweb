import { NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

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

    // Insert into database
    const result = await pool.query(
      `INSERT INTO giveaway_submissions 
        (full_name, business_name, email, phone_number, business_type, website_links, business_goals, additional_notes, terms_agreed)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, created_at`,
      [
        data.fullName,
        data.businessName,
        data.email,
        data.phoneNumber,
        data.businessType,
        data.websiteLinks || '',
        data.businessGoals,
        data.additionalNotes || '',
        data.termsAgreed,
      ]
    )

    const submission = result.rows[0]

    console.log('New giveaway submission saved:', submission.id)

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
  try {
    // In production, add authentication check here
    const result = await pool.query(
      'SELECT * FROM giveaway_submissions ORDER BY created_at DESC'
    )
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}
