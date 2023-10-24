export enum TriggerType {
  TIME,
  CRON,
  EVENT,
  BLOCK,
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
  filter: { address: string; topics: Array<Array<string | null>> };
  blockConfirmations: number;
};

export type BlockTrigger = {
  type: TriggerType.BLOCK;
};

export type TriggerConfig =
  | TimeTrigger
  | CronTrigger
  | EventTrigger
  | BlockTrigger;
