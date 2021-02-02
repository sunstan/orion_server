import * as _ from 'lodash';

export const stringsToCursor = (...str: string[]): string =>
  Buffer.from(str.join('=')).toString('base64');

export const arrayFromCursor = (cursor: string): string[] =>
  Buffer.from(cursor, 'base64').toString().split('=');

export const nodesToEdges = (nodes: any[]) => {
  const head = _.head(nodes);
  const last = _.last(nodes);
  return [
    {
      node: head,
      cursor: head ? stringsToCursor(head.id, head.createdAt) : null,
    },
    {
      node: last,
      cursor: last ? stringsToCursor(last.id, last.createdAt) : null,
    },
  ];
};
