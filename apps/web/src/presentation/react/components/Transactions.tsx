import React from 'react'

export const Transactions = function (props: {
  className?: string
}) {
  const [transactions] = React.useState([
    {
      type: 'BTC',
      color: '#FFB200',
      message: 'transaction by',
      id: '1FfmbHfnpaZjKFvyi1okTjJJusN455paPH',
      at: 'Dec 19 2023 14:10:53 PM'
    },
    {
      type: 'ETH',
      color: '#00D3FF',
      message: 'transaction by',
      id: '0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0',
      at: 'Dec 19 2023 14:10:53 PM'
    },
    {
      type: 'BTC',
      color: '#FFB200',
      message: 'transaction by',
      id: '1FfmbHfnpaZjKFvyi1okTjJJusN455paPH',
      at: 'Dec 19 2023 14:10:53 PM'
    },
    {
      type: 'New Block',
      color: '#10FF2A',
      message: 'created by',
      id: '0x3a08474CeFF8cC7354C9e233B4415709D5B827Fc',
      at: 'Dec 19 2023 14:10:53 PM'
    },
    {
      type: 'PoP',
      color: '#DC53FF',
      message: 'transaction by',
      id: '0x9e566255f656f5A62D7e7eB5E6A6737C6c54060C',
      at: 'Dec 19 2023 14:10:53 PM'
    },
    {
      type: 'BTC',
      color: '#FFB200',
      message: 'transaction by',
      id: '1FfmbHfnpaZjKFvyi1okTjJJusN455paPH',
      at: 'Dec 19 2023 14:10:53 PM'
    },
    {
      type: 'ETH',
      color: '#00D3FF',
      message: 'transaction by',
      id: '0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0',
      at: 'Dec 19 2023 14:10:53 PM'
    },
    {
      type: 'BTC',
      color: '#FFB200',
      message: 'transaction by',
      id: '1FfmbHfnpaZjKFvyi1okTjJJusN455paPH',
      at: 'Dec 19 2023 14:10:53 PM'
    },
    {
      type: 'New Block',
      color: '#10FF2A',
      message: 'created by',
      id: '0x3a08474CeFF8cC7354C9e233B4415709D5B827Fc',
      at: 'Dec 19 2023 14:10:53 PM'
    }
  ])

  return (
    <div className={`${props.className ?? ''}`}>
      <span className='md:size-8 max-md:size-7 font-extrabold'>Transactions</span>
      <ul>
        {
          transactions.map((transaction, i) => (
            <li key={`transaction-${i}`}>
              <span style={{ color: transaction.color }} className='font-bold' >{transaction.type}</span>
              <span className='text-[#898CA9] ml-1 text-base leading-6'>
                {transaction.message}
                <a className="underline mx-2" href={`#${transaction.id}`}>
                  <span className='max-md:hidden'>`{transaction.id}`</span>
                  <span className='md:hidden'>`{transaction.id.slice(0, 6)}...{transaction.id.slice(-4)}`</span>
                </a>
                at {transaction.at}
              </span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
