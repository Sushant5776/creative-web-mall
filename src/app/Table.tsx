'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
	data: []
}

const Table = ({ data }: Props) => {
	const [itemsPerPage, setItemsPerPage] = useState(10)
	const router = useRouter()

	return (
		<Link
			href={{ query: { from: itemsPerPage, to: itemsPerPage + itemsPerPage } }}>
			Next Page
		</Link>
	)
}

export default Table
