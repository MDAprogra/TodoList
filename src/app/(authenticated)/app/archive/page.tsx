import { HomePageArchive } from '@/features/todolistArchive/HomePageArchive';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

export default function Home() {
  dayjs.locale('fr');
  return <HomePageArchive />;
}
