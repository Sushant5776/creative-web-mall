'use client'

import { useEffect, useState } from 'react'

interface User {
	id: number
	first_name: string
	last_name: string
	email: string
	gender: string
	company: string
	role: string
	department: string
}

const MainContent = () => {
	const [items, setItems] = useState<User[]>([])
	const [itemsPerPage] = useState(10)
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState<number>()

	useEffect(() => {
		const fetchData = async () => {
			const res = await Promise.allSettled([
				fetch(
					`http://localhost:3000/api/users/totalPages?itemsPerPage=${itemsPerPage}`
				),
				fetch(
					`http://localhost:3000/api/users?page=${page}&itemsPerPage=${itemsPerPage}`
				),
			])

			if (res[0].status === 'fulfilled' && res[1].status === 'fulfilled') {
				const data = await Promise.all([
					res[0].value.json(),
					res[1].value.json(),
				])

				setTotalPages(data[0].totalPages)
				console.log(data[1])
				setItems(data[1])
			}
		}

		fetchData()
	}, [page, itemsPerPage])

	return (
		<section className='w-fit mx-auto space-y-4 h-fit'>
			<div className='space-x-4 w-fit mx-auto'>
				<button
					disabled={page <= 1}
					className='mx-auto py-2 px-4 bg-blue-500 text-gray-50 font-medium rounded-md disabled:bg-gray-500'
					onClick={() => setPage(page - 1)}>
					Previous Page
				</button>
				<button
					disabled={page >= totalPages!}
					className='mx-auto py-2 px-4 bg-blue-500 text-gray-50 font-medium rounded-md disabled:bg-gray-500'
					onClick={() => setPage(page + 1)}>
					Next Page
				</button>
			</div>

			<table className='space-y-2'>
				<tr>
					<th className='th'>Item No.</th>
					<th className='th'>First Name</th>
					<th className='th'>Last Name</th>
					<th className='th'>Email</th>
					<th className='th'>Gender</th>
					<th className='th'>Company</th>
					<th className='th'>Department</th>
					<th className='th'>Role</th>
				</tr>
				{items.map(
					({
						id,
						first_name,
						last_name,
						email,
						gender,
						company,
						department,
						role,
					}) => (
						<tr key={id}>
							<td className='td'>{id}</td>
							<td className='td'>{first_name}</td>
							<td className='td'>{last_name}</td>
							<td className='td'>{email}</td>
							<td className='td'>{gender}</td>
							<td className='td'>{company}</td>
							<td className='td'>{department}</td>
							<td className='td'>{role}</td>
						</tr>
					)
				)}
			</table>
		</section>
	)
}

export default MainContent
