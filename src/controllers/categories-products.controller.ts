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
  Categories,
  Products,
} from '../models';
import {CategoriesRepository} from '../repositories';

export class CategoriesProductsController {
  constructor(
    @repository(CategoriesRepository) protected categoriesRepository: CategoriesRepository,
  ) { }

  @get('/categories/{id}/products', {
    responses: {
      '200': {
        description: 'Array of Categories has many Products',
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
    return this.categoriesRepository.products(id).find(filter);
  }

  @post('/categories/{id}/products', {
    responses: {
      '200': {
        description: 'Categories model instance',
        content: {'application/json': {schema: getModelSchemaRef(Products)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Categories.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Products, {
            title: 'NewProductsInCategories',
            exclude: ['id'],
            optional: ['categoriesId']
          }),
        },
      },
    }) products: Omit<Products, 'id'>,
  ): Promise<Products> {
    return this.categoriesRepository.products(id).create(products);
  }

  @patch('/categories/{id}/products', {
    responses: {
      '200': {
        description: 'Categories.Products PATCH success count',
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
    return this.categoriesRepository.products(id).patch(products, where);
  }

  @del('/categories/{id}/products', {
    responses: {
      '200': {
        description: 'Categories.Products DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Products)) where?: Where<Products>,
  ): Promise<Count> {
    return this.categoriesRepository.products(id).delete(where);
  }
}
