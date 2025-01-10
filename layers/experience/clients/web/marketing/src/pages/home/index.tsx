import { Authentication } from '../../layout/authentication';
import { LuMenu } from 'react-icons/lu'

export const Home = () => {
  return (
    <>
    <header className="flex justify-between items-center space-x-4 px-8 bg-white h-20 border-b"> 
      <h1 className="w-full font-bold text-3xl text-black"> moult </h1>
      <Authentication />
      <button className="px-4 py-2 border rounded-md border-gray-300">
        <LuMenu className='rounded-md text-lg text-gray-500' />
      </button>
    </header>
    <main className='bg-gray-100 min-h-[100vh]'>
     
    </main>
    </>
  ); 
}
