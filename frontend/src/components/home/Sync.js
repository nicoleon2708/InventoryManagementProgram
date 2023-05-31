import React from 'react'

const Sync = () => {
    return (
        <div className='w-full bg-zinc-200 pt-20 px-10 md:py-10'>
            <div className='max-w-[1240px] mx-auto'>

                <div className='text-center'>
                    <h2 className='text-5xl font-bold'>Stay in sync with your business</h2>
                </div>

                <div className='grid md:grid-cols-3 gap-1 px-2 text-center'>
                    <div className='py-12'>
                        <h2 className='text-xl font-bold'>Connect online sales & payments</h2>

                        <p className='text-gray-400 mt-2'>
                            See all the information you need in one place
                        </p>
                    </div>

                    <div className='py-12'>
                        <h2 className='text-xl font-bold'>Work smarter, not harder
                        </h2>

                        <p className='text-gray-400 mt-2'>
                            Easily add inventory items to your invoices. Edit products and services by batch to save time.                        </p>
                    </div>

                    <div className='py-12'>
                        <h2 className='text-xl font-bold'>Bring your lists with you
                        </h2>

                        <p className='text-gray-400 mt-2'>
                            Easily seeing your partners, customers, products                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Sync
