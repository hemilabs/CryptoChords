import { useContext } from 'react'
import { TransactionsPresenter } from '../../common/presenter/transactions/TransactionsPresenter'
import { TransactionsPresenterState } from '../../common/presenter/transactions/TransactionsPresenterState'
import { presenters } from '../context'
import { usePresenter } from '../hooks/usePresenter'
import { Transaction } from './Transaction'

export const Transactions = function (props: {
  className?: string
}) {
  const { transactionsPresenter } = useContext(presenters)
  const { transactions } = usePresenter<TransactionsPresenter, TransactionsPresenterState>(transactionsPresenter)

  return (
    <div className={`${props.className ?? ''}`}>
      <span className='md:size-8 max-md:size-7 font-extrabold'>Transactions</span>
      <ul className='flex flex-col-reverse'>
        {
          transactions.map((transaction) => (
            <li key={`${transaction.id}`}>
              <Transaction
                type={transaction.type}
                color={transaction.color}
                message={transaction.message}
                id={transaction.id}
                at={transaction.at}
              />
            </li>
          ))
        }
      </ul>
    </div>
  )
}
