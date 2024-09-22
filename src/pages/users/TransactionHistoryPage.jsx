import React from 'react'
import BootstrapHeader from '../../components/users/BootstrapHeader'
import PaymentHistory from '../../components/users/PaymentHistory'

const TransactionHistoryPage = () => {
  return (
    <div className="d-flex flex-column vh-100 background-gradient-main">
      <BootstrapHeader />
      <div className="flex-grow-1">
        <PaymentHistory />
      </div>
    </div>
  )
}

export default TransactionHistoryPage
