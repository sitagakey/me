import { format } from 'date-fns';

export const formatDate = (date: Date, formatStr: string = 'yyyy/MM/dd HH:mm'): string => {
  return format(date, formatStr);
};
