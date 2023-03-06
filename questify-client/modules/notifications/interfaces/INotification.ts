interface INotificationRedirectAction {
  type: 'redirect',
  redirectUrl: string;
}


export interface INotification {
  id: string;
  message: string;
  img?: string;
  sentDate: Date;
  action?: INotificationRedirectAction;
}