import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Size extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  size: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Size>) {
    super(data);
  }
}

export interface SizeRelations {
  // describe navigational properties here
}

export type SizeWithRelations = Size & SizeRelations;
