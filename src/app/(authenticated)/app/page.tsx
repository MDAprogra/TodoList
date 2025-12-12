import { HomePage } from '@/features/todolist/HomePage';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

export default function Home() {
  dayjs.locale('fr');
  return <HomePage />;
}
