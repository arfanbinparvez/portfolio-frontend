import { useState } from 'react'
import { API_URL } from './config.js'

const EMPTY = { name: '', email: '', message: '' }

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus('sent')
      setForm(EMPTY)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-success">
        <span className="prompt">➜</span> message sent — I'll get back to you soon.
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="name">name</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} required maxLength={100} />
      </div>
      <div className="form-row">
        <label htmlFor="email">email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required maxLength={200} />
      </div>
      <div className="form-row">
        <label htmlFor="message">message</label>
        <textarea id="message" name="message" rows="4" value={form.message} onChange={handleChange} required maxLength={5000} />
      </div>
      {status === 'error' && <div className="form-error">{errorMsg}</div>}
      <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'sending…' : 'send message →'}
      </button>
    </form>
  )
}
