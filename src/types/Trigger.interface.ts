export enum TriggerType {
  TIME,
  CRON,
  EVENT,
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

export type EventTrigger = {
  type: TriggerType.EVENT;
  filter: { address: string; topicSets: Array<Array<string | null>> };
  blockConfirmations: number;
};

export type TriggerConfig = TimeTrigger | CronTrigger | EventTrigger;
