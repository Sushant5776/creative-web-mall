import { NextRequest, NextResponse } from 'next/server'
import users from '../../data.json'

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)

	const itemsPerPageCount = parseInt(searchParams.get('itemsPerPage') || '')

	if (!itemsPerPageCount)
		return NextResponse.json(
			{ message: 'Please specify itemsPerPage in search params!' },
			{ status: 400 }
		)

	if (!(itemsPerPageCount > 0))
		return NextResponse.json(
			{
				messsage:
					'Please provide appropriate value to itemsPerPage search params!',
			},
			{ status: 400 }
		)

	const totalPages = Math.ceil(users.length / itemsPerPageCount)

	return NextResponse.json({ totalPages })
}
