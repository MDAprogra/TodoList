import { Item, ItemContent, ItemTitle } from '@/components/ui/item';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { cx } from 'class-variance-authority';
import type { Todo } from '@/generated/prisma/client';
import { ComponentProps } from 'react';
import dayjs from 'dayjs';


export type TodoListItemProps = {
  todo: Todo;
  onChange: (newStatus: 'CHECKED' | 'NOT_CHECKED') => void;
} & Omit<ComponentProps<typeof Item>, 'onChange'>;

export const TodoListItem = ({
  todo,
  onChange,
  ...rest
}: TodoListItemProps) => {
  return (
    <>
      <div className="ml-64 mr-64">
        <Item {...rest} variant="outline">
          <Checkbox
            id="status"
            checked={todo.status === 'CHECKED'}
            onCheckedChange={(e) => {
              onChange(e ? 'CHECKED' : 'NOT_CHECKED');
            }}
          />
          <ItemContent>
            <ItemTitle
              className={cx(todo.status === 'CHECKED' ? 'line-through' : '')}
            >
              {todo.label}
            </ItemTitle>
          </ItemContent>
          <Badge variant={'outline'}>
            {dayjs(todo.createdAt).format('DD MMMM YYYY HH:MM:ss')}
          </Badge>
          {todo.priority === 'HIGH' && (
            <Badge variant="destructive">{todo.priority}</Badge>
          )}
          {todo.priority === 'MEDIUM' && (
            <Badge className="bg-amber-400" variant="outline">
              {todo.priority}
            </Badge>
          )}
          {todo.priority === 'LOW' && (
            <Badge className="bg-emerald-500" variant="outline">
              {todo.priority}
            </Badge>
          )}
        </Item>
      </div>
    </>
  );
};
