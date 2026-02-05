'use client';

import Link from 'next/link';
import { ArrowRightIcon, ListBulletIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import styles from './JobCard.module.css';

interface JobCardProps {
  id: string;
  title: string;
  location: string;
  type: string;
  keyKnowledgeSkills?: string[];
  requirements?: string[];
  benefits?: string[];
}

export default function JobCard({
  id,
  title,
  location,
  type,
  keyKnowledgeSkills = [],
  requirements = [],
  benefits = [],
}: JobCardProps) {
  const hasSkills = keyKnowledgeSkills.length > 0;
  const hasReqs = requirements.length > 0;
  const hasBenefits = benefits.length > 0;

  return (
    <Link
      href={`/jobs/${id}`}
      className={`card p-6 block group ${styles.card} ${styles.cardHover}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-500 transition-colors duration-200">
            {title}
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>{location}</span>
            <span className="mx-2 opacity-70">·</span>
            <span>{type}</span>
          </div>
          {(hasSkills || hasReqs || hasBenefits) && (
            <div className={styles.meta}>
              {hasSkills && (
                <div className={styles.metaBlock}>
                  <ListBulletIcon className={styles.metaIcon} />
                  <span className={styles.metaLabel}>Key knowledge & skills:</span>
                  <span className={styles.metaItems}>{keyKnowledgeSkills.slice(0, 5).join(' · ')}{keyKnowledgeSkills.length > 5 ? ' …' : ''}</span>
                </div>
              )}
              {hasReqs && (
                <div className={styles.metaBlock}>
                  <ListBulletIcon className={styles.metaIcon} />
                  <span className={styles.metaLabel}>Requirements:</span>
                  <span className={styles.metaItems}>{requirements.slice(0, 3).join(' · ')}{requirements.length > 3 ? ' …' : ''}</span>
                </div>
              )}
              {hasBenefits && (
                <div className={styles.metaBlock}>
                  <CheckCircleIcon className={styles.metaIcon} />
                  <span className={styles.metaLabel}>Benefits:</span>
                  <span className={styles.metaItems}>{benefits.slice(0, 4).join(', ')}{benefits.length > 4 ? ' …' : ''}</span>
                </div>
              )}
            </div>
          )}
        </div>
        <ArrowRightIcon className={`w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-all duration-300 flex-shrink-0 ${styles.arrow}`} />
      </div>
    </Link>
  );
}
