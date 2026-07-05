import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SUBMIT_URL = 'https://api.capitalirrigation.com/api/submit-quote-form/'

const EMPTY_FORM = {
  first_name: '',
  last_name: '',
  address: '',
  city: '',
  postal: '',
  cell_phone: '',
  work_phone: '',
  home_phone: '',
  email: '',
  contact_method: 'P',
  web_search: false,
  referral: false,
  yellow_pages: false,
  online_ad: false,
  superbowl: false,
  other: false,
  comments: '',
}

const HOW_HEAR_FIELD_MAP = {
  'Web Search': 'web_search',
  Referral: 'referral',
  'Yellow Pages': 'yellow_pages',
  'Online Ad': 'online_ad',
  'Superbowl Commercial': 'superbowl',
  Other: 'other',
}

export function useQuoteForm(subject) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const toggleHowHear = (label) => {
    const field = HOW_HEAR_FIELD_MAP[label]
    setForm((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const validate = () => {
    const e = {}
    if (!form.first_name.trim()) e.first_name = 'First name is required'
    if (!form.last_name.trim()) e.last_name = 'Last name is required'
    if (!form.address.trim()) e.address = 'Address is required'
    if (!form.city.trim()) e.city = 'City is required'
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setSubmitting(true)
    try {
      const response = await axios.post(SUBMIT_URL, { ...form, subject })
      if (response.status === 200) {
        navigate('/thanks/')
      }
    } catch {
      // Silent fail — mirrors legacy behavior, no error UI shown to the user.
    } finally {
      setSubmitting(false)
    }
  }

  return { form, errors, submitting, updateField, toggleHowHear, handleSubmit }
}
