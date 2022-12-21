interface INotificationMessage {
  msg: string;
  priority?: 1 | 2 | 3;
}

export interface INotificationService {
  notify: (userId: string, notifMsg: INotificationMessage)=>Promise<boolean>;
  listNotifications: (userId: string)=>Promise<Notification>;
  markAsSeen: (notifId: string)=>Promise<boolean>;
  subscribeUserNotifs: (userId: string)=>Promise<AsyncIterator<INotificationMessage>>;
}