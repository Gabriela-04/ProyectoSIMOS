import { SearchParams } from 'nuqs/parsers';
import ProfileViewPage from './_components/profile-view-page';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'Dashboard : Mi Perfil'
};

export default async function Page({ searchParams }: pageProps) {
  return <ProfileViewPage />;
}
