import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Categories} from './categories.model';
import {Collection} from './collection.model';

@model({settings: {strict: false}})
export class Products extends Entity {
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
  name: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  image?: string[];

  @property({
    type: 'string',
  })
  descaption?: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'array',
    required: true,
    itemType: 'string',
  })
  size: string[];

  @property({
    type: 'string',
    required: true,
  })
  path: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  createdAt?: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  updatedAt?: string;

  @belongsTo(() => Collection)
  collectionId: string;

  @belongsTo(() => Categories)
  categoriesId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Products>) {
    super(data);
  }
}

export interface ProductsRelations {
  // describe navigational properties here
}

export type ProductsWithRelations = Products & ProductsRelations;
