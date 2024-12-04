import { Metadata } from 'next';
import RestorePasswordViewPage from '../_components/restore-password-view';

export const metadata: Metadata = {
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.'
};

export default function Page() {
  return <RestorePasswordViewPage />;
}
