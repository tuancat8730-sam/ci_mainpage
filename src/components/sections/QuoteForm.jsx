import { useQuoteForm } from '../../hooks/useQuoteForm'

const HOW_HEAR_OPTIONS = ['Web Search', 'Referral', 'Yellow Pages', 'Online Ad', 'Superbowl Commercial', 'Other']

const HOW_HEAR_FIELD_MAP = {
  'Web Search': 'web_search',
  Referral: 'referral',
  'Yellow Pages': 'yellow_pages',
  'Online Ad': 'online_ad',
  'Superbowl Commercial': 'superbowl',
  Other: 'other',
}

export default function QuoteForm({ subject }) {
  const { form, errors, submitting, updateField, toggleHowHear, handleSubmit } = useQuoteForm(subject)

  return (
    <div className="form-card mx-auto" style={{ maxWidth: 720 }}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">First Name *</label>
            <input
              type="text"
              className={`form-control${errors.first_name ? ' is-invalid' : ''}`}
              value={form.first_name}
              onChange={(e) => updateField('first_name', e.target.value)}
            />
            {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label">Last Name *</label>
            <input
              type="text"
              className={`form-control${errors.last_name ? ' is-invalid' : ''}`}
              value={form.last_name}
              onChange={(e) => updateField('last_name', e.target.value)}
            />
            {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
          </div>

          <div className="col-md-8">
            <label className="form-label">Address *</label>
            <input
              type="text"
              className={`form-control${errors.address ? ' is-invalid' : ''}`}
              value={form.address}
              onChange={(e) => updateField('address', e.target.value)}
            />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label">Postal</label>
            <input type="text" className="form-control" value={form.postal} onChange={(e) => updateField('postal', e.target.value)} />
          </div>

          <div className="col-md-6">
            <label className="form-label">City *</label>
            <input
              type="text"
              className={`form-control${errors.city ? ' is-invalid' : ''}`}
              value={form.city}
              onChange={(e) => updateField('city', e.target.value)}
            />
            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control${errors.email ? ' is-invalid' : ''}`}
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="col-md-4">
            <label className="form-label">Cell Phone</label>
            <input type="text" className="form-control" value={form.cell_phone} onChange={(e) => updateField('cell_phone', e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Work Phone</label>
            <input type="text" className="form-control" value={form.work_phone} onChange={(e) => updateField('work_phone', e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Home Phone</label>
            <input type="text" className="form-control" value={form.home_phone} onChange={(e) => updateField('home_phone', e.target.value)} />
          </div>

          <div className="col-md-6">
            <label className="form-label">How should we contact you?</label>
            <select className="form-select" value={form.contact_method} onChange={(e) => updateField('contact_method', e.target.value)}>
              <option value="P">Phone</option>
              <option value="E">Email</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label d-block">How did you hear about us?</label>
            {HOW_HEAR_OPTIONS.map((label) => (
              <div className="form-check form-check-inline" key={label}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={form[HOW_HEAR_FIELD_MAP[label]]}
                  onChange={() => toggleHowHear(label)}
                  id={`howhear-${label}`}
                />
                <label className="form-check-label" htmlFor={`howhear-${label}`}>
                  {label}
                </label>
              </div>
            ))}
          </div>

          <div className="col-12">
            <label className="form-label">Comments</label>
            <textarea
              className="form-control"
              rows="4"
              value={form.comments}
              onChange={(e) => updateField('comments', e.target.value)}
            />
          </div>
        </div>

        <button type="submit" id="submit-quote" className="btn btn-primary btn-lg mt-4" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  )
}
