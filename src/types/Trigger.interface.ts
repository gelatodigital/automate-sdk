export enum TriggerType {
  TIME,
  CRON,
}

export type TimeTrigger = {
  type: TriggerType.TIME;
  interval: number;
  start?: number;
};

export type CronTrigger = {
  type: TriggerType.CRON;
  cron: string;
};

export type TriggerConfig = TimeTrigger | CronTrigger;
