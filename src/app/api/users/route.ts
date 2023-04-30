import { NextRequest, NextResponse } from 'next/server'
import users from '../data.json'

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)

	const pageNo = parseInt(searchParams.get('page') || '')
	const itemsPerPageCount = parseInt(searchParams.get('itemsPerPage') || '')

	if (!pageNo || !itemsPerPageCount)
		return NextResponse.json(
			{ message: 'Please specify page and itemsPerPage in search params!' },
			{ status: 400 }
		)

	if (!(pageNo > 0) || !(itemsPerPageCount > 0))
		return NextResponse.json(
			{ messsage: 'Please provide appropriate values to search params!' },
			{ status: 400 }
		)

	if (!(pageNo <= Math.ceil(users.length / itemsPerPageCount)))
		return NextResponse.json(
			{ message: 'Out of bound fetch request' },
			{ status: 400 }
		)

	const startIndex = (pageNo - 1) * itemsPerPageCount
	const endIndex = pageNo * itemsPerPageCount

	return NextResponse.json(users.slice(startIndex, endIndex))
}
