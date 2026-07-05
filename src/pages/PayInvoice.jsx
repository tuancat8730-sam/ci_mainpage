import { useEffect } from 'react'
import SectionHeader from '../components/ui/SectionHeader'
import { PAYMENT_GATEWAY } from '../data/constants'

export default function PayInvoice() {
  useEffect(() => {
    document.title = 'Pay Your Invoice | Capital Irrigation Edmonton'
  }, [])

  return (
    <section className="section">
      <div className="container-xl text-center">
        <SectionHeader title="Pay Your Invoice" subtitle="Use our secure payment gateway to pay your invoice." />
        <form action={PAYMENT_GATEWAY.action} method="POST">
          <input type="hidden" name="key_id" value={PAYMENT_GATEWAY.keyId} />
          <input type="hidden" name="action" value="process_variable" />
          <input type="hidden" name="order_description" value={PAYMENT_GATEWAY.orderDescription} />
          <input type="hidden" name="language" value="en" />
          <input type="hidden" name="url_finish" value={PAYMENT_GATEWAY.urlFinish} />
          <input type="hidden" name="customer_receipt" value="true" />
          <input type="hidden" name="hash" value={PAYMENT_GATEWAY.hash} />
          <button type="submit" className="btn btn-primary btn-lg">
            Secure Payment Gateway
          </button>
        </form>
      </div>
    </section>
  )
}
