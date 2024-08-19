import moment from 'moment-jalaali';

moment.loadPersian({ dialect: 'persian-modern' });
moment.locale('fa');

export function getTimeAgo(date: string|Date) {
  return moment(date).fromNow();
}