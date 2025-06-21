interface SortI {
  name: string;
  value: string;
}

export const sortState: SortI[] = [
  { name: 'Цена: по возрастанию', value: 'cost_asc' },
  { name: 'Цена: по убыванию', value: 'cost_desc' },
  { name: 'Название: А-Я', value: 'title_asc' },
  { name: 'Название: Я-А', value: 'title_desc' },
];
