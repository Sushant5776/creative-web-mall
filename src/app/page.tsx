import MainContent from './MainContent'

export default function Home() {
	return (
		<main className='w-full min-h-screen p-4 max-w-7xl mx-auto space-y-6'>
			<h1 className='text-3xl text-center text-sky-600 font-bold'>Web Mall</h1>

			<MainContent />
		</main>
	)
}
