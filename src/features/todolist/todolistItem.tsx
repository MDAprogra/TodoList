import { Item, ItemContent, ItemTitle } from '@/components/ui/item';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { cx } from 'class-variance-authority';
import type { Todo } from '@/generated/prisma/client';
import { ComponentProps } from 'react';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

export type TodoListItemProps = {
  todo: Todo;
  disableDeleteButton : boolean;
  onChange: (newStatus: 'CHECKED' | 'NOT_CHECKED') => void;
} & Omit<ComponentProps<typeof Item>, 'onChange'>;

export const TodoListItem = ({
  todo,
  onChange,
  disableDeleteButton = false,
  ...rest
}: TodoListItemProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const result = await fetch(`/api/todo/${todo.id}`, {
        method: 'DELETE',
      });

      if (!result.ok) {
        throw new Error('Erreur dans la suppression ...');
      }
      return (await result.json()) as { data: Todo };
    },
    onSuccess: (_data, _vars, _onMutate, ctx) => {
      ctx.client.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      toast.error('Oups... We have an error.', {
        description: error.message,
      });
    },
  });

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
            {dayjs(todo.createdAt).format('DD MMMM YYYY HH:mm:ss')}
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
          {!disableDeleteButton && <Button onClick={() => mutate()} disabled={isPending || disableDeleteButton}>
            {isPending ? <Spinner /> : 'Delete'}
          </Button>}
          
        </Item>
      </div>
    </>
  );
};
