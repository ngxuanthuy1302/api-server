import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Collection,
  Products,
} from '../models';
import {CollectionRepository} from '../repositories';

export class CollectionProductsController {
  constructor(
    @repository(CollectionRepository) protected collectionRepository: CollectionRepository,
  ) { }

  @get('/collections/{id}/products', {
    responses: {
      '200': {
        description: 'Array of Collection has many Products',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Products)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Products>,
  ): Promise<Products[]> {
    return this.collectionRepository.products(id).find(filter);
  }

  @post('/collections/{id}/products', {
    responses: {
      '200': {
        description: 'Collection model instance',
        content: {'application/json': {schema: getModelSchemaRef(Products)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Collection.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Products, {
            title: 'NewProductsInCollection',
            exclude: ['id'],
            optional: ['collectionId']
          }),
        },
      },
    }) products: Omit<Products, 'id'>,
  ): Promise<Products> {
    return this.collectionRepository.products(id).create(products);
  }

  @patch('/collections/{id}/products', {
    responses: {
      '200': {
        description: 'Collection.Products PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Products, {partial: true}),
        },
      },
    })
    products: Partial<Products>,
    @param.query.object('where', getWhereSchemaFor(Products)) where?: Where<Products>,
  ): Promise<Count> {
    return this.collectionRepository.products(id).patch(products, where);
  }

  @del('/collections/{id}/products', {
    responses: {
      '200': {
        description: 'Collection.Products DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Products)) where?: Where<Products>,
  ): Promise<Count> {
    return this.collectionRepository.products(id).delete(where);
  }
}
