export interface ICardProps {
  index: string;
  name: string;
  level: string;
  url: string;
}

export interface ISpell {
  [key: string]: any;
  name: string;
  index: string;
  desc: string[];
  range: string;
  duration: string;
  attack_type: string;
}
