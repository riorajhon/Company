import JobForm from '../JobForm';
import styles from '../page.module.css';

export const metadata = {
  title: 'Post a job — Sobapps Dashboard',
};

export default function NewJobPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Post a job</h1>
      <JobForm />
    </div>
  );
}
