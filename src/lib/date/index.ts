import { format } from 'date-fns';

export const formatDate = (date: Date, formatStr: string = 'yyyy/MM/dd HH:mm'): string => {
  return format(date, formatStr);
};

export const formatDateForDescription = (date: Date, formatStr: string = 'yyyy年MM月dd日'): string => {
  return format(date, formatStr);
};
