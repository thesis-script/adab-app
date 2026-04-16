import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import LoginForm from './LoginForm';
import styles from './page.module.css';

export const metadata = { title: 'تسجيل الدخول — الأدب العربي' };

export default async function LoginPage() {
  const session = await getAdminSession();
  if (session) redirect('/admin');

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.leftContent}>
          <div className={styles.logo}>
            <span>📚</span>
            <div>
              <span className={styles.logoName}>الأدب العربي</span>
              <span className={styles.logoBac}>بكالوريا</span>
            </div>
          </div>
          <h1 className={styles.heroText}>منصة تعليمية متكاملة لطلاب البكالوريا</h1>
          <p className={styles.heroDesc}>إدارة محتوى الأدب العربي بسهولة وكفاءة</p>
          <div className={styles.features}>
            {['إدارة الفئات', 'إنشاء الدروس', ].map(f => (
              <div key={f} className={styles.feature}>
                <span className={styles.featureDot}></span>
                {f}
              </div>
            ))}
          </div>
          <blockquote className={styles.quote}>
            «اطلُبِ العلمَ من المهد إلى اللحد»
          </blockquote>
        </div>
      </div>
      <div className={styles.right}>
        <LoginForm />
      </div>
    </div>
  );
}
