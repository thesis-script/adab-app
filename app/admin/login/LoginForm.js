'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'خطأ في تسجيل الدخول'); return; }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('تعذّر الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.card}>
      <div style={{textAlign: 'center', marginBottom: '20px'}}>
        <h2>تسجيل الدخول</h2>
        <p style={{color: '#010d2a'}}>أدخل بياناتك للوصول إلى لوحة الإدارة</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className="form-group">
          <label className="form-label" style={{color: '#010d2a'}}>اسم المستخدم أو البريد</label>
          <input
            className="form-input"
            type="text"
            placeholder="admin"
            value={form.username}
            onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
            required
            autoComplete="username"
            suppressHydrationWarning
          />
        </div>

        <div className="form-group">
          <label className="form-label" style={{color: '#010d2a', marginTop: '20px'}}>كلمة المرور</label>
          <div className={styles.passWrap} style={{display:'flex'}}>
            <input
              className="form-input"
              type={showPass ? 'text' : 'password'}
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              required
              autoComplete="current-password"
              style={{ paddingLeft: '48px' }}
              suppressHydrationWarning
            />
            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowPass(v => !v)}
              tabIndex={-1}
            >
              {showPass ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px'}}> 
          <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
            {loading ? (
              <><span className={styles.spinner}></span> جارٍ الدخول...</>
            ) : 'دخول 👋  '}
          </button>
        </div>
      </form>
    </div>
  );
}
